#!/bin/bash
set -e

echo "🧹 Starting clean installation process..."

# Remove existing dependencies
echo "🗑️ Removing existing node_modules and lock files..."
rm -rf node_modules package-lock.json

# Clear npm cache
echo "🧽 Clearing npm cache..."
npm cache clean --force

# Install dependencies with legacy peer deps
echo "📦 Installing dependencies with legacy peer deps..."
npm install --legacy-peer-deps

# Verify installation
echo "✅ Verifying installation..."
if [ -f "node_modules/.bin/react-scripts" ]; then
    echo "✅ react-scripts found successfully"
else
    echo "❌ react-scripts not found"
    exit 1
fi

echo "🎉 Clean installation completed successfully!"
