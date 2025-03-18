"use client"

import { usePathname, useRouter } from "next/navigation"
import { useLocale } from "next-intl"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"

const languages = [
  { code: "en", name: "English" },
  { code: "id", name: "Bahasa Indonesia" },
]

export default function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  // Get the current language name
  const currentLanguage = languages.find((lang) => lang.code === locale)?.name || "English"

  // Handle language change
  const handleLanguageChange = (newLocale: string) => {
    // Replace the current locale in the path with the new one
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`)
    router.push(newPath)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1 px-2 min-w-[100px] justify-start">
          <Globe className="h-4 w-4 shrink-0" />
          <span className="hidden sm:inline-block truncate">{currentLanguage}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={locale === language.code ? "bg-muted font-medium" : ""}
          >
            {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

