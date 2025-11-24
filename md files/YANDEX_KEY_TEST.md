# Testing Your Yandex Keys

## You Have Two Keys

1. **ID Key** (Application ID / API Key)
2. **Secret Key**

## Test Both Keys

### Test 1: Try ID Key with v1.5 API

```bash
curl "https://translate.yandex.net/api/v1.5/tr.json/translate?key=YOUR_ID_KEY&text=hello&lang=en-ru"
```

**Expected success:**
```json
{"code":200,"lang":"en-ru","text":["привет"]}
```

### Test 2: Try Secret Key with v1.5 API

```bash
curl "https://translate.yandex.net/api/v1.5/tr.json/translate?key=YOUR_SECRET_KEY&text=hello&lang=en-ru"
```

### Test 3: Try ID Key with v2 API (Authorization header)

```bash
curl -X POST \
  -H "Authorization: Api-Key YOUR_ID_KEY" \
  -H "Content-Type: application/json" \
  -d '{"texts":["hello"],"sourceLanguageCode":"en","targetLanguageCode":"ru"}' \
  "https://translate.api.cloud.yandex.net/translate/v2/translate"
```

**Expected success:**
```json
{"translations":[{"text":"привет"}]}
```

### Test 4: Try Secret Key with v2 API

```bash
curl -X POST \
  -H "Authorization: Api-Key YOUR_SECRET_KEY" \
  -H "Content-Type: application/json" \
  -d '{"texts":["hello"],"sourceLanguageCode":"en","targetLanguageCode":"ru"}' \
  "https://translate.api.cloud.yandex.net/translate/v2/translate"
```

## Which Key Works?

- **If ID key works with v1.5**: Use ID key in `.env.local`
- **If Secret key works with v1.5**: Use Secret key in `.env.local`
- **If v2 API works**: The code will automatically try v2 if v1.5 fails

## Update Your .env.local

Once you find which key works:

```bash
NEXT_PUBLIC_YANDEX_TRANSLATE_API_KEY=the_key_that_works
```

Then restart your dev server.

## Common Issues

- **Both keys return 401**: Keys might be expired or need activation
- **v2 requires folderId**: You might need to provide a folder ID for v2 API
- **Keys need permissions**: Make sure keys have `translate.user` role

