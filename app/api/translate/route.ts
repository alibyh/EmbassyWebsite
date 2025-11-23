import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

interface TranslateRequest {
  text: string;
  sourceLanguage: string;
  targetLanguage: string;
}

const LANGUAGE_CODES: Record<string, string> = {
  en: 'en',
  ru: 'ru',
  ar: 'ar',
  fr: 'fr',
};

export async function POST(request: NextRequest) {
  try {
    const body: TranslateRequest = await request.json();
    const { text, sourceLanguage, targetLanguage } = body;

    // Validate input
    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    if (!sourceLanguage || !targetLanguage) {
      return NextResponse.json(
        { error: 'Source and target languages are required' },
        { status: 400 }
      );
    }

    const sourceCode = LANGUAGE_CODES[sourceLanguage];
    const targetCode = LANGUAGE_CODES[targetLanguage];

    if (!sourceCode || !targetCode) {
      return NextResponse.json(
        { error: 'Invalid language code' },
        { status: 400 }
      );
    }

    if (sourceCode === targetCode) {
      return NextResponse.json({ translation: text });
    }

    // Get API key from environment variable
    // Check both server-side and client-side variable names
    const apiKey = process.env.YANDEX_TRANSLATE_API_KEY || process.env.NEXT_PUBLIC_YANDEX_TRANSLATE_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Yandex Translate API key is not configured. Please set YANDEX_TRANSLATE_API_KEY or NEXT_PUBLIC_YANDEX_TRANSLATE_API_KEY environment variable.' },
        { status: 500 }
      );
    }

    // Try v2 API first (uses Authorization header with Api-Key - correct for secret keys)
    // v2 API is the modern way and works with secret keys from Yandex Cloud
    const v2Url = 'https://translate.api.cloud.yandex.net/translate/v2/translate';
    
    let response = await fetch(v2Url, {
      method: 'POST',
      headers: {
        'Authorization': `Api-Key ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        texts: [text],
        sourceLanguageCode: sourceCode,
        targetLanguageCode: targetCode,
      }),
    });

    // If v2 succeeds, parse the response
    if (response.ok) {
      const v2Data = await response.json();
      if (v2Data.translations && v2Data.translations.length > 0 && v2Data.translations[0].text) {
        return NextResponse.json({ translation: v2Data.translations[0].text });
      }
    }

    // If v2 fails, try v1.5 API as fallback (uses key in query parameter)
    if (!response.ok && (response.status === 401 || response.status === 403)) {
      console.log('v2 API failed, trying v1.5 API as fallback...');
      
      const yandexUrl = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${apiKey}&text=${encodeURIComponent(text)}&lang=${sourceCode}-${targetCode}`;
      
      response = await fetch(yandexUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.message || errorData.code || `Translation failed: ${response.status}`;
      
      // Log detailed error for debugging (hide API key)
      console.error('Yandex API Error:', {
        status: response.status,
        statusText: response.statusText,
        errorData,
        apiKeyLength: apiKey?.length || 0,
        apiKeyPrefix: apiKey?.substring(0, 4) || 'N/A',
      });
      
      // Provide helpful error message
      let userMessage = errorMessage;
      if (response.status === 401 || response.status === 403) {
        userMessage = `API key is invalid or expired. Please check your Yandex Translate API key. Error: ${errorMessage}`;
      }
      
      return NextResponse.json(
        { error: userMessage },
        { status: response.status }
      );
    }

    const data = await response.json();

    if (data.translations && data.translations.length > 0) {
      return NextResponse.json({ translation: data.translations[0].text });
    }

    return NextResponse.json(
      { error: 'No translation returned from API' },
      { status: 500 }
    );
  } catch (error: any) {
    console.error('Translation API error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

