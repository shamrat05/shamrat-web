import { Router } from 'express';
import { DeepSeekAPI } from '../services/deepseek';

const router = Router();

router.post('/', async (req, res) => {
  const { message, context } = req.body;
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
    
    // Create a new session for each request (stateless for this demo)
    const chatId = await api.createSession();
    
    let fullResponse = "";
    
    // Construct prompt with Persona and Context
    const systemPrompt = `You are the AI Assistant for Md. Shamrat Hossain's portfolio. Your role is to professionally and concisely answer visitor questions about Shamrat's skills, experience, and projects.
    
    Guidelines:
    - Tone: Professional, friendly, and helpful.
    - Perspective: Speak on behalf of Shamrat (e.g., "Shamrat specializes in..." or "He has experience with...").
    - Constraints: Do not hallucinate. Use the provided Context to answer. If the answer isn't in the context, politely suggest checking the Resume or Contact page.
    - Context: The user is currently viewing a specific page on the website. Use the provided "Current Page" context to tailor your answer.`;

    const fullPrompt = `${systemPrompt}\n\n${context ? `CONTEXT FROM CURRENT PAGE:\n${context}\n\n` : ''}USER QUESTION:\n${message}`;
    
    // Stream and accumulate
    for await (const chunk of api.chatCompletion(chatId, fullPrompt)) {
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
      content: `Error: ${error.response?.data?.message || error.message || 'Failed to connect to DeepSeek'}` 
    });
  }
});

export default router;
