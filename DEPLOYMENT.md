# DEPLOYMENT GUIDE - Tumblera

## 🚀 Recommended: Simple GitHub Pages Deployment (No Actions Needed)

Since this is a static HTML website, the **simplest and recommended** approach is to use GitHub Pages directly without GitHub Actions.

### Step 1: Push Your Code to GitHub

```powershell
# If you haven't already, run these commands:
git init
git add .
git commit -m "Initial commit: Tumblera website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/Tumblera.git
git push -u origin main
```

### Step 2: Enable GitHub Pages (Classic Method)

1. Go to your repository on GitHub: `https://github.com/YOUR_USERNAME/Tumblera`
2. Click **Settings** (top menu)
3. Scroll down and click **Pages** (left sidebar)
4. Under **Source**, select:
   - **Branch:** `main`
   - **Folder:** `/ (root)`
5. Click **Save**
6. Wait 1-2 minutes
7. Your site will be live at: `https://YOUR_USERNAME.github.io/Tumblera/`

**That's it! No GitHub Actions needed.**

---

## 🔧 Alternative: Using GitHub Actions (Advanced)

If you want to use GitHub Actions for deployment, follow these steps:

### Fix the 403 Permission Error

The error you saw means GitHub Actions needs proper permissions. Here's how to fix it:

#### Option A: Update Repository Settings (Recommended)

1. Go to your repository on GitHub
2. Click **Settings**
3. Click **Actions** → **General** (left sidebar)
4. Scroll to **Workflow permissions**
5. Select **"Read and write permissions"**
6. Check **"Allow GitHub Actions to create and approve pull requests"**
7. Click **Save**

#### Option B: Use GitHub Pages Source from Actions

1. Go to **Settings** → **Pages**
2. Under **Source**, select **"GitHub Actions"** instead of a branch
3. The workflow file will now work automatically

### Updated Workflow (Already Fixed)

I've already updated your `.github/workflows/deploy.yml` with the correct permissions. After you fix the repository settings above, the Actions workflow will work on your next push.

---

## 📊 Comparison: Which Method to Use?

### Method 1: Direct GitHub Pages (Recommended for Beginners)
✅ **Pros:**
- Simpler setup
- No configuration needed
- Faster deployment
- Less complexity

❌ **Cons:**
- None for static sites

### Method 2: GitHub Actions
✅ **Pros:**
- More control
- Can add build steps later
- Professional workflow

❌ **Cons:**
- More complex
- Requires permission setup
- Extra configuration

---

## 🎯 Quick Fix for Your Current Issue

Since you're seeing the 403 error, here's what to do **right now**:

### Option 1: Disable GitHub Actions (Easiest)

```powershell
# Simply delete the workflow file
Remove-Item .github\workflows\deploy.yml

# Commit and push
git add .
git commit -m "Remove GitHub Actions, use direct Pages deployment"
git push
```

Then enable GitHub Pages using the classic method (Step 2 above).

### Option 2: Fix GitHub Actions Permissions

1. Go to `https://github.com/Jayem1504/Tumblera/settings/actions`
2. Under **Workflow permissions**, select **"Read and write permissions"**
3. Click **Save**
4. Go to `https://github.com/Jayem1504/Tumblera/settings/pages`
5. Under **Source**, select **"GitHub Actions"**
6. Push a new commit to trigger the workflow

---

## 🔄 After Fixing

Once you've chosen and applied a method:

1. **Wait 1-2 minutes** for GitHub to build and deploy
2. **Visit your site:** `https://Jayem1504.github.io/Tumblera/`
3. **Test all features** using the checklist in PROJECT_SUMMARY.md
4. **Set up Formspree** for email notifications (see QUICKSTART.md)

---

## 🐛 Still Having Issues?

### Check Deployment Status
- Go to your repository on GitHub
- Click the **Actions** tab (if using Actions)
- Check for green checkmarks ✓
- Click on any failed workflow to see details

### Check Pages Status
- Go to **Settings** → **Pages**
- Look for "Your site is live at..." message
- If you see an error, read the message carefully

### Common Issues

**"404 - There isn't a GitHub Pages site here"**
- Wait 2-3 minutes longer
- Check that Pages is enabled in Settings
- Verify the branch is set to `main`

**"Workflow permission error"**
- Follow Option A or B above to fix permissions

**"Site not updating"**
- Clear your browser cache (Ctrl+Shift+Delete)
- Wait a few minutes for GitHub to rebuild
- Check the commit actually pushed: `git log`

---

## ✅ Recommended Setup (Start Fresh)

If you want to start clean:

```powershell
# 1. Remove the GitHub Actions workflow
Remove-Item .github\workflows\deploy.yml -Force

# 2. Commit the change
git add .
git commit -m "Use direct GitHub Pages deployment"
git push

# 3. Enable Pages manually in GitHub Settings
#    Settings → Pages → Source: main branch → Save
```

This is the **simplest and most reliable** method for static websites like Tumblera!

---

## 🎉 Summary

For Tumblera, I recommend:
1. **Delete the workflow file** (it's not needed)
2. **Use classic GitHub Pages** (Settings → Pages → Source: main)
3. **Push your code and wait 2 minutes**
4. **Visit your site!**

Your website will automatically update whenever you push changes to the main branch.

---

*Need more help? Check README.md or QUICKSTART.md*
