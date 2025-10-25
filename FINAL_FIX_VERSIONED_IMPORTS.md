# 🔥 FINAL FIX - Remove Versioned Imports

## The Problem

Your files have Figma Make's special versioned imports like:
```typescript
import { toast } from 'sonner@2.0.3';
import { Button } from '@radix-ui/react-button@1.0.0';
```

These DON'T work in regular deployments. They need to be:
```typescript
import { toast } from 'sonner';
import { Button } from '@radix-ui/react-button';
```

## The Error
```
Rollup failed to resolve import "sonner@2.0.3"
```

## Quick Fix (Copy-Paste This Command)

Run this in your homekeeper folder:

### For Windows (Git Bash):
```bash
cd ~/Documents/homekeeper

# Fix all @version imports in .tsx files
find . -name "*.tsx" -type f -exec sed -i 's/@[0-9]\+\.[0-9]\+\.[0-9]\+//g' {} +

# Fix all @version imports in .ts files
find . -name "*.ts" -type f -exec sed -i 's/@[0-9]\+\.[0-9]\+\.[0-9]\+//g' {} +

# Verify the changes
grep -r "@[0-9]\.[0-9]\.[0-9]" --include="*.tsx" --include="*.ts" .

# Should show NO results (or very few)
```

### For Windows (PowerShell):
```powershell
cd ~/Documents/homekeeper

# Fix all versioned imports
Get-ChildItem -Recurse -Include *.tsx,*.ts | ForEach-Object {
    (Get-Content $_.FullName) -replace '@\d+\.\d+\.\d+', '' | Set-Content $_.FullName
}

# Verify
Get-ChildItem -Recurse -Include *.tsx,*.ts | Select-String '@\d+\.\d+\.\d+'
```

### Manual Fix (If Commands Don't Work)

Use Find & Replace in VS Code:

1. Press `Ctrl+Shift+H` (Find & Replace in Files)
2. Enable Regex (click `.*` button)
3. Find: `@\d+\.\d+\.\d+`
4. Replace: (leave empty)
5. Include: `*.tsx,*.ts`
6. Click "Replace All"

## After Running the Fix

```bash
# Verify no versioned imports remain
grep -r "@2.0.3" . --include="*.tsx"
grep -r "@1.1." . --include="*.tsx"

# Should show NO results

# Commit and push
git add .
git commit -m "Fix: Remove versioned imports for deployment"
git push origin main
```

## What This Does

**Before:**
```typescript
import { toast } from 'sonner@2.0.3';
import { Button } from '@radix-ui/react-button@1.0.0';
import { cva } from 'class-variance-authority@0.7.1';
```

**After:**
```typescript
import { toast } from 'sonner';
import { Button } from '@radix-ui/react-button';
import { cva } from 'class-variance-authority';
```

## Expected Render Logs (After This Fix)

```
==> Running build command 'npm install && npm run build'...
✓ 2812 modules transformed.
✓ built in 5.58s
build/index.html     0.45 kB
==> Build successful 🎉
==> Running 'npm start'
Accepting connections...
✅ LIVE!
```

## Timeline

⏱️ Run the command: 10 seconds
⏱️ Commit & push: 30 seconds  
⏱️ Render deploy: 3-5 minutes
━━━━━━━━━━━━━━━━━━━━━━━━━━━
⏱️ TOTAL: 6 minutes to LIVE! 🎉

## Troubleshooting

### If the find command doesn't work:

Use VS Code Find & Replace as shown in "Manual Fix" above.

### If you get merge conflicts:

```bash
git reset --hard
# Then run the fix command again
git add .
git commit -m "Fix: Remove versioned imports"
git push origin main
```

### To verify it worked:

```bash
# Check a few files manually
cat App.tsx | grep "import"
cat components/ui/button.tsx | grep "import"

# Should NOT see any @1.2.3 style versions
```

## Why This Happened

Figma Make uses special versioned imports to ensure exact package versions. But regular deployments can't handle this syntax - they expect standard imports without versions.

## One-Liner Summary

**Remove all `@1.2.3` style version numbers from import statements.**

---

**ACTION NOW**: Copy the command for your OS and run it!
