-- Migration: Add translation fields to news table
-- Run this SQL in your Supabase SQL Editor

-- Add translation columns for title
ALTER TABLE news 
ADD COLUMN IF NOT EXISTS title_en TEXT,
ADD COLUMN IF NOT EXISTS title_ru TEXT,
ADD COLUMN IF NOT EXISTS title_ar TEXT,
ADD COLUMN IF NOT EXISTS title_fr TEXT;

-- Add translation columns for text
ALTER TABLE news 
ADD COLUMN IF NOT EXISTS text_en TEXT,
ADD COLUMN IF NOT EXISTS text_ru TEXT,
ADD COLUMN IF NOT EXISTS text_ar TEXT,
ADD COLUMN IF NOT EXISTS text_fr TEXT;

-- Migrate existing data (if any) to English translations
UPDATE news 
SET 
  title_en = COALESCE(title, ''),
  text_en = COALESCE(text, '')
WHERE title_en IS NULL OR text_en IS NULL;

-- Optional: Keep the old title and text columns for backward compatibility
-- Or you can drop them after migration:
-- ALTER TABLE news DROP COLUMN IF EXISTS title;
-- ALTER TABLE news DROP COLUMN IF EXISTS text;

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_news_created_at ON news(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_news_created_by ON news(created_by);

