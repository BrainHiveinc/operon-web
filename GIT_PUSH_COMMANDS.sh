#!/bin/bash

# ============================================
# Git Push Commands for Operon OS Website
# Private Repo: https://github.com/BrainHiveinc/operon.git
# ============================================

# STEP 1: Get your GitHub Personal Access Token
# Go to: https://github.com/settings/tokens
# Click: "Generate new token" → "Generate new token (classic)"
# Select scopes: repo (full control)
# Copy the token (starts with ghp_...)

# STEP 2: Replace YOUR_GITHUB_TOKEN below with your actual token
# IMPORTANT: Keep this file private! Don't share your token!

YOUR_GITHUB_TOKEN="YOUR_TOKEN_HERE"

# ============================================
# Commands to push to GitHub
# ============================================

cd OS-Website-Production

# Initialize git (if not already done)
git init

# Add all files (respects .gitignore)
git add .

# Commit
git commit -m "Initial commit: Operon OS website with Agent Sri demo"

# Add remote with token authentication
git remote add origin https://${YOUR_GITHUB_TOKEN}@github.com/BrainHiveinc/operon.git

# Push to main branch
git branch -M main
git push -u origin main

echo "✅ Pushed to GitHub successfully!"
