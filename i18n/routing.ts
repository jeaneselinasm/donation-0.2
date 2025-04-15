import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'id'] as const,
  defaultLocale: 'en',
  localePrefix: 'always',
});

// ✅ Export a union type from the defined locales
export type AppLocale = (typeof routing.locales)[number]; 
