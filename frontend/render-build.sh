#!/bin/bash
set -e

echo "🚀 Starting Render build process..."

# Ensure we're in the right directory
cd /opt/render/project/src

# Clear any existing node_modules and package-lock.json
echo "🧹 Cleaning existing dependencies..."
rm -rf node_modules package-lock.json

# Install dependencies with proper permissions
echo "📦 Installing dependencies..."
npm install --unsafe-perm --legacy-peer-deps

# Verify react-scripts is available
echo "🔍 Verifying react-scripts installation..."
if [ ! -f "node_modules/.bin/react-scripts" ]; then
    echo "❌ react-scripts not found in node_modules/.bin/"
    echo "📁 Contents of node_modules/.bin/:"
    ls -la node_modules/.bin/ || true
    echo "📦 Reinstalling react-scripts..."
    npm install react-scripts --unsafe-perm --legacy-peer-deps
fi

# Make react-scripts executable
echo "🔧 Setting proper permissions..."
chmod +x node_modules/.bin/react-scripts

# Build the project
echo "🔨 Building the project..."
npm run build

# Check if build was successful
if [ -d "build" ]; then
    echo "✅ Build successful! Build folder created."
    echo "📁 Build contents:"
    ls -la build/
    echo "🎉 Render build completed successfully!"
else
    echo "❌ Build failed! Build folder not found."
    exit 1
fi
