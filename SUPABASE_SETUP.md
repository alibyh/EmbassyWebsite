# Supabase Setup Guide

## 1. Create Storage Bucket

1. Go to your Supabase dashboard
2. Navigate to **Storage**
3. Click **New bucket**
4. Name it: `news-photos`
5. Make it **Public** (uncheck "Private bucket")
6. Click **Create bucket**

## 2. Set Up Storage Policies

Go to **Storage** → **Policies** → Select `news-photos` bucket

### Policy 1: Allow authenticated users to upload files

Click **New Policy** → **For full customization**

**Policy name:** `Allow authenticated uploads`

**Allowed operation:** INSERT

**Policy definition:**
```sql
(bucket_id = 'news-photos'::text) AND (auth.role() = 'authenticated'::text)
```

**WITH CHECK expression:**
```sql
(bucket_id = 'news-photos'::text) AND (auth.role() = 'authenticated'::text)
```

### Policy 2: Allow authenticated users to update their files

**Policy name:** `Allow authenticated updates`

**Allowed operation:** UPDATE

**Policy definition:**
```sql
(bucket_id = 'news-photos'::text) AND (auth.role() = 'authenticated'::text)
```

**WITH CHECK expression:**
```sql
(bucket_id = 'news-photos'::text) AND (auth.role() = 'authenticated'::text)
```

### Policy 3: Allow authenticated users to delete their files

**Policy name:** `Allow authenticated deletes`

**Allowed operation:** DELETE

**Policy definition:**
```sql
(bucket_id = 'news-photos'::text) AND (auth.role() = 'authenticated'::text)
```

**WITH CHECK expression:**
```sql
(bucket_id = 'news-photos'::text) AND (auth.role() = 'authenticated'::text)
```

### Policy 4: Allow public read access

**Policy name:** `Allow public read access`

**Allowed operation:** SELECT

**Policy definition:**
```sql
bucket_id = 'news-photos'::text
```

**WITH CHECK expression:** (leave empty or same as definition)

## 3. Create News Table

Go to **SQL Editor** and run:

```sql
CREATE TABLE IF NOT EXISTS news (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  text TEXT NOT NULL,
  photo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- Create policy to allow authenticated users to insert
CREATE POLICY "Allow authenticated users to insert news"
ON news FOR INSERT
TO authenticated
WITH CHECK (true);

-- Create policy to allow public read access
CREATE POLICY "Allow public read access"
ON news FOR SELECT
TO public
USING (true);

-- Create policy to allow authenticated users to update their own news
CREATE POLICY "Allow authenticated users to update news"
ON news FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Create policy to allow authenticated users to delete their own news
CREATE POLICY "Allow authenticated users to delete news"
ON news FOR DELETE
TO authenticated
USING (true);
```

## 4. Quick Setup via SQL (Alternative)

If you prefer to set everything up via SQL, run this in the **SQL Editor**:

```sql
-- Create storage bucket (if it doesn't exist)
INSERT INTO storage.buckets (id, name, public)
VALUES ('news-photos', 'news-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for news-photos bucket
-- Allow authenticated users to upload
CREATE POLICY "Allow authenticated uploads"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'news-photos');

-- Allow authenticated users to update
CREATE POLICY "Allow authenticated updates"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'news-photos')
WITH CHECK (bucket_id = 'news-photos');

-- Allow authenticated users to delete
CREATE POLICY "Allow authenticated deletes"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'news-photos');

-- Allow public read access
CREATE POLICY "Allow public read access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'news-photos');

-- Create news table
CREATE TABLE IF NOT EXISTS news (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  text TEXT NOT NULL,
  photo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- Create policy to allow authenticated users to insert
CREATE POLICY "Allow authenticated users to insert news"
ON news FOR INSERT
TO authenticated
WITH CHECK (true);

-- Create policy to allow public read access
CREATE POLICY "Allow public read access"
ON news FOR SELECT
TO public
USING (true);

-- Create policy to allow authenticated users to update their own news
CREATE POLICY "Allow authenticated users to update news"
ON news FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Create policy to allow authenticated users to delete their own news
CREATE POLICY "Allow authenticated users to delete news"
ON news FOR DELETE
TO authenticated
USING (true);
```

## Verification

After running the SQL:

1. Go to **Storage** → You should see `news-photos` bucket
2. Go to **Storage** → **Policies** → Select `news-photos` → You should see 4 policies
3. Go to **Table Editor** → You should see `news` table
4. Try uploading a photo from the admin panel

