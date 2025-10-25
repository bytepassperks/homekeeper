# 📸 VISUAL FIX GUIDE - Step by Step with Screenshots

## Current Error

```
[vite]: Rollup failed to resolve import "sonner@2.0.3" from "/opt/render/project/src/App.tsx"
```

This means: **Your import statements have version numbers** which don't work in regular deployments.

---

## The 30-Second Fix

### Step 1: Open VS Code

Open your `homekeeper` folder in VS Code.

---

### Step 2: Open Find & Replace

**Press:** `Ctrl+Shift+H` (Windows/Linux) or `Cmd+Shift+H` (Mac)

This opens the "Find in Files" sidebar on the left.

---

### Step 3: Enable Regex Mode

**Click the `.*` button** in the search box.

It should highlight/turn blue when enabled.

---

### Step 4: Enter the Search Pattern

In the **"Find"** box, type **exactly**:

```
@\d+\.\d+\.\d+
```

This finds all version numbers like `@2.0.3`, `@1.1.4`, etc.

---

### Step 5: Leave Replace Empty

In the **"Replace"** box, **leave it completely empty**.

This will remove the matched text.

---

### Step 6: Specify Files to Search

In the **"files to include"** box, type:

```
*.tsx,*.ts
```

This searches only TypeScript/React files.

---

### Step 7: Replace All

**Click the "Replace All" button** (icon shows two arrows in a box)

VS Code will show a popup: "Replace XX occurrences across YY files?"

**Click "Replace"**

---

### Step 8: Verify Changes

In VS Code terminal (or Git Bash), run:

```bash
grep -r "@2.0.3" --include="*.tsx" .
```

Should show: **NO RESULTS** (or only in .md documentation files, which is fine)

---

### Step 9: Commit and Push

```bash
git add .
git commit -m "Fix: Remove versioned imports for deployment"
git push origin main
```

---

### Step 10: Monitor Render

1. Go to https://dashboard.render.com
2. Click your HomeKeeper service
3. Click "Events" or "Logs"
4. Wait 3-5 minutes
5. Look for:

```
✓ built in 5.58s
==> Build successful 🎉
==> Running 'npm start'
Accepting connections at http://0.0.0.0:10000
```

6. Status changes to: 🟢 **Live**

---

## What Just Happened?

### Before:
```typescript
import { toast } from 'sonner@2.0.3';
import { Button } from '@radix-ui/react-button@1.1.2';
import { cva } from 'class-variance-authority@0.7.1';
```

### After:
```typescript
import { toast } from 'sonner';
import { Button } from '@radix-ui/react-button';
import { cva } from 'class-variance-authority';
```

**Result:** Vite can now resolve these imports correctly! ✅

---

## Alternative: Manual Fix (If Find & Replace Doesn't Work)

If VS Code Find & Replace isn't working, manually edit these files:

### 1. App.tsx (line 26)

**Find this line:**
```typescript
import { toast, Toaster } from 'sonner@2.0.3';
```

**Change to:**
```typescript
import { toast, Toaster } from 'sonner';
```

---

### 2. components/SocialShare.tsx (line 3)

**Find this line:**
```typescript
import { toast } from 'sonner@2.0.3';
```

**Change to:**
```typescript
import { toast } from 'sonner';
```

---

### 3. components/ui/sonner.tsx (lines 3-4)

**Find these lines:**
```typescript
import { useTheme } from "next-themes@0.4.6";
import { Toaster as Sonner, ToasterProps } from "sonner@2.0.3";
```

**Change to:**
```typescript
import { Toaster as Sonner, ToasterProps } from "sonner";
```

**Also change line 7:**
```typescript
// FROM:
const { theme = "system" } = useTheme();

// TO:
// (remove this line completely)
```

**And line 10:**
```typescript
// FROM:
theme={theme as ToasterProps["theme"]}

// TO:
theme="light"
```

---

### 4. All components/ui/*.tsx files

There are MANY more versioned imports in the UI components folder.

**Recommended:** Use the Find & Replace method above instead of editing them all manually.

**Or:** Run this command in Git Bash:
```bash
find components/ui -name "*.tsx" -exec sed -i 's/@[0-9]\+\.[0-9]\+\.[0-9]\+//g' {} +
```

---

## Troubleshooting

### "Regex not working in VS Code"

Make sure you clicked the `.*` button in the search box - it should be highlighted/blue.

---

### "Still see versioned imports after Replace All"

Check you entered the pattern correctly:
- Must be: `@\d+\.\d+\.\d+`
- Not: `@d+.d+.d+` (missing backslashes)

---

### "Render still failing"

After pushing, verify your GitHub repo:
1. Go to: https://github.com/bytepassperks/homekeeper
2. Click `App.tsx`
3. Find line 26 (the toast import)
4. Should show: `import { toast, Toaster } from 'sonner';`
5. Should NOT show: `import { toast, Toaster } from 'sonner@2.0.3';`

If it still shows the version, your push didn't work. Try again:
```bash
git status
git add .
git commit -m "Fix imports"
git push origin main --force
```

---

## Expected Timeline

| Step | Time |
|------|------|
| Find & Replace in VS Code | 30 sec |
| Commit & Push | 30 sec |
| Render Auto-Deploy | 3-5 min |
| **TOTAL** | **4-6 min** |

---

## Success Indicators

✅ Find & Replace shows "Replaced XX occurrences"
✅ `git status` shows modified files
✅ Push completes without errors
✅ Render logs show "Build successful"
✅ Render status changes to "Live"
✅ Can visit your app URL and see the landing page

---

## Next Steps After Success

Once your app is live:

1. **Set up Supabase database** (see `SUPABASE_SETUP.md`)
2. **Configure auth redirect URLs** in Supabase dashboard
3. **Test the application** - sign up, add items, etc.
4. **Update environment variables** if needed

---

**READY?** Go back to **Step 1** and follow along!

**QUICK PATH:** Just follow **Steps 1-9** in order. Takes 6 minutes total.

🎉 **You're almost there!**
