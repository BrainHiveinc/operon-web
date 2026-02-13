#!/bin/bash

# Agent Sri Integration Setup Script
# This script helps you install and configure Agent Sri for the live demo

set -e

echo "🚀 Agent Sri Integration Setup"
echo "================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}Error: Please run this script from the OS-Website directory${NC}"
    exit 1
fi

echo -e "${YELLOW}Step 1: Choose API Server${NC}"
echo "Which backend would you like to use?"
echo "  1) Node.js/Express (recommended for web developers)"
echo "  2) Python/FastAPI (better integration with Agent Sri)"
read -p "Enter choice (1 or 2): " server_choice

echo ""
echo -e "${YELLOW}Step 2: Install Agent Sri${NC}"
echo ""

# Create agent-sri directory
mkdir -p agent-sri
cd agent-sri

# Check if Agent Sri is already installed
if [ -f "core_agent.py" ]; then
    echo -e "${GREEN}✅ Agent Sri already installed${NC}"
else
    echo "Downloading Agent Sri installer..."

    # Try to download installer
    if curl -o brainhive-setup.sh https://raw.githubusercontent.com/BrainHiveinc/sri-bot-installer-/main/custom-install.sh 2>/dev/null; then
        echo -e "${GREEN}✅ Downloaded installer${NC}"
        echo ""
        echo "Running Agent Sri installer..."
        bash brainhive-setup.sh
    else
        echo -e "${YELLOW}⚠️  Could not download installer automatically${NC}"
        echo ""
        echo "Please install Agent Sri manually:"
        echo "1. Download files from: https://github.com/BrainHiveinc/sri-bot-installer-"
        echo "2. Place core_agent.py and other files in: $(pwd)"
        echo "3. Run: pip install -r requirements.txt --break-system-packages"
        echo ""
        read -p "Press Enter when Agent Sri is installed..."
    fi
fi

cd ..

echo ""
echo -e "${YELLOW}Step 3: Setup API Server${NC}"
echo ""

if [ "$server_choice" == "1" ]; then
    # Node.js setup
    echo "Setting up Node.js API server..."

    cd server

    # Install dependencies
    if [ ! -d "node_modules" ]; then
        echo "Installing npm dependencies..."
        npm install
    else
        echo -e "${GREEN}✅ Dependencies already installed${NC}"
    fi

    # Create .env file
    if [ ! -f ".env" ]; then
        echo "Creating .env file..."
        cp .env.example .env
        echo -e "${GREEN}✅ Created .env file${NC}"
        echo ""
        echo -e "${YELLOW}📝 Please edit server/.env if needed${NC}"
    else
        echo -e "${GREEN}✅ .env file exists${NC}"
    fi

    cd ..

    echo ""
    echo -e "${GREEN}🎉 Setup Complete!${NC}"
    echo ""
    echo "To start the servers:"
    echo ""
    echo "  Terminal 1 (Frontend):"
    echo "    npm run dev"
    echo ""
    echo "  Terminal 2 (API Server):"
    echo "    cd server && npm start"
    echo ""

elif [ "$server_choice" == "2" ]; then
    # Python setup
    echo "Setting up Python API server..."

    # Install Python dependencies
    echo "Installing Python dependencies..."
    pip install fastapi uvicorn websockets --break-system-packages || true

    echo ""
    echo -e "${GREEN}🎉 Setup Complete!${NC}"
    echo ""
    echo "To start the servers:"
    echo ""
    echo "  Terminal 1 (Frontend):"
    echo "    npm run dev"
    echo ""
    echo "  Terminal 2 (API Server):"
    echo "    cd server && python3 agent_sri_api.py"
    echo ""
fi

echo "Then open: http://localhost:5105"
echo "Click 'Watch Agent Sri Live' to see it in action!"
echo ""
echo -e "${YELLOW}📖 For detailed docs, see: INSTALL_AGENT_SRI.md${NC}"
