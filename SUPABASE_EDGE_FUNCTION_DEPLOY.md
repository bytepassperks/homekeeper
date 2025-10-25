# Supabase Edge Function Deployment Guide

## Critical: CORS Fix for Registration/Sign In

Your registration and sign-in are failing due to CORS issues with the Supabase Edge Function. Follow these steps to fix:

## Step 1: Install Supabase CLI

```bash
# macOS/Linux
brew install supabase/tap/supabase

# Windows
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase

# Or via npm (all platforms)
npm install -g supabase
```

## Step 2: Login to Supabase

```bash
supabase login
```

This will open a browser window to authenticate.

## Step 3: Link Your Project

```bash
supabase link --project-ref eoldzusfrveckbgdszld
```

Replace `eoldzusfrveckbgdszld` with your actual project ID if different.

## Step 4: Deploy the Edge Function

From the root directory of your project:

```bash
supabase functions deploy server
```

## Step 5: Verify Environment Variables

Go to your Supabase Dashboard:
1. Navigate to **Project Settings** → **Edge Functions**
2. Make sure these environment variables are set:
   - `SUPABASE_URL` (automatically available)
   - `SUPABASE_ANON_KEY` (automatically available)
   - `SUPABASE_SERVICE_ROLE_KEY` (automatically available)

## Step 6: Test the Function

After deployment, test with:

```bash
curl -X OPTIONS \
  https://eoldzusfrveckbgdszld.supabase.co/functions/v1/make-server-7627b83a/signup \
  -H "Origin: https://homekeeper-jfu0.onrender.com" \
  -v
```

You should see a `204 No Content` response with CORS headers.

## Step 7: Test Registration

Try registering a new account from your app. If it still fails, check:

1. **Edge Function Logs** in Supabase Dashboard → Edge Functions → Logs
2. **Browser Console** for any additional error messages
3. **Network Tab** to see the actual request/response

## Alternative: Quick Fix in Supabase Dashboard

If CLI deployment doesn't work:

1. Go to **Supabase Dashboard** → **Edge Functions**
2. Create a new function called `server`
3. Copy the entire content from `/supabase/functions/server/index.tsx`
4. Also create `kv_store.tsx` with content from `/supabase/functions/server/kv_store.tsx`
5. Click **Deploy**

## Troubleshooting

### Error: "Function not found"
- Make sure you deployed the function: `supabase functions deploy server`
- Check function name matches in your code

### Error: "CORS preflight failed"
- Verify the OPTIONS handler is in place (already added to code)
- Check Supabase logs for specific error messages
- Ensure environment variables are set

### Error: "Service role key not found"
- Go to Project Settings → API
- Copy the `service_role` key
- Add it as environment variable if needed

## Environment Variables

The Edge Function requires these to be set (usually automatic):

```
SUPABASE_URL=https://eoldzusfrveckbgdszld.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

## Verify Deployment

After deployment, check:

1. Function appears in Dashboard → Edge Functions
2. Health check works: `GET /make-server-7627b83a/health`
3. OPTIONS requests return 204
4. POST requests work without CORS errors

## Need Help?

If issues persist:
1. Check Edge Function logs in Supabase Dashboard
2. Verify network requests in browser DevTools
3. Test with cURL to isolate client vs server issues
4. Ensure Supabase project is on a paid plan (some features require it)
