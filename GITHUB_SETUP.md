# How to Push Your Project to GitHub

## Step-by-Step Guide

### Step 1: Initialize Git (if not already done)

```bash
git init
```

### Step 2: Add All Files

```bash
git add .
```

### Step 3: Create First Commit

```bash
git commit -m "Initial commit: Portfolio website with contact form"
```

### Step 4: Create GitHub Repository

1. Go to: https://github.com/new
2. Repository name: `gevsolution-portfolio` (or any name you like)
3. Description: "Portfolio website with React, TypeScript, and Express backend"
4. Choose: **Public** or **Private**
5. **DO NOT** check "Initialize with README" (we already have files)
6. Click **"Create repository"**

### Step 5: Connect and Push

After creating the repo, GitHub will show you commands. Use these:

```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/gevsolution-portfolio.git
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

### Step 6: Verify

Go to your GitHub repository page and you should see all your files!

---

## Quick Commands (Copy & Paste)

```bash
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Portfolio website"

# Add remote (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## Important Notes

✅ **Protected Files** (will NOT be pushed):
- `.env` - Your email credentials (safe!)
- `messages.json` - User contact form data
- `node_modules/` - Dependencies

✅ **Files That WILL Be Pushed**:
- All your code files
- `package.json`
- `README.md`
- Configuration files

---

## If You Need to Update Later

```bash
git add .
git commit -m "Your commit message"
git push
```

---

## Troubleshooting

### "Repository not found"
- Check your GitHub username and repository name
- Make sure the repository exists on GitHub

### "Authentication failed"
- You may need to use a Personal Access Token instead of password
- Or use GitHub Desktop app

### "Permission denied"
- Make sure you're logged into GitHub
- Check repository permissions

