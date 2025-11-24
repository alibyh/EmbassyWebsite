# Translation CORS Fix

## Issue
The translation feature was failing due to CORS errors when trying to call Yandex Translate API directly from the browser.

## Solution

### For Development Mode (Recommended)

The API route should work in dev mode. Make sure your `.env.local` has:

```bash
# For API route (server-side) - preferred
YANDEX_TRANSLATE_API_KEY=your_api_key_here

# OR for client-side fallback
NEXT_PUBLIC_YANDEX_TRANSLATE_API_KEY=your_api_key_here
```

**The API route will check both variable names**, so either one will work.

### How It Works Now

1. **First**: Tries to use `/api/translate` (Next.js API route)
   - Works in dev mode
   - Works with server-side rendering (Vercel, Netlify)
   - Keeps API key secure on server

2. **Fallback**: If API route fails, uses CORS proxy
   - Only for static export scenarios
   - Tries multiple proxy services
   - Less secure (exposes API key)

## Quick Fix

1. **Restart your dev server** after updating `.env.local`:
   ```bash
   # Stop the server (Ctrl+C)
   npm run dev
   ```

2. **Verify the API route works**:
   - Open browser console
   - You should see the API route being called (not CORS proxy)
   - Check Network tab for `/api/translate` requests

## Testing

1. Go to `/admin/news/add`
2. Select a language
3. Enter title and content
4. Click "Translate to All Languages"
5. Should work without CORS errors

## If Still Not Working

1. **Check environment variable**:
   ```bash
   # Make sure it's in .env.local (not .env)
   cat .env.local
   ```

2. **Restart dev server** (environment variables are loaded at startup)

3. **Check API route**:
   - Open browser DevTools → Network tab
   - Try translating
   - Look for `/api/translate` request
   - Check if it returns 200 or 404

4. **If API route returns 404**:
   - Make sure `app/api/translate/route.ts` exists
   - Restart dev server
   - Clear `.next` cache: `rm -rf .next && npm run dev`

## For Production (Static Export)

If deploying to GitHub Pages (static export), you'll need to:
- Use `NEXT_PUBLIC_YANDEX_TRANSLATE_API_KEY` (client-side)
- The CORS proxy will be used automatically
- Note: This exposes your API key in the client bundle

**Better option**: Deploy to Vercel or Netlify which supports API routes and keeps the key secure.

