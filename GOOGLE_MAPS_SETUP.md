# Google Maps Embed Setup

## Current Issue

The Google Maps embed is showing an error: `GET https://maps.googleapis.com/maps/api/mapsjs/gen_204?csp_test=true net::ERR_BLOCKED_BY_CLIENT`

This can be caused by:
1. Ad blockers blocking Google Maps scripts
2. Incorrect embed URL format
3. Privacy extensions blocking third-party content

## Solution: Get the Correct Embed URL

### Step 1: Find the Embassy on Google Maps

1. Go to [Google Maps](https://www.google.com/maps)
2. Search for: `ул. Донская, 18/7, Москва, Россия`
3. Or search: `Donskaya Street 18/7, Moscow, Russia`

### Step 2: Get the Embed URL

1. Once you find the location, click the **Share** button
2. Select **Embed a map** tab
3. Copy the entire `src` URL from the iframe code
4. It will look something like:
   ```
   https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2245...
   ```

### Step 3: Update the Code

Replace the `mapUrl` in `widgets/Location/Location.tsx`:

```typescript
const mapUrl = 'PASTE_YOUR_EMBED_URL_HERE';
```

## Alternative: Use Yandex Maps (Russian Alternative)

If Google Maps continues to have issues, you can use Yandex Maps instead:

1. Go to [Yandex Maps](https://yandex.ru/maps)
2. Search for the address
3. Click Share > Embed
4. Copy the iframe URL

## Note About Ad Blockers

If users have ad blockers enabled, they may see the error. This is expected behavior and the map will still work for users without ad blockers.


