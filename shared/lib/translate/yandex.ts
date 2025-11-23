/**
 * Yandex Translate API utility
 * 
 * Uses Next.js API route in dev mode, falls back to direct fetch with JSONP-like approach
 * for static export scenarios.
 */

import nextConfig from '../../../next.config.js';

export type TranslateLanguage = 'en' | 'ru' | 'ar' | 'fr';

// Get basePath from next.config.js
const basePath = (nextConfig.basePath || '') as string;

const LANGUAGE_CODES: Record<TranslateLanguage, string> = {
  en: 'en',
  ru: 'ru',
  ar: 'ar',
  fr: 'fr',
};

interface TranslateResponse {
  translations: Array<{
    text: string;
    detectedLanguageCode?: string;
  }>;
}

/**
 * Translate text using Yandex Translate API via Next.js API route
 */
async function translateViaAPI(
  text: string,
  targetLanguage: TranslateLanguage,
  sourceLanguage: TranslateLanguage
): Promise<string> {
  // Use basePath from next.config.js
  const apiUrl = `${basePath}/api/translate`;
  
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text,
      sourceLanguage,
      targetLanguage,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error || `Translation failed: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();

  if (data.translation) {
    return data.translation;
  }

  throw new Error('No translation returned from API');
}

/**
 * Translate using JSONP approach (for static export)
 * This creates a script tag to bypass CORS
 */
async function translateWithJSONP(
  text: string,
  targetLanguage: TranslateLanguage,
  sourceLanguage: TranslateLanguage
): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_YANDEX_TRANSLATE_API_KEY;
  
  if (!apiKey) {
    throw new Error('Yandex Translate API key is not configured. Please set NEXT_PUBLIC_YANDEX_TRANSLATE_API_KEY environment variable.');
  }

  const sourceCode = LANGUAGE_CODES[sourceLanguage];
  const targetCode = LANGUAGE_CODES[targetLanguage];
  
  // Use Yandex Translate API with JSONP callback
  // Note: Yandex Translate API doesn't support JSONP, so we'll use a different approach
  // We'll use a CORS proxy that actually works
  
  // Try multiple CORS proxy services as fallback
  const yandexUrl = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${apiKey}&text=${encodeURIComponent(text)}&lang=${sourceCode}-${targetCode}`;
  
  // Try different CORS proxy services
  const proxyServices = [
    `https://corsproxy.io/?${encodeURIComponent(yandexUrl)}`,
    `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(yandexUrl)}`,
    `https://cors-anywhere.herokuapp.com/${yandexUrl}`, // May require activation
  ];

  for (const proxyUrl of proxyServices) {
    try {
      const response = await fetch(proxyUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (response.ok) {
        const data: TranslateResponse = await response.json();

        if (data.translations && data.translations.length > 0) {
          return data.translations[0].text;
        }
      }
    } catch (error) {
      // Try next proxy service
      continue;
    }
  }

  // If all proxies fail, throw error
  throw new Error('All CORS proxy services failed. Please use the API route in dev mode or deploy to a platform that supports server-side rendering.');
}

/**
 * Translate text using Yandex Translate API
 */
export async function translateText(
  text: string,
  targetLanguage: TranslateLanguage,
  sourceLanguage: TranslateLanguage = 'en'
): Promise<string> {
  if (!text || text.trim().length === 0) {
    return '';
  }

  if (sourceLanguage === targetLanguage) {
    return text; // No translation needed
  }

  // Try API route first (works in dev mode and server-side rendering)
  try {
    return await translateViaAPI(text, targetLanguage, sourceLanguage);
  } catch (error: any) {
    // If API route fails (404 or other error), fall back to CORS proxy
    console.log('API route not available, using CORS proxy:', error.message);
    return translateWithJSONP(text, targetLanguage, sourceLanguage);
  }
}

/**
 * Translate text to all target languages
 */
export async function translateToAllLanguages(
  text: string,
  sourceLanguage: TranslateLanguage
): Promise<Record<TranslateLanguage, string>> {
  const languages: TranslateLanguage[] = ['en', 'ru', 'ar', 'fr'];
  const translations: Record<TranslateLanguage, string> = {
    en: '',
    ru: '',
    ar: '',
    fr: '',
  };

  // Set source language text
  translations[sourceLanguage] = text;

  // Translate to other languages
  const translationPromises = languages
    .filter((lang) => lang !== sourceLanguage)
    .map(async (lang) => {
      try {
        const translated = await translateText(text, lang, sourceLanguage);
        translations[lang] = translated;
      } catch (error) {
        console.error(`Failed to translate to ${lang}:`, error);
        translations[lang] = ''; // Empty on error
      }
    });

  await Promise.all(translationPromises);

  // Ensure all languages are present (TypeScript safety)
  return {
    en: translations.en || '',
    ru: translations.ru || '',
    ar: translations.ar || '',
    fr: translations.fr || '',
  };
}
