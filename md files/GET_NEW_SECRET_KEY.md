# How to Get a New Yandex Secret Key

## Step-by-Step Guide

### 1. Go to Yandex Cloud Console

Visit: https://console.cloud.yandex.com/

### 2. Navigate to Service Accounts

1. Select your **folder** (or create one if you don't have one)
2. Go to **IAM** → **Service Accounts**
3. If you don't have a service account, click **Create service account**

### 3. Create/Select Service Account

1. **Name**: Give it a name (e.g., "translate-service")
2. **Description**: Optional
3. Click **Create**

### 4. Assign Role

1. Click on your service account
2. Go to **Roles** tab
3. Click **Assign roles**
4. Select role: **`ai.translate.user`**
5. Click **Save**

### 5. Create API Key (Secret Key)

1. In your service account, go to **API Keys** tab
2. Click **Create new key** → **Create API key**
3. **IMPORTANT**: The secret key will be shown **ONCE ONLY**
4. **Copy it immediately** and save it somewhere safe
5. Click **Close**

### 6. Save the Secret Key

The key will look something like:
```
AQVNxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
(Replace with your actual key - this is just an example format)

**Save it to `.env.local`:**
```bash
NEXT_PUBLIC_YANDEX_TRANSLATE_API_KEY=your_new_secret_key_here
```

### 7. Test the New Key

```bash
curl -X POST \
  -H "Authorization: Api-Key YOUR_NEW_SECRET_KEY" \
  -H "Content-Type: application/json" \
  -d '{"texts":["hello"],"sourceLanguageCode":"en","targetLanguageCode":"ru"}' \
  "https://translate.api.cloud.yandex.net/translate/v2/translate"
```

**Expected response:**
```json
{"translations":[{"text":"привет"}]}
```

### 8. Restart Your Dev Server

```bash
# Stop server (Ctrl+C)
npm run dev
```

## Important Notes

- ⚠️ **Secret keys are view-once**: Save them immediately!
- ✅ **v2 API uses Authorization header**: `Authorization: Api-Key <key>`
- ✅ **Code updated**: Now tries v2 API first (correct for secret keys)
- 🔒 **Keep keys secure**: Don't commit `.env.local` to git

## If You Still Get Errors

1. **Check folder ID**: v2 API might need `folderId` in request body
2. **Check billing**: Some APIs require active billing
3. **Check permissions**: Service account needs `ai.translate.user` role
4. **Check key format**: Should be a long string, no spaces

## Alternative: Use IAM Token

If API keys don't work, you can use IAM tokens (but they expire):

1. Install Yandex CLI
2. Run: `yc iam create-token`
3. Use token in `Authorization: Bearer <token>` header

