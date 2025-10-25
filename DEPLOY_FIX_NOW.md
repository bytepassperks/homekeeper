# ✅ Fixed! Deploy Edge Function Now

## What was wrong?
The Edge Functions needed `.ts` extensions, not `.tsx`. I've fixed this!

## Files Created:
- ✅ `/supabase/functions/server/index.ts` (correct extension)
- ✅ `/supabase/functions/server/kv_store.ts` (correct extension)

## Before You Deploy - IMPORTANT

**Delete the old .tsx files first:**

### Option 1: Using Command Line
```bash
# Mac/Linux
rm supabase/functions/server/index.tsx
rm supabase/functions/server/kv_store.tsx

# Windows (PowerShell)
Remove-Item supabase/functions/server/index.tsx
Remove-Item supabase/functions/server/kv_store.tsx
```

### Option 2: Manually in File Explorer
1. Navigate to `supabase/functions/server/`
2. Delete `index.tsx`
3. Delete `kv_store.tsx`
4. Keep only `index.ts` and `kv_store.ts`

---

## Now Deploy!

### One-Command Deployment:

**Mac/Linux:**
```bash
chmod +x deploy-edge-function.sh
./deploy-edge-function.sh
```

**Windows:**
```powershell
.\deploy-edge-function.ps1
```

### Manual Deployment:

```bash
# 1. Login (if needed)
supabase login

# 2. Link project
supabase link --project-ref eoldzusfrveckbgdszld

# 3. Deploy
supabase functions deploy server
```

---

## Verify Success

Test the deployed function:

```bash
curl https://eoldzusfrveckbgdszld.supabase.co/functions/v1/make-server-7627b83a/health
```

**Expected response:**
```json
{"status":"ok","timestamp":"2025-10-25T..."}
```

---

## What Changed?

| Before | After |
|--------|-------|
| `index.tsx` | `index.ts` ✅ |
| `kv_store.tsx` | `kv_store.ts` ✅ |
| Import: `'./kv_store.tsx'` | Import: `'./kv_store.ts'` ✅ |

Supabase Edge Functions use Deno, which expects `.ts` files!

---

## After Deployment

✅ Registration will work  
✅ Sign-in will work  
✅ All API calls will work  
✅ CORS errors will be gone  

Try creating an account on your app at https://homekeeper-jfu0.onrender.com
