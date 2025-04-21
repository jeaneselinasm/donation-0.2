// app/[locale]/layout.tsx

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing, AppLocale } from '@/i18n/routing';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

// ✅ Await params before using it
export default async function LocaleLayout(
  props: { children: ReactNode; params: Promise<{ locale: string }> }
) {
  const { children, params } = props;
  const { locale } = await params;

  if (!routing.locales.includes(locale as AppLocale)) {
    notFound();
  }

  const messages = await getMessages({ locale: locale as AppLocale });

  return (
    <div className={inter.className}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </div>
  );
}
