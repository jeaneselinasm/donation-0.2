import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const getLocaleFromIP = async (req: NextRequest) => {
  try {
    // let ip =
    //   req.headers.get('x-forwarded-for')?.split(',')[0] || // Get real IP from proxy headers
    //   req.ip || // Direct IP (if available)
    //   '8.8.8.8'; // Fallback to Google's public IP
    //   console.log(`🔍 Detected IP: ${ip}`);
    // Handle localhost requests
    // if (ip === '::1' || ip === '127.0.0.1') {
    //   return 'en'; // Default locale for local development
    // }

    // Fetch geolocation data using GeoJS
    /** For testing IP geolocation p
     *  const ip = '1.21.255.255'
     * const res = await fetch(`https://get.geojs.io/v1/ip/country/${ip}.json`);
     */
   
    const res = await fetch(`https://get.geojs.io/v1/ip/country.json`);

    const data = await res.json();
    // console.log('====================================');
    // console.log(data);
    // console.log('====================================');

    if (!data.country) {
      console.warn('GeoJS did not return a country code, defaulting to English.');
      return 'en'; // Fallback if lookup fails
    }

    // Map country codes to locales
    const countryLangMap: Record<string, string> = {
      ID: 'id', // Indonesia -> Bahasa Indonesia
      US: 'en', // USA -> English
     
    };

    return countryLangMap[data.country] || 'en'; // Default to 'en' if unknown
  } catch (error) {
    console.error('GeoJS IP detection failed:', error);
    return 'en'; // Fallback to English
  }
};

// Middleware function
export default async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Skip detection if locale is already in URL
  if (pathname.startsWith('/id') || pathname.startsWith('/en')) {
    return createMiddleware(routing)(req);
  }

  // Detect user's locale from IP
  const detectedLocale = await getLocaleFromIP(req);

  // Redirect to detected locale
  return NextResponse.redirect(new URL(`/${detectedLocale}${pathname}`, req.url));
}

// Middleware matcher configuration
export const config = {
  matcher: ['/', '/(id|en)/:path*'],
};
