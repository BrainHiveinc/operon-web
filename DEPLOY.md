# 🚀 Operon OS Website - Vercel Deployment Guide

This guide will help you deploy the Operon OS website with Agent Sri demo to Vercel for **FREE**.

## ✨ What You're Deploying

- **Frontend**: React + Vite website with Agent Sri demo
- **Backend**: Vercel serverless function using Groq AI (FREE)
- **Total Cost**: $0/month 🎉

---

## 📋 Prerequisites

1. **GitHub Account** (free)
2. **Vercel Account** (free) - Sign up at https://vercel.com
3. **Groq API Key** (free) - Get from https://console.groq.com

---

## 🔑 Step 1: Get Your Free Groq API Key

1. Go to https://console.groq.com
2. Click "Sign Up" or "Sign In" (use Google/GitHub for quick signup)
3. Once logged in, click "Create API Key"
4. Name it "Operon OS Agent Sri"
5. Copy the API key (starts with `gsk_...`)
6. **Save it somewhere safe** - you'll need it in Step 4

---

## 📦 Step 2: Push Code to GitHub

1. **Create a new GitHub repository:**
   - Go to https://github.com/new
   - Name it: `operon-os-website`
   - Make it **Public** or **Private** (your choice)
   - Click "Create repository"

2. **Upload this folder to GitHub:**

   ```bash
   # Navigate to the production folder
   cd OS-Website-Production

   # Initialize git (if not already done)
   git init

   # Add all files
   git add .

   # Commit
   git commit -m "Initial commit - Operon OS website"

   # Add your GitHub repository as remote
   # Replace YOUR_USERNAME with your GitHub username
   git remote add origin https://github.com/YOUR_USERNAME/operon-os-website.git

   # Push to GitHub
   git branch -M main
   git push -u origin main
   ```

---

## ☁️ Step 3: Deploy to Vercel

1. **Go to Vercel Dashboard:**
   - Visit https://vercel.com/dashboard
   - Click "Add New..." → "Project"

2. **Import your GitHub repository:**
   - Click "Import Git Repository"
   - Find `operon-os-website` in the list
   - Click "Import"

3. **Configure the project:**
   - **Framework Preset**: Vite ✅ (should auto-detect)
   - **Root Directory**: `./` (keep default)
   - **Build Command**: `npm run build` (keep default)
   - **Output Directory**: `dist` (keep default)
   - Click "Deploy"

4. **Wait for deployment:**
   - First deployment takes 2-3 minutes
   - You'll see a progress screen

---

## 🔐 Step 4: Add Groq API Key

**IMPORTANT:** Your website is deployed but Agent Sri won't work yet. You need to add the Groq API key.

1. **In Vercel Dashboard:**
   - Your project should be open
   - Click "Settings" tab at the top
   - Click "Environment Variables" in the left sidebar

2. **Add the API key:**
   - **Name**: `GROQ_API_KEY`
   - **Value**: Paste your Groq API key from Step 1 (starts with `gsk_...`)
   - **Environment**: Select all (Production, Preview, Development)
   - Click "Save"

3. **Redeploy to apply changes:**
   - Go to "Deployments" tab
   - Click the three dots `...` on the latest deployment
   - Click "Redeploy"
   - Wait 1-2 minutes

---

## ✅ Step 5: Test Your Website

1. **Get your website URL:**
   - Vercel gives you a URL like: `https://operon-os-website.vercel.app`
   - Find it in the Vercel dashboard

2. **Test Agent Sri:**
   - Open your website
   - Click "Try Agent Sri" button
   - Type a question like: `230+23`
   - Agent Sri should respond with `253` ✨

3. **If it works:**
   - 🎉 Congratulations! Your website is LIVE!

4. **If it doesn't work:**
   - Check browser console (F12 → Console tab)
   - Make sure you added the `GROQ_API_KEY` correctly
   - Make sure you redeployed after adding the key

---

## 🌐 Step 6: Add Custom Domain (Optional)

Want to use your own domain like `operonos.com`?

1. **In Vercel Dashboard:**
   - Go to "Settings" → "Domains"
   - Click "Add"
   - Enter your domain (e.g., `operonos.com`)
   - Follow Vercel's DNS instructions

2. **Configure DNS:**
   - Go to your domain registrar (GoDaddy, Namecheap, etc.)
   - Add the DNS records Vercel provides
   - Wait 10-60 minutes for DNS propagation

---

## 🔧 Making Updates

When you want to update the website:

1. **Edit files locally**
2. **Commit and push to GitHub:**
   ```bash
   git add .
   git commit -m "Update: your changes here"
   git push
   ```
3. **Vercel auto-deploys** - your changes go live in 1-2 minutes!

---

## 💰 Pricing & Limits

### Vercel FREE Tier:
- ✅ Unlimited deployments
- ✅ 100 GB bandwidth/month
- ✅ Serverless functions included
- ✅ Automatic HTTPS
- ✅ Custom domains

### Groq FREE Tier:
- ✅ 30 requests/minute
- ✅ 14,400 requests/day
- ✅ Llama 3.1 70B model (smart & fast)
- ✅ No credit card required

**Perfect for demos and small websites!** 🚀

If you get high traffic, you can upgrade to paid plans later.

---

## 🆘 Troubleshooting

### Agent Sri not responding?
1. Check if `GROQ_API_KEY` is set in Vercel Environment Variables
2. Redeploy after adding environment variables
3. Check browser console for errors (F12 → Console)

### Build failed?
1. Make sure `package.json` has all dependencies
2. Check Vercel build logs for specific errors
3. Try running `npm install && npm run build` locally first

### Slow responses?
- Groq is usually super fast (<2 seconds)
- If slow, might be hitting rate limits
- Check Groq dashboard: https://console.groq.com

---

## 📞 Need Help?

- **Vercel Docs**: https://vercel.com/docs
- **Groq Docs**: https://console.groq.com/docs
- **GitHub Issues**: Create an issue in your repo

---

## 🎉 You're Done!

Your Operon OS website with Agent Sri is now LIVE and accessible to the world!

Share your URL: `https://your-site.vercel.app` 🚀

---

**Built with:**
- ⚡ Vite + React + TypeScript
- 🤖 Groq (Llama 3.1 70B)
- ☁️ Vercel Serverless Functions
