# Operon OS Website

AI agents you can govern. Enterprise-grade governance for autonomous AI workloads.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Free Groq API key from https://console.groq.com

### Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Visit http://localhost:5173

### Deploy to Vercel

See [DEPLOY.md](./DEPLOY.md) for complete deployment instructions.

**Quick deploy:**
1. Get free Groq API key: https://console.groq.com
2. Push to GitHub
3. Import to Vercel
4. Add `GROQ_API_KEY` environment variable
5. Deploy! 🎉

## 🤖 Agent Sri Demo

The website includes an interactive Agent Sri demo powered by:
- **Frontend**: React + TypeScript + Vite
- **Backend**: Vercel serverless functions
- **AI**: Groq (Llama 3.1 70B) - FREE tier

## 📁 Project Structure

```
├── src/
│   ├── components/     # React components
│   ├── services/       # API services
│   ├── data/          # Agent Sri knowledge base
│   └── pages/         # Page components
├── api/               # Vercel serverless functions
├── public/            # Static assets
└── DEPLOY.md         # Deployment guide
```

## 🔧 Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Groq AI API
- Vercel

## 📝 License

Proprietary - BrainHive Inc.

