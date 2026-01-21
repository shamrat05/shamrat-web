import express, { Router } from 'express';
import { DeepSeekAPI } from '../services/deepseek';
import { SearchService } from '../services/search';

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
    
    const chatId = await api.createSession();
    let fullResponse = "";
    
    // Dynamic Retrieval (RAG)
    // Instantly find relevant info from our Knowledge Base based on the user's query
    const dynamicContext = SearchService.findRelevantContext(message);

    const persona = `You are the advanced AI Assistant for Md. Shamrat Hossain.
    
    **Identity & Goal:**
    - You are Shamrat's digital representative.
    - Be professional, warm, concise, and knowledgeable.
    
    **Core Knowledge (The "Knowledge Graph"):**
    - **Name:** Md. Shamrat Hossain
    - **Role:** Marketing & Operations Professional, MBA holder.
    - **Key Skills:** Data Analytics, Strategic Planning, Stakeholder Management.
    - **Contact:** Email: shamrat.r.h@gmail.com | LinkedIn: linkedin.com/in/shamrat5
    
    **Behavioral Guidelines:**
    1.  **Direct Answers:** Answer the question directly using the RELEVANT KNOWLEDGE below.
    2.  **Context Aware:** Use the page context to understand what the user is looking at.
    3.  **No Hallucinations:** If the answer isn't in the knowledge base, say you focus on his professional life.
    
    **RELEVANT KNOWLEDGE FOUND:**
    ${dynamicContext ? dynamicContext : "No specific detailed record found for this query, rely on general knowledge."}
    
    **Current Page Context:**
    - User is viewing: ${context?.page || 'Unknown Page'}
    `;

    // Construct the conversation history for the prompt
    let conversationPrompt = `${persona}\n\n`;
    
    if (history && Array.isArray(history)) {
       const recentHistory = history.slice(-5);
       recentHistory.forEach((msg: any) => {
           conversationPrompt += `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}\n`;
       });
    }

    conversationPrompt += `User: ${message}\nAssistant:`;
    
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
