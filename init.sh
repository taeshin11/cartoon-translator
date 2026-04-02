#!/bin/bash
# CartoonTranslator - Development Init Script

echo "Starting CartoonTranslator dev server..."

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "Node.js is required. Install from https://nodejs.org"
    exit 1
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Start dev server
npm run dev
