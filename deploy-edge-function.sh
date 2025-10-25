#!/bin/bash

# HomeKeeper Edge Function Deployment Script
# This script deploys the Supabase Edge Function to fix authentication

echo "=========================================="
echo "HomeKeeper Edge Function Deployment"
echo "=========================================="
echo ""

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI is not installed."
    echo ""
    echo "Install it with:"
    echo "  npm install -g supabase"
    echo ""
    echo "Or on macOS:"
    echo "  brew install supabase/tap/supabase"
    echo ""
    exit 1
fi

echo "✓ Supabase CLI found"
echo ""

# Remove old .tsx files if they exist
echo "Cleaning up old files..."
if [ -f "supabase/functions/server/index.tsx" ]; then
    rm supabase/functions/server/index.tsx
    echo "✓ Removed old index.tsx"
fi
if [ -f "supabase/functions/server/kv_store.tsx" ]; then
    rm supabase/functions/server/kv_store.tsx
    echo "✓ Removed old kv_store.tsx"
fi
echo ""

# Check if logged in
if ! supabase projects list &> /dev/null; then
    echo "⚠️  Not logged in to Supabase"
    echo "Running login..."
    supabase login
fi

echo "✓ Authenticated with Supabase"
echo ""

# Link project
echo "Linking to project..."
PROJECT_ID="eoldzusfrveckbgdszld"
supabase link --project-ref $PROJECT_ID

echo ""
echo "✓ Project linked"
echo ""

# Deploy function
echo "Deploying Edge Function..."
supabase functions deploy server

echo ""
echo "=========================================="
echo "✓ Deployment Complete!"
echo "=========================================="
echo ""
echo "Next steps:"
echo "1. Test the function:"
echo "   curl https://$PROJECT_ID.supabase.co/functions/v1/make-server-7627b83a/health"
echo ""
echo "2. Try registering on your app"
echo ""
echo "3. If issues persist, check logs at:"
echo "   https://supabase.com/dashboard/project/$PROJECT_ID/functions/server"
echo ""
