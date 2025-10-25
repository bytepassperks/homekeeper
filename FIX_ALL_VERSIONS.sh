#!/bin/bash
# Complete fix for all versioned imports and deployment issues

cd ~/Documents/homekeeper

echo "🔧 Fixing all versioned imports..."

# Remove version numbers from all imports
find . -name "*.tsx" -not -path "*/node_modules/*" -type f -exec sed -i 's/@\([0-9]\+\.[0-9]\+\.[0-9]\+\)"/"/' {} +
find . -name "*.ts" -not -path "*/node_modules/*" -type f -exec sed -i 's/@\([0-9]\+\.[0-9]\+\.[0-9]\+\)"/"/' {} +

echo "✅ All versioned imports fixed!"
echo ""
echo "📦 Committing changes..."

# Add all changes
git add .

# Commit with message
git commit -m "Fix: Remove all versioned imports + add Tailwind PostCSS plugin"

# Push to GitHub
git push origin main

echo ""
echo "🎉 All done! Your changes are pushed to GitHub!"
echo ""
echo "⏳ Now wait 5 minutes for Render to deploy..."
echo ""
echo "🌐 Then visit your Render URL to see your beautiful website!"
