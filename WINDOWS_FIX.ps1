# PowerShell script to remove all versioned imports
# Run this in PowerShell (not Git Bash)

Set-Location "$HOME\Documents\homekeeper"

Write-Host "🔧 Removing all versioned imports..." -ForegroundColor Cyan

# Get all TypeScript and TSX files
$files = Get-ChildItem -Path . -Recurse -Include *.tsx,*.ts -Exclude node_modules

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    # Remove version numbers from imports
    $newContent = $content -replace '@([0-9]+\.){2}[0-9]+"', '"'
    Set-Content $file.FullName -Value $newContent -NoNewline
}

Write-Host "✅ All versioned imports removed!" -ForegroundColor Green
Write-Host ""
Write-Host "📦 Committing and pushing..." -ForegroundColor Cyan

git add .
git commit -m "Fix: Remove all versioned imports for production deployment"
git push origin main

Write-Host ""
Write-Host "🎉 Done! Wait 5 minutes for Render to deploy!" -ForegroundColor Green
