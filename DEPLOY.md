# 🚀 Deploy to GitHub Pages - Step by Step

## ✅ Pre-Deployment Checklist

Your project is now configured for GitHub Pages! Here's what's been set up:

- ✅ Static export enabled in `next.config.js`
- ✅ GitHub Actions workflow created (`.github/workflows/deploy.yml`)
- ✅ Build script configured
- ✅ All dependencies ready

## 📋 Deployment Steps

### Step 1: Create GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the **+** icon → **New repository**
3. Name it (e.g., `mauritania-embassy-moscow`)
4. Choose **Public** (required for free GitHub Pages)
5. **Don't** check "Initialize with README"
6. Click **Create repository**

### Step 2: Initialize Git (if not done)

```bash
cd /Users/alibyh/Desktop/Projects/EmbassyWebsite

# Check if git is initialized
git status

# If not initialized, run:
git init
git add .
git commit -m "Initial commit: Mauritanian Embassy website"
```

### Step 3: Connect to GitHub

```bash
# Replace YOUR_USERNAME and YOUR_REPO_NAME with your actual values
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

**Example:**
```bash
git remote add origin https://github.com/johndoe/mauritania-embassy-moscow.git
git branch -M main
git push -u origin main
```

### Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top menu)
3. Scroll to **Pages** (left sidebar)
4. Under **Source**, select:
   - **Source**: `GitHub Actions` (NOT "Deploy from a branch")
5. Click **Save**

### Step 5: Wait for Deployment

1. Go to **Actions** tab in your repository
2. You should see "Deploy to GitHub Pages" workflow running
3. Wait 2-3 minutes for it to complete
4. Once done, you'll see a green checkmark ✅

### Step 6: Access Your Site

Your website will be live at:
```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

**Example:**
```
https://johndoe.github.io/mauritania-embassy-moscow/
```

## 🔄 Updating Your Site

Every time you push changes to the `main` branch, GitHub Actions will automatically:
1. Build your site
2. Deploy to GitHub Pages
3. Update your live website

```bash
git add .
git commit -m "Update website"
git push
```

## ⚙️ Configuration Options

### If Your Repository Name is Different

If your repo is NOT `YOUR_USERNAME.github.io`, you may need to update `next.config.js`:

```javascript
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Uncomment these if deploying to a subdirectory:
  // basePath: '/your-repo-name',
  // trailingSlash: true,
}
```

**Only uncomment if images/paths don't work!**

## 🐛 Troubleshooting

### Build Fails in GitHub Actions

1. Check the **Actions** tab for error messages
2. Common issues:
   - Missing dependencies → Check `package.json`
   - TypeScript errors → Fix type issues
   - Missing files → Ensure all files are committed

### Images Not Loading

- Make sure images are in `/public` folder
- Check that paths start with `/` (e.g., `/assets/MR.avif`)
- If using subdirectory, add `basePath` to `next.config.js`

### 404 Errors

- GitHub Pages automatically uses `404.html` (Next.js creates this)
- Check that `output: 'export'` is in `next.config.js`

### Site Not Updating

- Wait 2-3 minutes after pushing
- Check **Actions** tab to see if deployment completed
- Clear browser cache (Ctrl+Shift+R / Cmd+Shift+R)

## 📁 What Gets Deployed

✅ All HTML pages
✅ CSS styles
✅ JavaScript bundles
✅ Images from `/public`
✅ Translations (EN, RU, AR)
✅ All interactive features

## ✨ Features That Work

- ✅ All pages and sections
- ✅ Multilingual support (EN, RU, AR)
- ✅ Animations and transitions
- ✅ Responsive design
- ✅ Images and assets
- ✅ Interactive components

## 🔒 Security Note

Your repository is public, so:
- Don't commit sensitive information
- Don't include API keys or secrets
- All code will be visible on GitHub

## 📞 Need Help?

1. Check GitHub Actions logs in the **Actions** tab
2. Verify all files are committed: `git status`
3. Test build locally: `npm run build`
4. Check the `out/` folder exists after build

## 🎉 Success!

Once deployed, share your website URL:
```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

Your Mauritanian Embassy website is now live on the internet! 🌍🇲🇷

