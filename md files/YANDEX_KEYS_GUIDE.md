# Yandex Translate API Keys Guide

## Understanding Yandex Keys

Yandex provides **two types of keys**:
1. **ID Key** (also called API Key or Application ID)
2. **Secret Key** (also called Secret)

## Which Key to Use?

### For Yandex Translate API v1.5:
- Use the **ID Key** (not the secret key)
- The API endpoint expects: `?key=YOUR_ID_KEY`

### For OAuth-based APIs:
- You would use both ID and Secret
- But Translate API v1.5 doesn't use OAuth

## How to Find Your ID Key

1. Go to [Yandex Cloud Console](https://console.cloud.yandex.com/)
2. Navigate to **IAM** → **API Keys**
3. Look for keys with type "API Key" or "Application ID"
4. The ID key is usually shorter and different from the secret

OR

1. Go to [Yandex Translate Developer Portal](https://translate.yandex.com/developers/keys)
2. Your API key should be listed there
3. This is the ID key you need

## Testing Your Keys

### Test ID Key:
```bash
curl "https://translate.yandex.net/api/v1.5/tr.json/translate?key=YOUR_ID_KEY&text=hello&lang=en-ru"
```

**Expected (success):**
```json
{"code":200,"lang":"en-ru","text":["привет"]}
```

**If you get 401:**
- Try the other key (secret key)
- Or the key might be invalid/expired

### Test Secret Key:
```bash
curl "https://translate.yandex.net/api/v1.5/tr.json/translate?key=YOUR_SECRET_KEY&text=hello&lang=en-ru"
```

## Current Setup

In your `.env.local`, use the **ID Key**:

```bash
NEXT_PUBLIC_YANDEX_TRANSLATE_API_KEY=your_id_key_here
```

## If Neither Key Works

1. **Check key permissions**: Make sure the key has access to Translate API
2. **Check key status**: Keys can be disabled or expired
3. **Create a new key**: Generate a fresh API key
4. **Check billing**: Some APIs require active billing

## Alternative: Service Account

If API keys don't work, you can use a Service Account:

1. Create a Service Account in Yandex Cloud
2. Assign it the `translate.user` role
3. Create an API key for the Service Account
4. Use that key

## Need Help?

- [Yandex Translate API Docs](https://yandex.cloud/en/docs/translate/)
- [Yandex Cloud Console](https://console.cloud.yandex.com/)

