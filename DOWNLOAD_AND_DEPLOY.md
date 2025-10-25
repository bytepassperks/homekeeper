# How to Download and Deploy HomeKeeper

Since you're working in Figma Make, you'll need to download the code to your computer first, then use git commands locally.

## Step-by-Step Process

### Step 1: Download Your Code from Figma Make

1. Look for a **"Download"** or **"Export"** button in the Figma Make interface
2. Download the entire project as a ZIP file
3. Save it to your computer (e.g., in `Documents/homekeeper`)

### Step 2: Extract and Open the Project

1. **Extract the ZIP file** to a folder (e.g., `C:\Users\YourName\homekeeper` on Windows or `~/homekeeper` on Mac)
2. **Open Terminal/Command Prompt**:
   - **Mac**: Open Spotlight (Cmd + Space), type "Terminal", press Enter
   - **Windows**: Press Windows key, type "cmd" or "PowerShell", press Enter
3. **Navigate to your project folder**:
   ```bash
   cd path/to/homekeeper
   ```
   Example on Mac: `cd ~/Documents/homekeeper`
   Example on Windows: `cd C:\Users\YourName\Documents\homekeeper`

### Step 3: Verify Git is Installed

In your terminal, type:
```bash
git --version
```

**If you see a version number** (e.g., `git version 2.39.0`): ✅ Git is installed, proceed to Step 5

**If you get an error**: You need to install Git first (Step 4)

### Step 4: Install Git (If Needed)

**Mac**:
```bash
# Install Homebrew first (if you don't have it)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Then install git
brew install git
```

**Windows**:
1. Download from: https://git-scm.com/download/win
2. Run the installer
3. Use all default settings
4. Restart your terminal/command prompt

**Verify installation**:
```bash
git --version
```

### Step 5: Initialize Git and Push to GitHub

Now run these commands one by one in your terminal:

```bash
# 1. Make sure you're in the right folder
pwd  # (Mac/Linux) or cd (Windows) - should show your project path

# 2. Initialize git repository
git init

# 3. Configure git with your info (replace with your details)
git config user.name "Your Name"
git config user.email "your.email@example.com"

# 4. Add all files
git add .

# 5. Create first commit
git commit -m "Initial commit: HomeKeeper full application"

# 6. Create a GitHub repository first (see below), then add remote
git remote add origin https://github.com/YOUR-USERNAME/homekeeper.git

# 7. Rename branch to main
git branch -M main

# 8. Push to GitHub
git push -u origin main
```

### Step 5.5: Create GitHub Repository (Do this before Step 6)

**Before running the `git remote add` command**, create a repo on GitHub:

1. Go to https://github.com/new
2. Repository name: `homekeeper`
3. Description: "Smart home inventory and maintenance tracking app"
4. Choose Public or Private
5. **DO NOT** check any boxes (no README, no .gitignore, no license)
6. Click **"Create repository"**
7. Copy the URL (looks like `https://github.com/YOUR-USERNAME/homekeeper.git`)
8. Use this URL in the `git remote add origin` command above

### Step 6: Deploy to Render

Now follow the **DEPLOYMENT_GUIDE.md** starting from "Part 2: Deploy to Render"

You can open `DEPLOYMENT_GUIDE.md` in any text editor to follow along.

---

## Troubleshooting

### "git: command not found"
- Install Git (see Step 4 above)

### "permission denied"
- You may need to authenticate with GitHub
- Use GitHub Desktop app instead (easier): https://desktop.github.com/

### "fatal: not a git repository"
- Make sure you ran `git init` first
- Make sure you're in the correct folder (`cd` to your project)

### "remote origin already exists"
- Run: `git remote remove origin`
- Then try the `git remote add origin` command again

### Still stuck?
- **Option 1**: Use GitHub Desktop (graphical interface, much easier)
  - Download: https://desktop.github.com/
  - Drag your folder into GitHub Desktop
  - Click "Publish repository"
  
- **Option 2**: Upload files manually
  - Create repo on GitHub
  - Click "uploading an existing file"
  - Drag all your files (but NOT node_modules folder)

---

## Alternative: Use GitHub Desktop (Easier!)

If command line is confusing, use GitHub Desktop:

1. Download GitHub Desktop: https://desktop.github.com/
2. Install and sign in with GitHub
3. Click "File" → "Add Local Repository"
4. Choose your homekeeper folder
5. If it says "not a git repository", click "Create a repository here instead"
6. Click "Publish repository" 
7. Done! Now proceed to Render deployment

---

## Next Steps

Once your code is on GitHub:
1. Open **DEPLOYMENT_GUIDE.md**
2. Skip to **Part 2: Deploy to Render**
3. Follow steps 4-10

Your app will be live in about 15 minutes! 🚀
