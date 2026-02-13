/**
 * Vercel Serverless Function - Agent Sri Mission Executor
 * Uses Groq API for fast, free AI inference
 */

export default async function handler(req: any, res: any) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { description } = req.body;

    if (!description) {
      return res.status(400).json({ error: 'Mission description is required' });
    }

    // Get Groq API key from environment
    const GROQ_API_KEY = process.env.GROQ_API_KEY;
    if (!GROQ_API_KEY) {
      return res.status(500).json({ error: 'Groq API key not configured' });
    }

    console.log('[Agent Sri] Executing mission via Groq...');

    // Call Groq API
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile', // Updated model - Fast, smart, FREE
        messages: [
          {
            role: 'system',
            content: 'You are Agent Sri, a friendly and intelligent AI assistant. Be conversational and natural. Provide SHORT, helpful responses (1-3 sentences). Be warm and personable, not robotic or formal.'
          },
          {
            role: 'user',
            content: description
          }
        ],
        temperature: 0.7,
        max_tokens: 500, // Keep responses SHORT
      }),
    });

    if (!groqResponse.ok) {
      const errorData = await groqResponse.text();
      console.error('[Agent Sri] Groq API error:', errorData);
      throw new Error(`Groq API error: ${groqResponse.status}`);
    }

    const data = await groqResponse.json();
    const aiResponse = data.choices[0]?.message?.content?.trim() || 'No response from AI';

    console.log('[Agent Sri] ✅ Response generated');

    // Format response to match expected structure
    const result = {
      title: description.split('\n')[0].substring(0, 100),
      summary: 'Mission completed',
      sections: [{
        title: '✨ Response',
        content: aiResponse
      }],
      metrics: {
        sourcesAnalyzed: 1,
        dataPoints: 1,
        confidence: 95
      }
    };

    return res.status(200).json({
      success: true,
      mission: {
        description,
        result,
        status: 'completed',
        endTime: Date.now()
      }
    });

  } catch (error) {
    console.error('[Agent Sri] Error:', error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to execute mission'
    });
  }
}
