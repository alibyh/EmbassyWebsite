# Yandex Secret Key - View Once Solution

## The Problem

- **ID Key**: Public, doesn't work for authentication
- **Secret Key**: View once only - if you didn't save it, you can't see it again
- **Current situation**: You're using the secret key, but it might be invalid or you need a new one

## Solutions

### Option 1: Generate a New Secret Key (Recommended)

1. Go to [Yandex Cloud Console](https://console.cloud.yandex.com/)
2. Navigate to **IAM** → **Service Accounts** (or **API Keys**)
3. Find your service account or the key you created
4. **Delete the old key** (if it exists)
5. **Create a new API key**
6. **IMPORTANT**: Copy the secret key immediately - you can only see it once!
7. Save it to `.env.local`:
   ```bash
   NEXT_PUBLIC_YANDEX_TRANSLATE_API_KEY=your_new_secret_key_here
   ```

### Option 2: Use IAM Token Instead

If you can't regenerate the key, you can use an IAM token:

1. Install Yandex CLI: `brew install yandex-cloud-cli` (Mac) or see [docs](https://cloud.yandex.com/en/docs/cli/quickstart)
2. Authenticate: `yc init`
3. Get token: `yc iam create-token`
4. Use the token instead of API key

### Option 3: Use Service Account with API Key

1. Create a Service Account in Yandex Cloud
2. Assign it the `ai.translate.user` role
3. Create an API key for the Service Account
4. **Save the key immediately** (view once!)

## Testing Your New Key

Once you have a new secret key:

```bash
# Test v1.5 API
curl "https://translate.yandex.net/api/v1.5/tr.json/translate?key=YOUR_NEW_SECRET_KEY&text=hello&lang=en-ru"

# Should return:
# {"code":200,"lang":"en-ru","text":["привет"]}
```

## Important Notes

- **Secret keys are view-once**: Always save them immediately
- **ID keys are public**: They're for identification, not authentication
- **Keys can expire**: Check expiration date in Yandex Cloud Console
- **Keys need permissions**: Make sure the key has `translate.user` role

## After Getting New Key

1. Update `.env.local`:
   ```bash
   NEXT_PUBLIC_YANDEX_TRANSLATE_API_KEY=your_new_secret_key
   ```

2. Restart dev server:
   ```bash
   npm run dev
   ```

3. Test translation in the admin panel

## If Nothing Works

Consider using a different translation service:
- Google Translate API
- Microsoft Translator
- DeepL API

Or use a serverless function (Vercel, Netlify) that can handle OAuth authentication.

