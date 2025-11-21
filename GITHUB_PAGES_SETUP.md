# GitHub Pages Deployment Guide

## 🚀 Quick Setup Steps

### 1. Create GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it (e.g., `mauritania-embassy-website`)
3. **Don't** initialize with README (we already have one)

### 2. Initialize Git (if not already done)

```bash
cd /Users/alibyh/Desktop/Projects/EmbassyWebsite
git init
git add .
git commit -m "Initial commit: Mauritanian Embassy website"
```

### 3. Connect to GitHub

```bash
# Replace YOUR_USERNAME and YOUR_REPO_NAME with your actual values
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### 4. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select:
   - **Source**: `GitHub Actions`
4. Save

### 5. Deploy

The GitHub Actions workflow will automatically:
- Build your Next.js site
- Deploy to GitHub Pages
- Run on every push to `main` branch

Your site will be available at:
```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

## 📝 Important Notes

### If Deploying to a Subdirectory

If your repository name is NOT `YOUR_USERNAME.github.io`, you need to update `next.config.js`:

```javascript
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/YOUR_REPO_NAME',  // Add this line
  trailingSlash: true,           // Add this line
}
```

Then update all your image paths from `/assets/...` to `/YOUR_REPO_NAME/assets/...`

### Current Configuration

✅ Static export enabled
✅ Images unoptimized (required for static export)
✅ GitHub Actions workflow configured
✅ Automatic deployment on push

## 🔧 Manual Deployment

If you want to test locally first:

```bash
npm run build
# The static files will be in the /out directory
```

## 📁 What Gets Deployed

- All static HTML, CSS, JS files
- Images from `/public` folder
- All translations and content
- Everything needed for the site to work

## 🐛 Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Ensure `node_modules` is in `.gitignore`
- Run `npm ci` locally to test

### Images Not Loading
- Make sure images are in `/public` folder
- Check paths in your code (should start with `/`)
- If using subdirectory, update `basePath` in `next.config.js`

### 404 Errors
- GitHub Pages needs a `404.html` file (Next.js creates this automatically)
- Check that `output: 'export'` is in `next.config.js`

## ✨ Features That Work

✅ All pages
✅ Translations (EN, RU, AR)
✅ Animations
✅ Responsive design
✅ Images
✅ All interactive features

## 🎉 After Deployment

Your embassy website will be live at:
```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

Share this URL with anyone who needs to access the site!

