# Yandex Translate API Key Troubleshooting

## Current Error
The API is returning **401/403 "API key is invalid"**. This means the API key you're using is not valid.

## How to Fix

### 1. Verify Your API Key

1. Go to [Yandex Cloud Console](https://console.cloud.yandex.com/)
2. Navigate to **IAM** → **Service Accounts** or **API Keys**
3. Check if your API key is active
4. Make sure it has permissions for **Yandex Translate API**

### 2. Get a New API Key

1. Go to [Yandex Translate API Keys](https://translate.yandex.com/developers/keys)
2. Sign in with your Yandex account
3. Create a new API key
4. Copy the **full key** (it should be a long string)

### 3. Test Your API Key

Test the API key directly using curl:

```bash
curl "https://translate.yandex.net/api/v1.5/tr.json/translate?key=YOUR_API_KEY&text=hello&lang=en-ru"
```

**Expected response (success):**
```json
{"code":200,"lang":"en-ru","text":["привет"]}
```

**If you get 401/403:**
- The API key is invalid
- The API key has expired
- The API key doesn't have the right permissions

### 4. Update Your Environment Variable

Once you have a valid API key:

1. Update `.env.local`:
   ```bash
   NEXT_PUBLIC_YANDEX_TRANSLATE_API_KEY=your_new_api_key_here
   ```

2. **Restart your dev server**:
   ```bash
   # Stop server (Ctrl+C)
   npm run dev
   ```

### 5. Check API Key Format

Yandex Translate API keys should:
- Be a long string (usually 40+ characters)
- Start with letters/numbers
- Not contain spaces
- Be from the Yandex Cloud Console or Yandex Translate developer portal

### 6. Common Issues

#### Issue: "API key is invalid"
- **Solution**: Get a new API key from Yandex Cloud Console

#### Issue: "API key expired"
- **Solution**: API keys can expire. Create a new one.

#### Issue: "Insufficient permissions"
- **Solution**: Make sure the API key has access to Yandex Translate API

#### Issue: "Quota exceeded"
- **Solution**: Check your Yandex Cloud billing/quota limits

### 7. Alternative: Use Yandex Cloud Service Account

If API keys don't work, you can use a Service Account:

1. Create a Service Account in Yandex Cloud
2. Assign it the `translate.user` role
3. Use the Service Account's API key instead

## Verification

After updating your API key:

1. Restart dev server
2. Try translating again
3. Check server console for any errors
4. The translation should work without 401/403 errors

## Need Help?

- [Yandex Translate API Documentation](https://yandex.cloud/en/docs/translate/)
- [Yandex Cloud Console](https://console.cloud.yandex.com/)
- Check server console logs for detailed error messages

