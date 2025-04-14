import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import countries from 'i18n-iso-countries';
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
import enLocale from 'i18n-iso-countries/langs/en.json';

countries.registerLocale(enLocale);

export function getAlpha3CountryList(): { code: string; name: string }[] {
  const alpha3Codes = Object.keys(countries.getAlpha3Codes());

  return alpha3Codes
    .map((alpha3) => ({
      code: alpha3,
      name: countries.getName(alpha3, 'en'),
    }))
    .filter((country): country is { code: string; name: string } => !!country.name);
}


