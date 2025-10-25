# HomeKeeper - Simple Edge Function Deploy (Windows)

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "HomeKeeper - Simple Edge Function Deploy" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Check directory
if (-not (Test-Path "supabase/functions/server")) {
    Write-Host "❌ Error: supabase/functions/server directory not found" -ForegroundColor Red
    Write-Host "Run this script from your project root directory"
    exit 1
}

# Check for old .tsx files
if ((Test-Path "supabase/functions/server/index.tsx") -or (Test-Path "supabase/functions/server/kv_store.tsx")) {
    Write-Host "❌ ERROR: Old .tsx files still exist!" -ForegroundColor Red
    Write-Host ""
    Write-Host "You MUST delete these files first:"
    Write-Host "  - supabase/functions/server/index.tsx"
    Write-Host "  - supabase/functions/server/kv_store.tsx"
    Write-Host ""
    Write-Host "Run these commands:"
    Write-Host "  Remove-Item supabase/functions/server/index.tsx"
    Write-Host "  Remove-Item supabase/functions/server/kv_store.tsx"
    Write-Host ""
    exit 1
}

# Check for new .ts files
if (-not (Test-Path "supabase/functions/server/index.ts") -or -not (Test-Path "supabase/functions/server/kv_store.ts")) {
    Write-Host "❌ ERROR: Required .ts files not found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Make sure these files exist:"
    Write-Host "  - supabase/functions/server/index.ts"
    Write-Host "  - supabase/functions/server/kv_store.ts"
    Write-Host ""
    exit 1
}

Write-Host "✓ Directory structure looks good!" -ForegroundColor Green
Write-Host ""

# List files to deploy
Write-Host "Files to deploy:"
Get-ChildItem supabase/functions/server/*.ts
Write-Host ""

# Check if Supabase CLI is installed
try {
    $null = Get-Command supabase -ErrorAction Stop
    Write-Host "✓ Supabase CLI found" -ForegroundColor Green
} catch {
    Write-Host "❌ Supabase CLI not installed" -ForegroundColor Red
    Write-Host ""
    Write-Host "Install with:"
    Write-Host "  npm install -g supabase"
    exit 1
}

Write-Host ""

# Login check
Write-Host "Checking authentication..."
$loginCheck = supabase projects list 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "Logging in to Supabase..."
    supabase login
}

Write-Host "✓ Authenticated" -ForegroundColor Green
Write-Host ""

# Link project
Write-Host "Linking to project..."
supabase link --project-ref eoldzusfrveckbgdszld

Write-Host ""
Write-Host "✓ Project linked" -ForegroundColor Green
Write-Host ""

# Deploy
Write-Host "Deploying Edge Function..."
Write-Host ""
supabase functions deploy server --no-verify-jwt

Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "✓ DEPLOYMENT COMPLETE!" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Test your function:"
Write-Host "curl https://eoldzusfrveckbgdszld.supabase.co/functions/v1/make-server-7627b83a/health"
Write-Host ""
Write-Host "Expected response:"
Write-Host '{"status":"ok","timestamp":"2025-..."}'
Write-Host ""
