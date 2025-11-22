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
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Embassy of Mauritania in Moscow - Official Portal</title>
        <meta name="description" content="Official website of the Embassy of the Islamic Republic of Mauritania in Moscow, Russia. Consular services, visa applications, and support for Mauritanian citizens." />
        <meta name="keywords" content="Mauritania, embassy, Moscow, Russia, consular services, passport, visa, diplomatic" />
        <link rel="icon" href="/EmbassyWebsite/icon.svg" />
      </head>
      <body>
        <AuthProvider>
        <I18nProvider>{children}</I18nProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
