import { Router } from 'express';

const router = Router();

router.post('/', async (req, res) => {
  const { message } = req.body;

  if (!process.env.OPENAI_API_KEY) {
    // Fallback response if no API key is configured
    return res.json({ 
      role: 'assistant', 
      content: `I'm currently running in demo mode because my OpenAI API key hasn't been set up yet. Once configured, I'll be able to answer your question: "${message}" using semantic search over Shamrat's portfolio.` 
    });
  }

  try {
    // TODO: Implement OpenAI call here using Vercel AI SDK or direct fetch
    // const completion = await openai.chat.completions.create({ ... });
    
    res.json({ 
      role: 'assistant', 
      content: "This is a placeholder for the real AI response. To activate full RAG capabilities, please add the OPENAI_API_KEY to the server environment." 
    });
  } catch (error) {
    console.error('AI Chat Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
