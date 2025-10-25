#!/bin/bash

echo "=========================================="
echo "🚨 DELETING OLD FILES AND DEPLOYING"
echo "=========================================="
echo ""

# Navigate to project root (adjust if needed)
cd "$(dirname "$0")"

echo "Step 1: Deleting old .tsx files..."
if [ -f "supabase/functions/server/index.tsx" ]; then
    rm supabase/functions/server/index.tsx
    echo "✅ Deleted index.tsx"
else
    echo "⚠️  index.tsx not found (already deleted?)"
fi

if [ -f "supabase/functions/server/kv_store.tsx" ]; then
    rm supabase/functions/server/kv_store.tsx
    echo "✅ Deleted kv_store.tsx"
else
    echo "⚠️  kv_store.tsx not found (already deleted?)"
fi

echo ""
echo "Step 2: Verifying remaining files..."
echo "Files in supabase/functions/server/:"
ls -la supabase/functions/server/

echo ""
echo "Step 3: Checking for Supabase CLI..."
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI not installed!"
    echo "Install it: npm install -g supabase"
    exit 1
fi
echo "✅ Supabase CLI found"

echo ""
echo "Step 4: Logging in to Supabase..."
if ! supabase projects list &> /dev/null; then
    echo "Running login..."
    supabase login
fi
echo "✅ Authenticated"

echo ""
echo "Step 5: Linking project..."
supabase link --project-ref eoldzusfrveckbgdszld

echo ""
echo "Step 6: Deploying Edge Function..."
supabase functions deploy server --no-verify-jwt

echo ""
echo "=========================================="
echo "✅ DEPLOYMENT COMPLETE!"
echo "=========================================="
echo ""
echo "Testing the deployment..."
echo ""
curl https://eoldzusfrveckbgdszld.supabase.co/functions/v1/make-server-7627b83a/health
echo ""
echo ""
echo "If you see {\"status\":\"ok\",...}, it worked!"
echo ""
echo "Now try registering at: https://homekeeper-jfu0.onrender.com"
echo ""
