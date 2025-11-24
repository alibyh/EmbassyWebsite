'use client';

import { I18nProvider } from '@/shared/lib/i18n';
import { AuthProvider } from '@/shared/lib/auth';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Embassy of Mauritania in Moscow - Official Portal</title>
        <meta name="description" content="Official website of the Embassy of the Islamic Republic of Mauritania in Moscow, Russia. Consular services, visa applications, and support for Mauritanian citizens." />
        <meta name="keywords" content="Mauritania, embassy, Moscow, Russia, consular services, passport, visa, diplomatic" />
        <link rel="icon" href="/EmbassyWebsite/icon.svg" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var locale = localStorage.getItem('locale');
                  if (locale && ['en', 'ru', 'ar', 'fr'].includes(locale)) {
                    var dir = locale === 'ar' ? 'rtl' : 'ltr';
                    document.documentElement.setAttribute('lang', locale);
                    document.documentElement.setAttribute('dir', dir);
                    document.documentElement.classList.add('locale-ready');
                  } else {
                    document.documentElement.classList.add('locale-ready');
                  }
                } catch (e) {
                  document.documentElement.classList.add('locale-ready');
                }
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <AuthProvider>
        <I18nProvider>{children}</I18nProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
