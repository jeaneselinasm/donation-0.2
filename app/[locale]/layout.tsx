import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing, AppLocale } from '@/i18n/routing';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string }; // <- use string here, validate at runtime
}) {
  const { locale } = params;

  // Validate the locale
  if (!routing.locales.includes(locale as AppLocale)) {
    notFound();
  }

  const safeLocale = locale as AppLocale;
  const messages = await getMessages({ locale: safeLocale });

  return (
    <div className={inter.className}>
      <NextIntlClientProvider locale={safeLocale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </div>
  );
}
