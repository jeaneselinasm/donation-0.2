"use client";

import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils"; // or define a `cn()` helper yourself
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

type Country = {
  code: string;
  name: string;
};

interface CountryComboboxProps {
    countries: Country[];
    value: string | null; // country code
    onChange: (code: string) => void;
     error?: string; // ⬅️ Add this
  }

export function CountryCombobox({ countries, value, onChange, error}: CountryComboboxProps) {
    const [open, setOpen] = useState(false);
    const selectedCountry = countries.find((c) => c.code === value) || null;
    const tCountryList = useTranslations("CountryList");
    return (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className="w-full justify-between"
            >
              {selectedCountry
                ? selectedCountry.name
                : tCountryList("selectCountry")}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[250px] p-0">
            <Command>
              <CommandInput placeholder={tCountryList("searchCountry")} />
              <CommandEmpty>{tCountryList("countryNotFound")}</CommandEmpty>
    
              <CommandGroup className="max-h-[240px] overflow-y-auto">
                {countries.map((country) => (
                  <CommandItem
                    key={country.code}
                    onSelect={() => {
                      onChange(country.code);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === country.code ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {country.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
          {error && (
    <p className="text-sm text-red-500 mt-1">{error}</p>
  )}
        </Popover>
      );
    
}
