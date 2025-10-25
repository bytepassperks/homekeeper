# HomeKeeper Edge Function Deployment Script (Windows)
# This script deploys the Supabase Edge Function to fix authentication

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "HomeKeeper Edge Function Deployment" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Supabase CLI is installed
try {
    $null = Get-Command supabase -ErrorAction Stop
    Write-Host "✓ Supabase CLI found" -ForegroundColor Green
} catch {
    Write-Host "❌ Supabase CLI is not installed." -ForegroundColor Red
    Write-Host ""
    Write-Host "Install it with:"
    Write-Host "  npm install -g supabase"
    Write-Host ""
    exit 1
}

Write-Host ""

# Remove old .tsx files if they exist
Write-Host "Cleaning up old files..."
if (Test-Path "supabase/functions/server/index.tsx") {
    Remove-Item "supabase/functions/server/index.tsx"
    Write-Host "✓ Removed old index.tsx" -ForegroundColor Green
}
if (Test-Path "supabase/functions/server/kv_store.tsx") {
    Remove-Item "supabase/functions/server/kv_store.tsx"
    Write-Host "✓ Removed old kv_store.tsx" -ForegroundColor Green
}
Write-Host ""

# Check if logged in
$loginCheck = supabase projects list 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  Not logged in to Supabase" -ForegroundColor Yellow
    Write-Host "Running login..."
    supabase login
}

Write-Host "✓ Authenticated with Supabase" -ForegroundColor Green
Write-Host ""

# Link project
Write-Host "Linking to project..."
$PROJECT_ID = "eoldzusfrveckbgdszld"
supabase link --project-ref $PROJECT_ID

Write-Host ""
Write-Host "✓ Project linked" -ForegroundColor Green
Write-Host ""

# Deploy function
Write-Host "Deploying Edge Function..."
supabase functions deploy server

Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "✓ Deployment Complete!" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:"
Write-Host "1. Test the function:"
Write-Host "   curl https://$PROJECT_ID.supabase.co/functions/v1/make-server-7627b83a/health"
Write-Host ""
Write-Host "2. Try registering on your app"
Write-Host ""
Write-Host "3. If issues persist, check logs at:"
Write-Host "   https://supabase.com/dashboard/project/$PROJECT_ID/functions/server"
Write-Host ""
