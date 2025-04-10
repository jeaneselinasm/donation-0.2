"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useTranslations, useLocale } from "next-intl"
import { createDonation } from "@/lib/action";
export default function UnifiedDonationForm() {

  const locale = useLocale(); // ✅ Get the current locale
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>("");

  const donationAmounts = locale === "id" ? [250000, 500000, 1000000] : [39, 79, 109];

  // ✅ Format input while keeping it numeric
  const formatNumber = (value: string) => {
    const rawNumber = value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
    if (!rawNumber) return ""; // Return empty if input is cleared

    // Format number based on locale
    return new Intl.NumberFormat(locale === "id" ? "id-ID" : "en-US").format(Number(rawNumber));
  };

  // ✅ Handle custom amount change
  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatNumber(e.target.value);
    setCustomAmount(formattedValue);
    setSelectedAmount(null); // Unselect preset amounts when typing custom value
  };

  const handleAmountClick = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };


  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget
    console.log('<<<')
    console.log(form)
    const formData = new FormData(form);


  
    
    // In a real application, this would connect to a payment processor
    alert(`Processing one-time donation of `);


    // Add amount manually if it's not already added as hidden input:
  if (!formData.get("amount")) {
    
    const amount : string = selectedAmount || customAmount.replace(/[^0-9]/g, "");
    formData.append("amount", amount);
  }

  // Append the locale value
  formData.append("locale", locale);


  console.log("🚀 Form Data: heree");
  for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }
  await createDonation(formData);


  };
  const tDonation = useTranslations('Donation')
  const tPersonalInformation = useTranslations('PersonalInformation')
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl md:text-3xl text-[#0087ee] ">
          {tDonation('title')}
        </CardTitle>
        <CardDescription className="text-justify md:text-center">
          {tDonation('description')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Donation Amount Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{tDonation('amount')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {donationAmounts.map((amount) => (
                <Button
                  key={amount}
                  type="button"
                  variant={selectedAmount === amount ? "default" : "outline"}
                  onClick={() => handleAmountClick(amount)}
                  className={cn(
                    "h-12 text-base",
                    selectedAmount === amount &&
                    "bg-[#f78540] text-primary-foreground"
                  )}
                >
                  {locale === "id" ? `Rp. ${amount.toLocaleString("id-ID")}` : `$${amount}`}
                </Button>
              ))}
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {locale === "id" ? "Rp." : "$"}
              </span>
              <Input
                id="custom-amount"
                type="text" // ✅ Keep it text to prevent unwanted default number formatting
                placeholder={tDonation('customAmount')}
                value={customAmount}
                onChange={handleCustomAmountChange}
                className="pl-14"
              />
            </div>
          </div>

          {/* Personal Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{tPersonalInformation('title')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">{tPersonalInformation('firstName')}*</Label>
                <Input
                  id="first-name"
                  name="firstName"
                  placeholder={tPersonalInformation('firstNamePlaceholder')}
                  
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">{tPersonalInformation('lastName')} *</Label>
                <Input
                  id="last-name"
                  name="lastName"
                  placeholder={tPersonalInformation('lastNamePlaceholder')}
                  
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">{tPersonalInformation('email')} *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={tPersonalInformation('emailPlaceholder')}
                  
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">{tPersonalInformation('phoneNumber')}</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"     
                  placeholder={tPersonalInformation('phoneNumberPlaceholder')}
                />
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{tPersonalInformation('addressInformation')}</h3>
            <div className="space-y-2">
              <Label htmlFor="address">{tPersonalInformation('streetAddress')} *</Label>
              <Input
                id="address"
                name="address"
                placeholder={tPersonalInformation('streetAddressPlaceholder')}
                
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="country">{tPersonalInformation('country')} *</Label>
                <Input id="country" name="country" placeholder={tPersonalInformation('countryPlaceholder')}  />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">{tPersonalInformation('city')} *</Label>
                <Input id="city" name="city" placeholder={tPersonalInformation('cityPlaceholder')}  />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="postal-code">{tPersonalInformation('postalCode')} *</Label>
                <Input
                  id="postal-code"
                  name="postal-code"
                  placeholder={tPersonalInformation('postalCodePlaceholder')}
                  
                />
              </div>
              <div className="sm:pt-7 flex items-center">
                <p className="text-xs text-muted-foreground">
                  * {tPersonalInformation('requiredFields')}
                </p>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full text-md bg-blue-400 hover:bg-blue-700" size="lg">
           {tDonation('completeButton')}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-6">
  <p className="text-xs text-center text-muted-foreground max-w-lg">
    {locale === "en" ? tDonation("notes") : ""}
  </p>
</CardFooter>
    </Card>
  );
}
