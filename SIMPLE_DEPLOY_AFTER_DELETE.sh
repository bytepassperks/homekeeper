#!/bin/bash

echo "=========================================="
echo "HomeKeeper - Simple Edge Function Deploy"
echo "=========================================="
echo ""

# Check directory
if [ ! -d "supabase/functions/server" ]; then
    echo "❌ Error: supabase/functions/server directory not found"
    echo "Run this script from your project root directory"
    exit 1
fi

# Check for old .tsx files
if [ -f "supabase/functions/server/index.tsx" ] || [ -f "supabase/functions/server/kv_store.tsx" ]; then
    echo "❌ ERROR: Old .tsx files still exist!"
    echo ""
    echo "You MUST delete these files first:"
    echo "  - supabase/functions/server/index.tsx"
    echo "  - supabase/functions/server/kv_store.tsx"
    echo ""
    echo "Run these commands:"
    echo "  rm supabase/functions/server/index.tsx"
    echo "  rm supabase/functions/server/kv_store.tsx"
    echo ""
    exit 1
fi

# Check for new .ts files
if [ ! -f "supabase/functions/server/index.ts" ] || [ ! -f "supabase/functions/server/kv_store.ts" ]; then
    echo "❌ ERROR: Required .ts files not found!"
    echo ""
    echo "Make sure these files exist:"
    echo "  - supabase/functions/server/index.ts"
    echo "  - supabase/functions/server/kv_store.ts"
    echo ""
    exit 1
fi

echo "✓ Directory structure looks good!"
echo ""

# List files to deploy
echo "Files to deploy:"
ls -la supabase/functions/server/*.ts
echo ""

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI not installed"
    echo ""
    echo "Install with:"
    echo "  npm install -g supabase"
    exit 1
fi

echo "✓ Supabase CLI found"
echo ""

# Login check
echo "Checking authentication..."
if ! supabase projects list &> /dev/null; then
    echo "Logging in to Supabase..."
    supabase login
fi

echo "✓ Authenticated"
echo ""

# Link project
echo "Linking to project..."
supabase link --project-ref eoldzusfrveckbgdszld

echo ""
echo "✓ Project linked"
echo ""

# Deploy
echo "Deploying Edge Function..."
echo ""
supabase functions deploy server --no-verify-jwt

echo ""
echo "=========================================="
echo "✓ DEPLOYMENT COMPLETE!"
echo "=========================================="
echo ""
echo "Test your function:"
echo "curl https://eoldzusfrveckbgdszld.supabase.co/functions/v1/make-server-7627b83a/health"
echo ""
echo "Expected response:"
echo '{"status":"ok","timestamp":"2025-..."}'
echo ""
