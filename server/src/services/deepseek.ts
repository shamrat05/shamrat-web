import fs from 'fs';
import path from 'path';
import { WASI } from 'wasi';
import { env } from 'process';
import axios, { AxiosInstance } from 'axios';

class DeepSeekPOW {
  private instance: WebAssembly.Instance | null = null;
  private memory: WebAssembly.Memory | null = null;

  async init() {
    if (this.instance) return;

    const possiblePaths = [
      path.join(__dirname, '../wasm/sha3_wasm_bg.7b9ca65ddd.wasm'), // Local dev ts-node
      path.join(__dirname, 'wasm/sha3_wasm_bg.7b9ca65ddd.wasm'),    // Built dist
      path.join(process.cwd(), 'server/src/wasm/sha3_wasm_bg.7b9ca65ddd.wasm'), // Vercel source?
      path.join(process.cwd(), 'wasm/sha3_wasm_bg.7b9ca65ddd.wasm'), // Vercel function root?
    ];

    let wasmPath = '';
    for (const p of possiblePaths) {
      if (fs.existsSync(p)) {
        wasmPath = p;
        console.log("WASM file found at:", wasmPath);
        break;
      }
    }

    if (!wasmPath) {
      console.error("WASM file not found in any of:", possiblePaths);
      throw new Error("WASM file not found");
    }

    const wasmBuffer = fs.readFileSync(wasmPath);
    const wasi = new WASI({ version: 'preview1', args: [], env });

    const wasmModule = await WebAssembly.compile(wasmBuffer);
    this.instance = await WebAssembly.instantiate(wasmModule, {
      wasi_snapshot_preview1: wasi.wasiImport,
    });
    this.memory = this.instance.exports.memory as WebAssembly.Memory;
  }

  private writeToMemory(text: string): [number, number] {
    const encoder = new TextEncoder();
    const encoded = encoder.encode(text);
    const length = encoded.length;
    
    // Allocate memory
    const ptr = (this.instance!.exports.__wbindgen_export_0 as Function)(length, 1) as number;
    
    // Write
    const memoryView = new Uint8Array(this.memory!.buffer);
    memoryView.set(encoded, ptr);
    
    return [ptr, length];
  }

  solveChallenge(config: any): string {
    if (!this.instance) throw new Error("WASM not initialized");

    const { algorithm, challenge, salt, difficulty, expire_at, signature, target_path } = config;
    
    // Calculate hash logic ported from Python
    // prefix = f"{salt}_{expire_at}_"
    const prefix = `${salt}_${expire_at}_`;
    
    const retptr = (this.instance.exports.__wbindgen_add_to_stack_pointer as Function)(-16) as number;
    
    try {
      const [challengePtr, challengeLen] = this.writeToMemory(challenge);
      const [prefixPtr, prefixLen] = this.writeToMemory(prefix);

      // wasm_solve(retptr, challenge_ptr, challenge_len, prefix_ptr, prefix_len, difficulty)
      (this.instance.exports.wasm_solve as Function)(
        retptr,
        challengePtr,
        challengeLen,
        prefixPtr,
        prefixLen,
        difficulty // Ensure this is passed as number (float in python, JS number is double)
      );

      const memoryView = new DataView(this.memory!.buffer);
      // Status at retptr
      const status = memoryView.getInt32(retptr, true); // little endian

      let answer = null;
      if (status !== 0) {
        // Value at retptr + 8 (double)
        answer = memoryView.getFloat64(retptr + 8, true);
      }

      if (answer === null) return ""; // Should not happen if solved? 

      const result = {
        algorithm,
        challenge,
        salt,
        answer: Number(answer), // Convert to int/number
        signature,
        target_path
      };

      return Buffer.from(JSON.stringify(result)).toString('base64');

    } finally {
      (this.instance.exports.__wbindgen_add_to_stack_pointer as Function)(16);
    }
  }
}

export class DeepSeekAPI {
  private static BASE_URL = "https://chat.deepseek.com/api/v0";
  private token: string;
  private pow: DeepSeekPOW;
  private client: AxiosInstance;

  constructor(token: string) {
    this.token = token;
    this.pow = new DeepSeekPOW();
    this.client = axios.create({
      baseURL: DeepSeekAPI.BASE_URL,
      headers: {
        'accept': '*/*',
        'accept-language': 'en,fr-FR;q=0.9,fr;q=0.8,es-ES;q=0.7,es;q=0.6,en-US;q=0.5,am;q=0.4,de;q=0.3',
        'authorization': `Bearer ${token}`,
        'content-type': 'application/json',
        'origin': 'https://chat.deepseek.com',
        'referer': 'https://chat.deepseek.com/',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'x-app-version': '20241129.1',
        'x-client-locale': 'en_US',
        'x-client-platform': 'web',
        'x-client-version': '1.0.0-always',
      }
    });
  }

  async init() {
    await this.pow.init();
  }

  async createSession() {
    const res = await this.client.post('/chat_session/create', { character_id: null });
    return res.data.data.biz_data.id;
  }

  async getPoWChallenge() {
    const res = await this.client.post('/chat/create_pow_challenge', {
      target_path: '/api/v0/chat/completion'
    });
    return res.data.data.biz_data.challenge;
  }

  async *chatCompletion(sessionId: string, prompt: string, parentId?: string) {
    const challenge = await this.getPoWChallenge();
    const powResponse = this.pow.solveChallenge(challenge);

    const res = await this.client.post('/chat/completion', {
      chat_session_id: sessionId,
      parent_message_id: parentId,
      prompt,
      ref_file_ids: [],
      thinking_enabled: false,
      search_enabled: false
    }, {
      headers: {
        'x-ds-pow-response': powResponse
      },
      responseType: 'stream'
    });

    // Handle SSE stream
    const stream = res.data;
    for await (const chunk of stream) {
      const lines = chunk.toString().split('\n');
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          try {
            const json = JSON.parse(line.substring(6));
            if (json.v) yield json.v; // Content
          } catch (e) {
            // ignore empty/ping
          }
        }
      }
    }
  }
}
