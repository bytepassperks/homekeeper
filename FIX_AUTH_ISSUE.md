# 🔧 Fix Authentication (Registration/Sign In) Issue

## The Problem

Registration and sign-in are failing with CORS errors because the Supabase Edge Function needs to be deployed.

Error message:
```
Access to fetch at 'https://eoldzusfrveckbgdszld.supabase.co/functions/v1/make-server-7627b83a/signup' 
from origin 'https://homekeeper-jfu0.onrender.com' has been blocked by CORS policy
```

## The Solution

You need to deploy the Supabase Edge Function. Here are 3 ways to do it:

---

## Option 1: One-Command Fix (Easiest)

### On macOS/Linux:
```bash
chmod +x deploy-edge-function.sh
./deploy-edge-function.sh
```

### On Windows PowerShell:
```powershell
.\deploy-edge-function.ps1
```

---

## Option 2: Manual Commands

### 1. Install Supabase CLI

**npm (all platforms):**
```bash
npm install -g supabase
```

**macOS (Homebrew):**
```bash
brew install supabase/tap/supabase
```

**Windows (Scoop):**
```bash
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase
```

### 2. Login
```bash
supabase login
```

### 3. Link Project
```bash
supabase link --project-ref eoldzusfrveckbgdszld
```

### 4. Deploy Function
```bash
supabase functions deploy server
```

---

## Option 3: Deploy via Supabase Dashboard (No CLI needed)

1. Go to [Supabase Dashboard](https://supabase.com/dashboard/project/eoldzusfrveckbgdszld/functions)
2. Click **"Create a new function"**
3. Name it: `server`
4. Copy the content from `/supabase/functions/server/index.tsx` and paste it
5. Create another file `kv_store.tsx` and copy content from `/supabase/functions/server/kv_store.tsx`
6. Click **Deploy**

---

## Verify It Works

After deployment, test with:

```bash
curl https://eoldzusfrveckbgdszld.supabase.co/functions/v1/make-server-7627b83a/health
```

You should get:
```json
{"status":"ok","timestamp":"2025-10-25T..."}
```

---

## Changes Made to Fix CORS

I've already updated the server code with:
- Enhanced CORS configuration with all required headers
- Explicit OPTIONS handler for preflight requests
- Better error messages on the client side

After deploying, registration and sign-in should work immediately!

---

## Still Having Issues?

1. **Check Edge Function Logs**: https://supabase.com/dashboard/project/eoldzusfrveckbgdszld/logs/edge-functions
2. **Verify environment variables** in Project Settings → API
3. **Clear browser cache** and try again
4. **Contact support**: support@homemaker.co.site

---

## What This Function Does

The Edge Function handles:
- ✅ User registration (creates accounts)
- ✅ User authentication 
- ✅ Item management (CRUD operations)
- ✅ Maintenance tracking
- ✅ Webhook integrations
- ✅ Notification preferences

Without it deployed, users can't register or sign in!
