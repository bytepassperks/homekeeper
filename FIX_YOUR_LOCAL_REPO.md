# 🔧 FIX YOUR LOCAL REPOSITORY STRUCTURE

## The Problem

Your local repository has a **different structure** than Figma Make:

**Your Local Repo:**
```
/homekeeper
  /src              ← You have this folder
    App.tsx
    /components
    /utils
    /styles
  index.html
  main.tsx          ← Points to ./App (doesn't exist in root)
  package.json
```

**Figma Make (Correct):**
```
/
  App.tsx           ← In ROOT, not in /src
  /components
  /utils
  /styles
  index.html
  main.tsx          ← Points to ./App (exists in root)
  package.json
```

**The Error:**
```
Could not resolve "./App" from "main.tsx"
```

This happens because your `main.tsx` tries to import `./App` but `App.tsx` is in `/src/App.tsx` in your local repo.

## The Solution - Option 1: Move Everything Out of /src (RECOMMENDED)

This matches the Figma Make structure:

### Step 1: Move all files from /src to root

In your `homekeeper` folder, run:

```bash
# Move everything from src to root
mv src/* .

# Remove empty src folder
rmdir src
```

**Or manually**:
1. Move `App.tsx` from `/src` to root
2. Move `components` folder from `/src` to root (if not already there)
3. Move `utils` folder from `/src` to root (if not already there)
4. Move `styles` folder from `/src` to root (if not already there)
5. Move `types` folder from `/src` to root (if not already there)
6. Delete the empty `/src` folder

### Step 2: Verify the structure

Run:
```bash
ls -la
```

You should see:
- App.tsx (in root, not in /src)
- components/ (folder)
- utils/ (folder)
- styles/ (folder)
- types/ (folder)
- index.html
- main.tsx
- package.json
- vite.config.ts

### Step 3: Verify main.tsx can find App.tsx

Run:
```bash
test -f App.tsx && echo "✅ App.tsx exists in root" || echo "❌ MISSING"
```

Should print: `✅ App.tsx exists in root`

### Step 4: Copy the correct files

Now copy these files from Figma Make (or use the content below):

**main.tsx** (already correct, but verify):
```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

**index.html** (already correct, but verify):
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/logos/homekeeper-icon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>HomeKeeper - Smart Home Inventory & Maintenance Tracker</title>
    <meta name="description" content="Track your home inventory, manage warranties, schedule maintenance, and never lose track of your valuable possessions again." />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/main.tsx"></script>
  </body>
</html>
```

**package.json** (verify start script):
```json
{
  "name": "homekeeper",
  "version": "1.0.0",
  "description": "Smart home inventory and maintenance tracking application",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build --outDir build",
    "start": "serve -s build",
    "preview": "vite preview",
    "lint": "eslint .",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "@supabase/supabase-js": "^2.39.0",
    "lucide-react": "^0.456.0",
    "recharts": "^2.10.0",
    "react-slick": "^0.30.0",
    "slick-carousel": "^1.8.1",
    "motion": "^11.0.0",
    "canvas-confetti": "^1.9.2",
    "date-fns": "^3.0.0",
    "sonner": "^2.0.3",
    "serve": "^14.2.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.1",
    "@types/react-dom": "^18.3.0",
    "@types/react-slick": "^0.23.13",
    "@vitejs/plugin-react": "^4.2.1",
    "typescript": "^5.3.3",
    "vite": "^5.1.0",
    "tailwindcss": "^4.0.0",
    "autoprefixer": "^10.4.17",
    "postcss": "^8.4.35"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

**vite.config.ts**:
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build',
    emptyOutDir: true,
  },
  server: {
    host: '0.0.0.0',
    port: parseInt(process.env.PORT || '3000'),
  },
  preview: {
    host: '0.0.0.0',
    port: parseInt(process.env.PORT || '3000'),
  },
})
```

### Step 5: Test locally

```bash
# Install dependencies
npm install

# Build
npm run build

# Should create /build folder with index.html
ls -la build/

# Start server
npm start

# Should serve on http://localhost:3000
```

Visit http://localhost:3000 - should work!

### Step 6: Push to GitHub

```bash
git add .
git commit -m "Fix: Restructure to remove /src folder, match Figma Make structure"
git push origin main
```

---

## The Solution - Option 2: Keep /src Structure (Alternative)

If you prefer to keep the /src folder structure:

### Update main.tsx

Change this line:
```typescript
import App from './App';
```

To:
```typescript
import App from './src/App';
```

And this line:
```typescript
import './styles/globals.css';
```

To:
```typescript
import './src/styles/globals.css';
```

### Update vite.config.ts

But this requires more Vite configuration and isn't recommended for deployment.

---

## Recommended: Option 1

**Move everything out of /src to match Figma Make structure.**

This is the standard Vite structure when you DON'T use /src:
```
/
  ├── index.html       (entry point)
  ├── main.tsx         (React entry)
  ├── App.tsx          (main app)
  ├── components/
  ├── utils/
  ├── styles/
  ├── package.json
  └── vite.config.ts
```

---

## After Restructuring

### Final Verification Checklist

```bash
# 1. App.tsx in root
test -f App.tsx && echo "✅" || echo "❌"

# 2. main.tsx in root
test -f main.tsx && echo "✅" || echo "❌"

# 3. index.html in root  
test -f index.html && echo "✅" || echo "❌"

# 4. No /src folder
test -d src && echo "❌ REMOVE /src" || echo "✅"

# 5. components folder in root
test -d components && echo "✅" || echo "❌"

# 6. Can build
npm run build

# 7. Build folder exists
test -d build && echo "✅" || echo "❌"

# 8. Can start
npm start
```

All should show ✅

### Push to GitHub

```bash
git status
git add .
git commit -m "Fix: Remove /src, match correct structure for Vite deployment"
git push origin main
```

### Expected Render Success

```
==> Running build command 'npm install && npm run build'...
✓ built in X.XXs
build/index.html     0.45 kB              ✅
==> Build successful 🎉
==> Running 'npm start'
Accepting connections at http://0.0.0.0:10000   ✅ SUCCESS!
```

---

## Why This Happened

You likely created the project with `npm create vite@latest` which creates a `/src` folder by default.

But Figma Make uses a flat structure without `/src`.

The solution is to flatten your local structure to match.

---

## Quick Commands (Copy-Paste)

```bash
# Navigate to your repo
cd ~/Documents/homekeeper

# Move everything out of src
mv src/* .

# Remove empty src folder
rmdir src

# Verify structure
ls -la

# Test build
npm run build

# Should work now!
npm start

# Push
git add .
git commit -m "Fix: Flatten structure, remove /src folder"
git push origin main
```

---

**This will fix the "Could not resolve ./App" error!**
