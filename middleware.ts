import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const COOKIE_NAME = 'user-locale';

const getLocaleFromIP = async (req: NextRequest) => {
  try {
    let ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.ip ||
      '8.8.8.8'; // Fallback to Google's public IP

    console.log(`🔍 Detected IP: ${ip}`);

    if (ip === '::1' || ip === '127.0.0.1') {
      console.warn('⚠️ Localhost detected, defaulting to English.');
      return 'en';
    }

    // ✅ Corrected GeoJS API URL
    const res = await fetch(`https://get.geojs.io/v1/ip/geo/${ip}.json`, {
      headers: { 'Accept': 'application/json' },
    });

    if (!res.ok) {
      console.warn(`⚠️ GeoJS request failed: ${res.statusText}`);
      return 'en';
    }

    const data = await res.json();
    console.log('🌍 GeoJS Response:', data);

    if (!data.country_code) {
      console.warn('⚠️ GeoJS did not return a country code, defaulting to English.');
      return 'en';
    }

    const countryLangMap: Record<string, string> = {
      ID: 'id',
      US: 'en',
    };

    return countryLangMap[data.country_code] || 'en';
  } catch (error) {
    console.error('❌ GeoJS IP detection failed:', error);
    return 'en';
  }
};

export default async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const cookies = req.cookies.get(COOKIE_NAME);

  // ✅ If user manually selected a language, use it
  if (cookies?.value) {
    return createMiddleware(routing)(req);
  }

  // ✅ Skip detection if locale is already in URL
  if (pathname.startsWith('/id') || pathname.startsWith('/en')) {
    return createMiddleware(routing)(req);
  }

  // ✅ Detect language from IP
  const detectedLocale = await getLocaleFromIP(req);

  // ✅ Store the selected language in a cookie for 1 year
  const response = NextResponse.redirect(new URL(`/${detectedLocale}${pathname}`, req.url));
  response.cookies.set(COOKIE_NAME, detectedLocale, {
    maxAge: 60 * 60 * 24 * 365,
    path: '/',
  });

  return response;
}

// Middleware matcher configuration
export const config = {
  matcher: ['/', '/(id|en)/:path*'],
};
