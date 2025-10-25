# 🔧 FIX WITHOUT VS CODE - Git Bash Commands

## The Problem

Your files have versioned imports like:
```typescript
import { toast } from 'sonner@2.0.3';
```

These need to be:
```typescript
import { toast } from 'sonner';
```

## The Solution - Copy/Paste These Commands

### Step 1: Open Git Bash

Open Git Bash in your homekeeper folder (or cd to it)

```bash
cd ~/Documents/homekeeper
```

---

### Step 2: Run the Fix Command

**Copy and paste this ENTIRE command:**

```bash
find . -type f \( -name "*.tsx" -o -name "*.ts" \) ! -path "./node_modules/*" -exec sed -i 's/@[0-9]\+\.[0-9]\+\.[0-9]\+//g' {} +
```

**What this does:**
- Finds all .tsx and .ts files
- Skips node_modules folder
- Removes all @version strings like @2.0.3, @1.1.4, etc.

**Press Enter** - it will run silently (no output is normal)

---

### Step 3: Verify It Worked

```bash
grep -r "@2.0.3" --include="*.tsx" --include="*.ts" . | grep -v node_modules
```

**Expected result:** No output (or only lines from .md files)

If you see TypeScript files listed, the fix didn't work. Try the Windows alternative below.

---

### Step 4: Check a Few Files

```bash
# Check App.tsx import
head -30 App.tsx | grep import

# Should show: import { toast, Toaster } from 'sonner';
# NOT: import { toast, Toaster } from 'sonner@2.0.3';
```

```bash
# Check a UI component
head -10 components/ui/button.tsx | grep import

# Should NOT have any @1.2.3 style versions
```

---

### Step 5: Commit and Push

```bash
git add .
git commit -m "Fix: Remove all versioned imports for deployment"
git push origin main
```

---

### Step 6: Wait for Render Deploy

1. Go to https://dashboard.render.com
2. Your service will auto-deploy (takes 3-5 minutes)
3. Watch for "Build successful 🎉"

---

## Alternative: Windows-Specific Command

If the above doesn't work, try this Windows PowerShell version:

**Open PowerShell** (not Git Bash):

```powershell
cd ~/Documents/homekeeper

# Fix all versioned imports
Get-ChildItem -Recurse -Include *.tsx,*.ts -Exclude node_modules | ForEach-Object {
    (Get-Content $_.FullName -Raw) -replace '@\d+\.\d+\.\d+', '' | Set-Content $_.FullName -NoNewline
}
```

Then verify and push (back in Git Bash):
```bash
git add .
git commit -m "Fix: Remove versioned imports"
git push origin main
```

---

## Alternative: Manual Download from Figma Make

If commands don't work, download these fixed files from Figma Make and replace your local versions:

### Critical Files (Must Replace):
1. **App.tsx**
2. **components/SocialShare.tsx**
3. **components/ui/sonner.tsx**

### All UI Components (Recommended):
Download the entire `components/ui/` folder from Figma Make and replace your local one.

---

## Verification Checklist

Run these to verify:

```bash
# 1. No more @2.0.3 style imports
grep -r "@.*\..*\." --include="*.tsx" . | grep -v node_modules | wc -l
# Should show: 0

# 2. App.tsx is fixed
grep "sonner" App.tsx
# Should show: from 'sonner' NOT from 'sonner@2.0.3'

# 3. Git sees changes
git status
# Should show: modified: App.tsx, modified: components/...

# 4. Ready to push
git diff --stat
# Should show lots of modified files
```

---

## Expected Timeline

⏱️ Run commands: 30 seconds
⏱️ Commit & push: 30 seconds
⏱️ Render deploy: 5 minutes
━━━━━━━━━━━━━━━━━━━━━━━━━
⏱️ TOTAL: 6 minutes to LIVE!

---

## Troubleshooting

### "sed: command not found"

Git Bash should have sed. If not, use the PowerShell alternative above.

### "Permission denied"

Make sure you're in the homekeeper folder:
```bash
pwd
# Should show: /c/Users/YourName/Documents/homekeeper
```

### Files still have versions

Try the PowerShell method, or manually download the files from Figma Make.

### Push fails

```bash
git status
git add -A
git commit -m "Fix imports"
git push origin main --force
```

---

## Quick Copy-Paste Version

**Just run these 4 commands in order:**

```bash
cd ~/Documents/homekeeper
find . -type f \( -name "*.tsx" -o -name "*.ts" \) ! -path "./node_modules/*" -exec sed -i 's/@[0-9]\+\.[0-9]\+\.[0-9]\+//g' {} +
git add .
git commit -m "Fix: Remove versioned imports"
git push origin main
```

**Done!** Wait 5 minutes and your app is LIVE!

---

## After Success

Once deployed successfully:

1. ✅ Your app is live at your Render URL
2. Set up Supabase (see SUPABASE_SETUP.md)
3. Test all features
4. Celebrate! 🎉

---

**ACTION NOW:** Open Git Bash and run the commands in Step 2!
