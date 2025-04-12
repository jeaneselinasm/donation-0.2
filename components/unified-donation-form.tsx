"use client";

import type React from "react";
import Swal from "sweetalert2";
import { useEffect, useRef, useState } from "react";
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
import { cn } from "@/lib/utils";
import { useTranslations, useLocale } from "next-intl";
import { createDonation } from "@/lib/action";
import Script from "next/script";

export default function UnifiedDonationForm() {
  const tDonation = useTranslations("Donation");
  const tPersonalInformation = useTranslations("PersonalInformation");
  const tOnSuccess = useTranslations("OnSuccess");
  const tOnClose = useTranslations("OnClose");
  const tOnPending = useTranslations("OnPending");
  const tOnError = useTranslations("OnError");

  const [formErrors, setFormErrors] = useState<Record<string, string[]>>({}); // ✅ Error state
  const locale = useLocale(); // ✅ Get the current locale
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>("");
  const lastTokenRef = useRef<string | null>(null);

  const donationAmounts =
    locale === "id" ? [250000, 500000, 1000000] : [39, 79, 109];

  // ✅ Format input while keeping it numeric
  const formatNumber = (value: string) => {
    const rawNumber = value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
    if (!rawNumber) return ""; // Return empty if input is cleared

    // Format number based on locale
    return new Intl.NumberFormat(locale === "id" ? "id-ID" : "en-US").format(
      Number(rawNumber)
    );
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    if (!formData.get("amount")) {
      const amount: string = selectedAmount
        ? selectedAmount.toString()
        : customAmount.replace(/[^0-9]/g, "");
      formData.append("amount", amount);
    }

    formData.append("locale", locale);
    console.log("🚀 Form Data: heree");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    // Call your server action
    const result = await createDonation(formData, (locale as "id") || "en");

    if (result?.errors) {
      setFormErrors(result.errors);
      return;
    }

    setFormErrors({}); // Clear any existing errors

    // Show Snap payment pop-up if available
    console.log("<<<token : ", result?.token);
    lastTokenRef.current = result?.token;
    console.log(" lastTokenRef.current >>> ", lastTokenRef.current);

    if (
      result?.token &&
      typeof window !== "undefined" &&
      (window as any).snap &&
      typeof (window as any).snap.pay === "function"
    ) {
      (window as any).snap.pay(result.token, {
        onSuccess: () =>
          Swal.fire({
            icon: "success",
            title: tOnSuccess("title"),
            text: tOnSuccess("text"),
          }),

        onPending: () =>
          Swal.fire({
            title: tOnPending("title"),
            text: tOnPending("text"),
          }),
        onError: () => {
          Swal.fire({
            icon: "error",
            title: tOnError("title"),
            text: tOnError("text"),
          });
        },
        onClose: () => {
          Swal.fire({
            icon: "question",
            title: tOnClose("title"),
            text: tOnClose("text"),
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: tOnClose("confirmButtonText"),
            cancelButtonText: tOnClose("cancelButtonText"),
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(tOnClose("isConfirmedText"), "", "success").then(() => {
                // Make sure to close the Snap popup here
                window.snap.hide(); // or window.snap.close() depending on your setup
              });
            } else if (result.isDismissed) {
              // ReOpen the snap window with same token
              window.snap.pay(lastTokenRef.current);
              Swal.fire(tOnClose("isDismissed"), "", "info");
            }
          });
        },
      });
    } else {
      Swal.fire("Oops", "Snap is not ready or token is missing", "warning");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && !(window as any).snap) {
      const script = document.createElement("script");
      script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
      script.setAttribute(
        "data-client-key",
        process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || ""
      );
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);
  return (
    <>
      <Script
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        strategy="afterInteractive"
        onError={(e) => {
          console.error("Failed to load Midtrans script", e);
        }}
      />

      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl md:text-3xl text-[#0087ee] ">
            {tDonation("title")}
          </CardTitle>
          <CardDescription className="text-justify md:text-center">
            {tDonation("description")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Donation Amount Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">{tDonation("amount")}</h3>
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
                    {locale === "id"
                      ? `Rp. ${amount.toLocaleString("id-ID")}`
                      : `$${amount}`}
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
                  placeholder={tDonation("customAmount")}
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  className="pl-14"
                />
              </div>
              {formErrors.amount && (
                <p className="text-sm text-red-500">{formErrors.amount[0]}</p>
              )}
            </div>

            {/* Personal Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">
                {tPersonalInformation("title")}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">
                    {tPersonalInformation("firstName")}*
                  </Label>
                  <Input
                    id="first-name"
                    name="firstName"
                    placeholder={tPersonalInformation("firstNamePlaceholder")}
                  />
                  {formErrors.firstName && (
                    <p className="text-sm text-red-500">
                      {formErrors.firstName[0]}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">
                    {tPersonalInformation("lastName")} *
                  </Label>
                  <Input
                    id="last-name"
                    name="lastName"
                    placeholder={tPersonalInformation("lastNamePlaceholder")}
                  />
                  {formErrors.lastName && (
                    <p className="text-sm text-red-500">
                      {formErrors.lastName[0]}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">
                    {tPersonalInformation("email")} *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={tPersonalInformation("emailPlaceholder")}
                  />
                  {formErrors.email && (
                    <p className="text-sm text-red-500">
                      {formErrors.email[0]}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">
                    {tPersonalInformation("phoneNumber")}
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder={tPersonalInformation("phoneNumberPlaceholder")}
                  />
                  {formErrors.phone && (
                    <p className="text-sm text-red-500">
                      {formErrors.phone[0]}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Address Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">
                {tPersonalInformation("addressInformation")}
              </h3>
              <div className="space-y-2">
                <Label htmlFor="address">
                  {tPersonalInformation("streetAddress")} *
                </Label>
                <Input
                  id="address"
                  name="address"
                  placeholder={tPersonalInformation("streetAddressPlaceholder")}
                />
                {formErrors.address && (
                  <p className="text-sm text-red-500">
                    {formErrors.address[0]}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="country">
                    {tPersonalInformation("country")} *
                  </Label>
                  <Input
                    id="country"
                    name="country"
                    placeholder={tPersonalInformation("countryPlaceholder")}
                  />
                  {formErrors.country && (
                    <p className="text-sm text-red-500">
                      {formErrors.country[0]}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">{tPersonalInformation("city")} *</Label>
                  <Input
                    id="city"
                    name="city"
                    placeholder={tPersonalInformation("cityPlaceholder")}
                  />
                  {formErrors.city && (
                    <p className="text-sm text-red-500">{formErrors.city[0]}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="postal-code">
                    {tPersonalInformation("postalCode")} *
                  </Label>
                  <Input
                    id="postalCode"
                    name="postalCode"
                    placeholder={tPersonalInformation("postalCodePlaceholder")}
                  />
                  {formErrors.postalCode && (
                    <p className="text-sm text-red-500">
                      {formErrors.postalCode[0]}
                    </p>
                  )}
                </div>
                <div className="sm:pt-7 flex items-center">
                  <p className="text-xs text-muted-foreground">
                    * {tPersonalInformation("requiredFields")}
                  </p>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full text-md bg-blue-400 hover:bg-blue-700"
              size="lg"
            >
              {tDonation("completeButton")}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-6">
          <p className="text-xs text-center text-muted-foreground max-w-lg">
            {locale === "en" ? tDonation("notes") : ""}
          </p>
        </CardFooter>
      </Card>
    </>
  );
}
