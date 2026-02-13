#!/usr/bin/env node
/**
 * Simple proxy server that adds CORS headers to Ollama requests
 * This allows the browser to talk to Ollama without CORS issues
 */

import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5105;
const OLLAMA_URL = 'http://localhost:11434';

app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'Ollama Proxy' });
});

// Proxy all requests to Ollama
app.all('/api/*', async (req, res) => {
  try {
    const ollamaPath = req.path.replace('/api', '');
    const ollamaEndpoint = `${OLLAMA_URL}${ollamaPath}`;

    console.log(`[Proxy] ${req.method} ${ollamaEndpoint}`);

    const response = await fetch(ollamaEndpoint, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('[Proxy] Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Ollama Proxy running on http://localhost:${PORT}`);
  console.log(`✅ Forwarding requests to: ${OLLAMA_URL}`);
  console.log(`✅ CORS enabled for browser access`);
});
