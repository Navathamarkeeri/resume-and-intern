#!/bin/bash

echo "🚀 Starting deployment process..."

# Check if we're in the right directory
if [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    echo "❌ Error: Make sure you're in the resume-and-intern directory"
    echo "Directory structure should be:"
    echo "  - backend/"
    echo "  - frontend/"
    exit 1
fi

echo "✅ Directory structure verified"

# Add all files
echo "📦 Adding files to git..."
git add .

# Commit changes
echo "💾 Committing changes..."
git commit -m "Deploy full-stack internship platform"

# Push to GitHub
echo "🚀 Pushing to GitHub..."
git push origin main

echo "🎉 Deployment initiated!"
echo ""
echo "📋 Next steps:"
echo "1. Go to Render Dashboard"
echo "2. Connect this repository"
echo "3. Render will automatically deploy both services"
echo "4. Set MONGO_URI environment variable for backend"
echo ""
echo "🔗 Your services will be available at:"
echo "  - Backend: https://internship-backend.onrender.com"
echo "  - Frontend: https://internship-frontend.onrender.com"
