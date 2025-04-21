// app/[locale]/layout.tsx

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing, AppLocale } from '@/i18n/routing';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

type LocaleLayoutProps = {
  children: ReactNode;
  params: {
    locale: AppLocale;
  };
};

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = params;

  if (!routing.locales.includes(locale as AppLocale)) {
    notFound(); // Will trigger 404 if locale is invalid
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
