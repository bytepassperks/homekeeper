# 🍼 Baby Steps: Deploy Edge Function in Supabase Dashboard

## Step 1: Go to Your Supabase Dashboard

1. Open your browser
2. Go to: https://supabase.com/dashboard
3. Log in to your account
4. Click on your project **"HomeKeeper"** (project ID: eoldzusfrveckbgdszld)

---

## Step 2: Navigate to Edge Functions

1. On the left sidebar, find **"Edge Functions"**
2. Click on **"Edge Functions"**
3. You'll see a page with a green button that says **"Create a new function"** or **"Deploy new function"**

---

## Step 3: Create the Function

1. Click the **"Create a new function"** button
2. In the dialog that appears:
   - **Function name**: Type exactly: `server`
   - Click **"Create function"** or **"Continue"**

---

## Step 4: Copy the Main Code (index.ts)

1. Open the file `/supabase/functions/server/index.ts` in your code editor
2. Select ALL the code (Ctrl+A or Cmd+A)
3. Copy it (Ctrl+C or Cmd+C)
4. Go back to Supabase Dashboard
5. You should see a code editor
6. **Delete all existing code** in the editor
7. **Paste** your copied code (Ctrl+V or Cmd+V)

---

## Step 5: Add the Second File (kv_store.ts)

1. In the Supabase code editor, look for a **"+ Add file"** button or **"New file"** button
2. Click it
3. Name the file: `kv_store.ts`
4. Open `/supabase/functions/server/kv_store.ts` in your code editor
5. Select ALL the code (Ctrl+A or Cmd+A)
6. Copy it (Ctrl+C or Cmd+C)
7. Go back to Supabase Dashboard
8. Click on the `kv_store.ts` file you just created
9. **Paste** your copied code (Ctrl+V or Cmd+V)

---

## Step 6: Deploy the Function

1. Look for a **"Deploy"** button (usually green, top-right area)
2. Click **"Deploy"**
3. Wait for the deployment to complete (usually 30-60 seconds)
4. You should see a success message like "Function deployed successfully"

---

## Step 7: Verify It Works

### Option A: Test in Dashboard
1. In the Supabase Edge Functions page, find your `server` function
2. Click on it
3. Look for a **"Test"** or **"Invoke"** button
4. Change the endpoint to: `/make-server-7627b83a/health`
5. Click **"Send Request"** or **"Invoke"**
6. You should see: `{"status":"ok","timestamp":"2025-10-25T..."}`

### Option B: Test with Browser
1. Open a new browser tab
2. Go to: `https://eoldzusfrveckbgdszld.supabase.co/functions/v1/make-server-7627b83a/health`
3. You should see: `{"status":"ok","timestamp":"..."}`

---

## Step 8: Test Registration on Your App

1. Go to your app: https://homekeeper-jfu0.onrender.com
2. Click **"Get Started"** or **"Sign Up"**
3. Fill in the registration form:
   - Name: Your name
   - Email: your@email.com
   - Password: Something123! (must have uppercase, lowercase, number)
   - Confirm Password: Same password
4. Click **"Register"**
5. If successful, you should be signed in automatically! 🎉

---

## ✅ Success Checklist

- [ ] Edge Function `server` created in Supabase Dashboard
- [ ] `index.ts` file added and code pasted
- [ ] `kv_store.ts` file added and code pasted
- [ ] Function deployed (green checkmark or success message)
- [ ] Health check returns `{"status":"ok"}`
- [ ] Registration works on your app

---

## 🆘 Troubleshooting

### "Cannot find module './kv_store.ts'"
- Make sure you created the `kv_store.ts` file (Step 5)
- Make sure the filename is exactly `kv_store.ts` (lowercase, no spaces)

### "Deployment failed"
- Check that you copied ALL the code from both files
- Make sure there are no extra characters or quotes around the code
- Try deploying again

### Registration still doesn't work
- Wait 1-2 minutes after deployment (sometimes takes time to propagate)
- Clear your browser cache (Ctrl+Shift+Delete)
- Try registering again
- Check the Edge Function logs in Supabase Dashboard → Edge Functions → server → Logs

---

## 📝 Quick Copy Checklist

You need to copy 2 files:

1. **index.ts** → Copy from `/supabase/functions/server/index.ts`
2. **kv_store.ts** → Copy from `/supabase/functions/server/kv_store.ts`

❌ **DO NOT copy** the `.tsx` files - they're old and won't work!

---

## Next Steps After Success

Once registration works:
1. Create your first account
2. Add some home items
3. Explore the dashboard
4. Set up maintenance schedules
5. Enjoy HomeKeeper! 🏡✨
