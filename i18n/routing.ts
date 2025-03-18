import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'id'],
  defaultLocale: 'en',
  localePrefix: 'always' // Ensure locale is always in the URL
});
