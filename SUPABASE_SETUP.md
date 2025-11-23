# Supabase Setup for GitHub Pages

## Current Status

The website is configured to work **with or without** Supabase:

- ✅ **With Supabase**: Fetches real news from database
- ✅ **Without Supabase**: Uses mock data from translations

## How It Works

The code automatically detects if Supabase is configured:
- Checks for real credentials (not placeholders)
- Falls back to mock data if Supabase is not available
- No errors or failed requests

## To Enable Supabase on GitHub Pages

### Option 1: Add Secrets to GitHub Repository (Recommended)

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add these secrets:
   - **Name**: `NEXT_PUBLIC_SUPABASE_URL`
     - **Value**: Your Supabase project URL (e.g., `https://xxxxx.supabase.co`)
   - **Name**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - **Value**: Your Supabase anon/public key

5. Push a new commit to trigger the build
6. The build will embed these values and Supabase will work at runtime

### Option 2: Use Mock Data (Current)

If you don't set the secrets, the website will:
- ✅ Build successfully
- ✅ Display mock announcements from translations
- ✅ Work perfectly without Supabase

## Verification

After adding secrets and deploying:

1. Open browser console on your deployed site
2. Check for Supabase connection
3. News should load from your database instead of mock data

## Files Involved

- `shared/lib/supabase/client.ts` - Supabase client with configuration detection
- `widgets/Announcements/Announcements.tsx` - Checks config before fetching
- `.github/workflows/deploy.yml` - Uses secrets during build

## Notes

- Environment variables prefixed with `NEXT_PUBLIC_` are embedded in the build
- They must be set during the GitHub Actions build step
- The code automatically detects placeholder values and skips Supabase requests
