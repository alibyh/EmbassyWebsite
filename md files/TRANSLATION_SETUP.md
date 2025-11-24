# Translation Feature Setup Guide

## Overview

The admin news creation page now includes automatic translation using Yandex Translate API. Admins can:
1. Select the source language (EN, RU, or AR)
2. Enter title and content in that language
3. Automatically translate to the other two languages
4. Review and edit translations before submitting
5. Store all translations in the database

## Setup Steps

### 1. Get Yandex Translate API Key

1. Go to [Yandex Translate API](https://translate.yandex.com/developers/keys)
2. Sign in with your Yandex account (or create one)
3. Create a new API key
4. Copy the API key

### 2. Add API Key to Environment Variables

**For Static Export (GitHub Pages)**: The API key must be client-side accessible (prefixed with `NEXT_PUBLIC_`) because we use a CORS proxy.

**For Server-Side Rendering (Vercel, Netlify)**: The API key should be server-side only (NOT prefixed with `NEXT_PUBLIC_`).

#### For Local Development / Static Export

Create or update `.env.local`:
```bash
NEXT_PUBLIC_YANDEX_TRANSLATE_API_KEY=your_api_key_here
```

**Note**: For static export, the API key is exposed client-side but goes through a CORS proxy. For better security, consider using a hosting platform that supports server-side rendering.

#### For GitHub Pages Deployment

⚠️ **Important**: GitHub Pages only supports static sites. For production deployment with API routes, you need to:

1. **Use a different hosting platform** that supports server-side rendering (Vercel, Netlify, etc.)
2. **Or use a serverless function** (Vercel Functions, AWS Lambda, etc.)

If using Vercel or similar:
1. Go to your project settings
2. Navigate to **Environment Variables**
3. Add:
   - **Name**: `YANDEX_TRANSLATE_API_KEY`
   - **Value**: Your Yandex Translate API key
   - **Environment**: Production, Preview, Development

### 3. Update Database Schema

Run the migration SQL in your Supabase SQL Editor:

1. Go to your Supabase project
2. Navigate to **SQL Editor**
3. Open and run `supabase-migration-translations.sql`

This will:
- Add `title_en`, `title_ru`, `title_ar` columns
- Add `text_en`, `text_ru`, `text_ar` columns
- Migrate existing data to English translations
- Add indexes for better performance

### 4. Test the Feature

1. Start your development server: `npm run dev`
2. Navigate to `/admin/news/add`
3. Select a source language
4. Enter title and content
5. Click "Translate to All Languages"
6. Review and edit translations
7. Submit the article

## How It Works

### Architecture

The translation feature uses **two approaches** depending on the deployment:

#### For Static Export (GitHub Pages):
1. **Client** → Calls Yandex Translate API via CORS proxy
2. **CORS Proxy** → Forwards request to Yandex (bypasses CORS)
3. **CORS Proxy** → Returns translation to client
4. **Client** → Displays translations for review

#### For Server-Side Rendering (Vercel, Netlify):
1. **Client** → Calls `/api/translate` (Next.js API route)
2. **API Route** → Calls Yandex Translate API (server-to-server, no CORS)
3. **API Route** → Returns translation to client
4. **Client** → Displays translations for review

**Note**: The code automatically detects which approach to use. In dev mode, it tries the API route first, then falls back to CORS proxy if needed.

### Admin Flow

1. **Language Selection**: Admin selects the source language (EN, RU, or AR)
2. **Content Entry**: Admin enters title and content in the selected language
3. **Translation**: Clicking "Translate" calls `/api/translate` which proxies to Yandex Translate API
4. **Review**: All three translations are displayed for review and editing
5. **Submission**: All translations are saved to the database

### Frontend Display

The `Announcements` component automatically:
- Detects the current user's language preference
- Displays the appropriate translation from the database
- Falls back to English if translation is missing
- Supports legacy articles with only `title` and `text` fields

## Database Schema

The `news` table now includes:

```sql
title_en TEXT
title_ru TEXT
title_ar TEXT
text_en TEXT
text_ru TEXT
text_ar TEXT
```

Plus the existing fields:
- `id`
- `photo_url`
- `created_at`
- `created_by`

## API Usage

### Yandex Translate API

- **Endpoint**: `https://translate.yandex.net/api/v1.5/tr.json/translate`
- **Method**: GET
- **Authentication**: API key in query parameter
- **Rate Limits**: Check Yandex documentation for your plan

### Cost Considerations

- Yandex Translate offers a free tier with limited requests
- For production, consider:
  - Caching translations
  - Using a server-side API route to protect the API key
  - Implementing rate limiting

## Troubleshooting

### Translation Fails

1. **Check API Key**: Verify `NEXT_PUBLIC_YANDEX_TRANSLATE_API_KEY` is set correctly
2. **Check API Quota**: Ensure you haven't exceeded your API limit
3. **Check Network**: Verify internet connection
4. **Check Console**: Look for error messages in browser console

### Translations Not Displaying

1. **Check Database**: Verify translations were saved correctly
2. **Check Language**: Ensure user has selected a language
3. **Check Fallback**: Verify fallback logic in `Announcements.tsx`

### Database Migration Issues

1. **Backup First**: Always backup your database before migrations
2. **Check Columns**: Verify new columns exist: `SELECT * FROM news LIMIT 1;`
3. **Check Data**: Verify existing data was migrated: `SELECT title_en, text_en FROM news;`

## Security Notes

✅ **Current Implementation**: The API key is already secured server-side!

- API key is stored in `YANDEX_TRANSLATE_API_KEY` (NOT `NEXT_PUBLIC_*`)
- Translation requests go through `/api/translate` server-side route
- API key never exposed to client-side code
- CORS issues resolved (server-to-server communication)

### Additional Security Recommendations

For production, consider:
1. **Add Rate Limiting**: Prevent abuse (e.g., using Next.js middleware)
2. **Add Authentication**: Ensure only authenticated admins can use translation
3. **Add Caching**: Cache translations to reduce API calls
4. **Add Request Validation**: Validate input on server side

## Future Enhancements

- [ ] Server-side translation API route
- [ ] Translation caching
- [ ] Batch translation for multiple articles
- [ ] Translation history/versioning
- [ ] Manual translation option (skip API)
- [ ] Translation quality indicators

## Support

For issues or questions:
1. Check Yandex Translate API documentation
2. Review browser console for errors
3. Check Supabase logs for database errors
4. Verify environment variables are set correctly

