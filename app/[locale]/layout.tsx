// app/[locale]/layout.tsx

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string }; // Accept all incoming strings
}) {
  const { locale } = params;

  // Runtime validation of the locale
  if (!routing.locales.includes(locale)) {
    notFound(); // Will show the 404 page if invalid locale is in URL
  }

  const messages = await getMessages({ locale });

  return (
    <div className={inter.className}>
      <NextIntlClientProvider
        locale={locale}
        messages={messages}
      >
        {children}
      </NextIntlClientProvider>
    </div>
  );
}
