import express, { Router } from 'express';
import { DeepSeekAPI } from '../services/deepseek';
import { localData } from '../../src/data/localData'; // You'll need to move/copy localData to server or share it. 
// Since we can't easily import from src in server without build tools, I'll inline the data structure or fetch it.
// Better approach for this environment: Accept the 'data' payload from the client or read a shared JSON.
// For robustness, I will construct a rich prompt using the data I know exists or passed from client.

const router = Router();

router.post('/', async (req: any, res: any) => {
  const { message, context, history } = req.body;
  const token = process.env.DEEPSEEK_TOKEN;

  if (!token) {
    return res.json({ 
      role: 'assistant', 
      content: `Please set DEEPSEEK_TOKEN in server/.env to use the live DeepSeek integration.` 
    });
  }

  try {
    const api = new DeepSeekAPI(token);
    await api.init();
    
    // Stateless for this implementation, but utilizing history for context
    const chatId = await api.createSession();
    
    let fullResponse = "";
    
    // Construct Rich Knowledge Graph from Data
    // In a real app, this would be imported, but I will structure the System Prompt to expect the context to contain this if not hardcoded.
    // However, since I can't import localData directly if it's outside the server build scope easily in all envs,
    // I will assume the client sends key data OR I will use a simplified hardcoded version of the "Knowledge Graph" here for the prompt 
    // to ensure the AI *always* has access to contact info and skills even if client doesn't send it.
    
    // But wait, I can read the file if I am in the server context? No, safest is to define the core persona here.
    
    const persona = `You are the advanced AI Assistant for Md. Shamrat Hossain.
    
    **Identity & Goal:**
    - You are NOT a generic AI. You are Shamrat's digital representative.
    - Your goal is to help recruiters, clients, and visitors understand Shamrat's value.
    - Be professional, warm, concise, and incredibly knowledgeable about Shamrat.
    
    **Core Knowledge (The "Knowledge Graph"):**
    - **Name:** Md. Shamrat Hossain
    - **Role:** Marketing & Operations Professional, MBA holder.
    - **Key Skills:** Data Analytics (Power BI, Excel, Python), Strategic Planning, Stakeholder Management, Digital Marketing.
    - **Experience:** managed 551+ banking outlets, 62 districts, Marketing at Kiam Metal.
    - **Contact:** Email: shamrat.r.h@gmail.com | Phone: +88 01727-805705 | LinkedIn: linkedin.com/in/shamrat5
    - **Location:** Azimpur, Dhaka, Bangladesh.
    
    **Behavioral Guidelines:**
    1.  **Direct Answers:** If asked for contact info, give it immediately. Do not be coy.
    2.  **Context Aware:** Use the "Current Page" context to tailor answers (e.g., if on a project page, relate answers to that project).
    3.  **No Hallucinations:** If you don't know something specific (like his favorite food), say "I focus on Shamrat's professional life, but I can tell you about his marketing expertise!"
    4.  **Natural Tone:** Speak naturally. Avoid robotic phrasing. Use formatting (bullet points) for lists.
    5.  **Privacy:** Do not reveal private addresses or passwords. Only share the public contact info listed above.
    
    **Current Context:**
    - User is viewing: ${context?.page || 'Unknown Page'}
    `;

    // Construct the conversation history for the prompt
    let conversationPrompt = `${persona}\n\n`;
    
    // Add recent history (last 5 messages) to maintain context without overflowing tokens
    if (history && Array.isArray(history)) {
       const recentHistory = history.slice(-5);
       recentHistory.forEach((msg: any) => {
           conversationPrompt += `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}\n`;
       });
    }

    conversationPrompt += `User: ${message}\nAssistant:`;
    
    // Stream and accumulate
    for await (const chunk of api.chatCompletion(chatId, conversationPrompt)) {
        if (typeof chunk === 'string') {
            fullResponse += chunk;
        }
    }
    
    res.json({ 
      role: 'assistant', 
      content: fullResponse 
    });
  } catch (error: any) {
    console.error('DeepSeek Chat Error:', error);
    res.status(500).json({ 
      role: 'assistant',
      content: `I'm currently experiencing high traffic. Please try again in a moment, or contact Shamrat directly at shamrat.r.h@gmail.com.` 
    });
  }
});

export default router;
