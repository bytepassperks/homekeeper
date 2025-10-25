# PowerShell script to delete old files and deploy

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "🚨 DELETING OLD FILES AND DEPLOYING" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Navigate to script directory
Set-Location $PSScriptRoot

Write-Host "Step 1: Deleting old .tsx files..." -ForegroundColor Yellow
if (Test-Path "supabase/functions/server/index.tsx") {
    Remove-Item "supabase/functions/server/index.tsx" -Force
    Write-Host "✅ Deleted index.tsx" -ForegroundColor Green
} else {
    Write-Host "⚠️  index.tsx not found (already deleted?)" -ForegroundColor Yellow
}

if (Test-Path "supabase/functions/server/kv_store.tsx") {
    Remove-Item "supabase/functions/server/kv_store.tsx" -Force
    Write-Host "✅ Deleted kv_store.tsx" -ForegroundColor Green
} else {
    Write-Host "⚠️  kv_store.tsx not found (already deleted?)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Step 2: Verifying remaining files..." -ForegroundColor Yellow
Write-Host "Files in supabase/functions/server/:"
Get-ChildItem "supabase/functions/server/"

Write-Host ""
Write-Host "Step 3: Checking for Supabase CLI..." -ForegroundColor Yellow
try {
    $null = Get-Command supabase -ErrorAction Stop
    Write-Host "✅ Supabase CLI found" -ForegroundColor Green
} catch {
    Write-Host "❌ Supabase CLI not installed!" -ForegroundColor Red
    Write-Host "Install it: npm install -g supabase"
    exit 1
}

Write-Host ""
Write-Host "Step 4: Logging in to Supabase..." -ForegroundColor Yellow
$loginCheck = supabase projects list 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "Running login..."
    supabase login
}
Write-Host "✅ Authenticated" -ForegroundColor Green

Write-Host ""
Write-Host "Step 5: Linking project..." -ForegroundColor Yellow
supabase link --project-ref eoldzusfrveckbgdszld

Write-Host ""
Write-Host "Step 6: Deploying Edge Function..." -ForegroundColor Yellow
supabase functions deploy server --no-verify-jwt

Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "✅ DEPLOYMENT COMPLETE!" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Testing the deployment..."
Write-Host ""
curl https://eoldzusfrveckbgdszld.supabase.co/functions/v1/make-server-7627b83a/health
Write-Host ""
Write-Host ""
Write-Host "If you see {`"status`":`"ok`",...}, it worked!"
Write-Host ""
Write-Host "Now try registering at: https://homekeeper-jfu0.onrender.com"
Write-Host ""
