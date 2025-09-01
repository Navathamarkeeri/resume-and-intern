#!/bin/bash

echo "🚀 Starting deployment process..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building the project..."
npm run build

# Check if build was successful
if [ -d "build" ]; then
    echo "✅ Build successful! Build folder created."
    echo "📁 Build contents:"
    ls -la build/
    echo ""
    echo "🎉 Your frontend is ready for deployment!"
    echo "📋 Next steps:"
    echo "1. Push this code to GitHub"
    echo "2. Connect your repository to Render"
    echo "3. Use build command: npm install && npm run build"
    echo "4. Set publish directory: build"
    echo "5. Add environment variable: REACT_APP_API_URL=https://intern-backend-yfxc.onrender.com"
else
    echo "❌ Build failed! Please check the error messages above."
    exit 1
fi
