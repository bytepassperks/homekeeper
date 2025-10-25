# 🎯 SIMPLE STEPS: Add Your HomeKeeper Screenshots

## ✅ Code is Ready - Just Add Your 9 Images!

I've updated the code to use local screenshots. Now you just need to add the files.

---

## 📋 Quick Steps:

### Step 1: Navigate to Screenshots Folder

```bash
cd public/screenshots/
```

### Step 2: Add Your 9 Screenshots

Copy your screenshots to this folder and rename them:

**Required file names (EXACT):**

1. `hero.png` - Landing page with moving boxes
2. `signup.png` - Signup modal
3. `add-item.png` - Add item modal
4. `dashboard.png` - Dashboard with stats
5. `warranty.png` - Warranty page
6. `calendar.png` - Calendar view
7. `webhooks.png` - Webhook configuration
8. `gamification.png` - Badges page
9. `item-detail.png` - LG Refrigerator detail

### Step 3: Push to GitHub

```bash
git add public/screenshots/
git commit -m "Add demo screenshots"
git push origin main
```

### Step 4: Wait for Render to Deploy

Render will automatically detect the changes and redeploy (takes 2-3 minutes).

---

## 🖼️ Screenshot Mapping:

Based on the 9 images you showed me earlier:

| Your Screenshot Shows | Save As |
|----------------------|---------|
| Landing page with moving boxes and furniture | `hero.png` |
| Signup modal with email/password form | `signup.png` |
| "Add New Item" modal interface | `add-item.png` |
| Dashboard with gamification and stats | `dashboard.png` |
| Warranty management page | `warranty.png` |
| Calendar with maintenance tasks | `calendar.png` |
| Webhook settings (warranty alert, find replacement, annual report) | `webhooks.png` |
| Badges page with Level 5 progress | `gamification.png` |
| LG Refrigerator detail page | `item-detail.png` |

---

## ⚡ Copy-Paste Commands:

If your screenshots are in `~/Downloads/`:

```bash
cd public/screenshots/

cp ~/Downloads/homekeeper-hero.png hero.png
cp ~/Downloads/homekeeper-signup.png signup.png
cp ~/Downloads/homekeeper-add-item.png add-item.png
cp ~/Downloads/homekeeper-dashboard.png dashboard.png
cp ~/Downloads/homekeeper-warranty.png warranty.png
cp ~/Downloads/homekeeper-calendar.png calendar.png
cp ~/Downloads/homekeeper-webhooks.png webhooks.png
cp ~/Downloads/homekeeper-gamification.png gamification.png
cp ~/Downloads/homekeeper-item-detail.png item-detail.png

git add .
git commit -m "Add HomeKeeper demo screenshots"
git push origin main
```

*(Adjust the source paths to match where your screenshots are saved)*

---

## ✅ What's Already Done:

- ✅ Created `/public/screenshots/` folder
- ✅ Updated `DemoPage.tsx` to use `/screenshots/hero.png` etc.
- ✅ All 10 demo steps configured
- ✅ Play button auto-advance working
- ✅ Ready for your images

---

## 🎯 What You Need to Do:

1. Save your 9 screenshots to `public/screenshots/` folder
2. Use the exact file names listed above
3. Push to GitHub
4. Done! 🎉

---

## 🔍 Verify It's Working:

After Render deploys:

1. Visit: https://homekeeper-jfu0.onrender.com
2. Click "View Demo" button
3. Click the Play ▶️ button
4. Your actual HomeKeeper screenshots will cycle through!

---

## 💡 Tips:

- **File format**: PNG works best for UI screenshots
- **Size**: 1920x1080 is ideal, but any HD size works
- **Compression**: Keep under 500KB each if possible (use TinyPNG.com)
- **Names**: Must be lowercase with hyphens, no spaces

---

**That's it! Just 3 commands and your demo will show real screenshots instead of placeholder images.**
