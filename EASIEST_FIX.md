# ⚡ EASIEST FIX - Download Fresh Files

## The Problem

Your local files have versioned imports (like `sonner@2.0.3`) which don't work in deployment.

I've fixed them in Figma Make, but your local copy still has the old versions.

## The Solution (EASIEST - 5 Minutes)

### Option 1: Use Find & Replace (RECOMMENDED - 30 seconds)

1. Open VS Code in your homekeeper folder
2. Press `Ctrl+Shift+H` (Find & Replace in Files)
3. Click the `.*` button to enable Regex
4. In "Find": `@\d+\.\d+\.\d+`
5. In "Replace": (leave completely empty)
6. In "files to include": `*.tsx,*.ts`
7. Click **"Replace All"** button
8. Done!

Then push:
```bash
git add .
git commit -m "Fix: Remove versioned imports"
git push origin main
```

### Option 2: Download App.tsx from Figma Make

I've fixed the main files. Download these from Figma Make and replace your local versions:

1. **App.tsx** - Main app file (CRITICAL)
2. **components/ui/sonner.tsx** - Toast notifications
3. **components/SocialShare.tsx** - Social sharing

Then push:
```bash
git add .
git commit -m "Fix: Update imports from Figma Make"  
git push origin main
```

### Option 3: Manual Edit (if you prefer)

Open these files in VS Code and change:

**File: App.tsx (line 26)**
```typescript
// CHANGE FROM:
import { toast, Toaster } from 'sonner@2.0.3';

// TO:
import { toast, Toaster } from 'sonner';
```

**File: components/SocialShare.tsx (line 3)**
```typescript
// CHANGE FROM:
import { toast } from 'sonner@2.0.3';

// TO:
import { toast } from 'sonner';
```

**File: components/ui/sonner.tsx (lines 3-4)**
```typescript
// CHANGE FROM:
import { useTheme } from "next-themes@0.4.6";
import { Toaster as Sonner, ToasterProps } from "sonner@2.0.3";

// TO:
import { Toaster as Sonner, ToasterProps } from "sonner";
```

**And remove the useTheme line from the component** (line 7):
```typescript
// REMOVE THIS LINE:
const { theme = "system" } = useTheme();

// CHANGE:
theme={theme as ToasterProps["theme"]}

// TO:
theme="light"
```

Then push:
```bash
git add .
git commit -m "Fix: Remove versioned imports manually"
git push origin main
```

## Which Option Should You Choose?

- **Option 1** (Find & Replace) - FASTEST and fixes ALL files at once ⚡
- **Option 2** (Download) - If you want fresh files from Figma Make
- **Option 3** (Manual) - If you want to understand what changed

**I recommend Option 1** - it takes 30 seconds and fixes everything.

## After Fixing

Wait 3-5 minutes for Render to deploy.

Expected success logs:
```
✓ built in 5.58s
==> Build successful 🎉
==> Running 'npm start'  
Accepting connections...
```

## Verify Before Pushing

```bash
# Make sure no versioned imports remain
grep -r "@2.0.3" --include="*.tsx" .
grep -r "@0.4.6" --include="*.tsx" .

# Both should show NO results (or only in .md files which is fine)
```

## Timeline

⏱️ Option 1 (Find & Replace): 30 seconds
⏱️ Option 2 (Download files): 5 minutes
⏱️ Option 3 (Manual edit): 10 minutes
⏱️ Push to GitHub: 30 seconds
⏱️ Render deploy: 3-5 minutes
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⏱️ TOTAL: 4-16 minutes depending on option

---

**DO THIS NOW**: Pick Option 1, follow the 7 steps, push, wait 5 minutes. Your app will be LIVE!
