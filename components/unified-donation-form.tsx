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
import { cn, getAlpha3CountryList } from "@/lib/utils";
import { useTranslations, useLocale } from "next-intl";
import { createDonation } from "@/lib/action";
import Script from "next/script";
import { CountryCombobox } from "./country-list";
import { Skeleton } from "./ui/skeleton";

export default function UnifiedDonationForm() {
  const tDonation = useTranslations("Donation");
  const tPersonalInformation = useTranslations("PersonalInformation");
  const tOnSuccess = useTranslations("OnSuccess");
  const tOnClose = useTranslations("OnClose");
  const tOnPending = useTranslations("OnPending");
  const tOnError = useTranslations("OnError");
  const countries = getAlpha3CountryList();
  const [formErrors, setFormErrors] = useState<Record<string, string[]>>({});
  const locale = useLocale();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>("");
  const lastTokenRef = useRef<string | undefined>(undefined);

  const [isLoading, setIsLoading] = useState(false);
  const donationAmounts =
    locale === "id" ? [250000, 500000, 1000000] : [39, 79, 109];
  // form state hooks
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
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
    setIsLoading(true); // ✅ Start loading
    const form = e.currentTarget;
    const formData = new FormData(form);

    if (!formData.get("amount")) {
      const amount: string = selectedAmount
        ? selectedAmount.toString()
        : customAmount.replace(/[^0-9]/g, "");
      formData.append("amount", amount);
    }

    formData.append("locale", locale);
    formData.append("country", country);
    console.log("🚀 Form Data: heree");
    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }

    // Call your server action
    const result = await createDonation(formData, (locale as "id") || "en");
    console.log(result, 'result')
    console.log(result.errors, "<<<");
    if (result?.errors) {
      setFormErrors(result.errors);
      setIsLoading(false); // ⬅️ Reset loading when error
      return;
    }

    setFormErrors({}); // Clear any existing errors

    // Show Snap payment pop-up if available

    if (!result.token && !result?.errors) {
      setIsLoading(true);
      return;
    }
    lastTokenRef.current = result?.token;
    console.log(" lastTokenRef.current >>> ", lastTokenRef.current);
    setIsLoading(false); // ✅ Stop loading once token is ready
    if (
      result?.token &&
      typeof window !== "undefined" &&
      window.snap &&
      typeof window.snap.pay === "function"
    ) {
      window.snap.pay(result.token, {
        language: locale,
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
                window?.snap?.hide?.(); // or window.snap.close() depending on your setup
              });
            } else if (
              result.isDismissed &&
              typeof lastTokenRef.current === "string"
            ) {
              // ReOpen the snap window with same token
              window.snap.pay(lastTokenRef.current, { language: locale });
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
    if (typeof window !== "undefined" && !window.snap) {
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
                {isLoading
                  ? Array.from({ length: 3 }).map((_, i) => (
                      <Skeleton key={i} className="h-12 w-full" />
                    ))
                  : donationAmounts.map((amount) => (
                      <Button
                        key={amount}
                        type="button"
                        variant={
                          selectedAmount === amount ? "default" : "outline"
                        }
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
                {isLoading ? (
                  <Skeleton className="h-8 w-3/4 mx-auto" />
                ) : (
                  <Input
                    id="custom-amount"
                    type="text"
                    placeholder={tDonation("customAmount")}
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    className="pl-14"
                  />
                )}
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
                  {isLoading ? (
                    <Skeleton className="h-8 w-3/4 mx-auto" />
                  ) : (
                    <Input
                      id="first-name"
                      name="firstName"
                      placeholder={tPersonalInformation("firstNamePlaceholder")}
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  )}

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
                  {isLoading ? (
                    <Skeleton className="h-8 w-3/4 mx-auto" />
                  ) : (
                    <Input
                      id="last-name"
                      name="lastName"
                      placeholder={tPersonalInformation("lastNamePlaceholder")}
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  )}
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
                  {isLoading ? (
                    <Skeleton className="h-8 w-3/4 mx-auto" />
                  ) : (
                    <Input
                      id="email"
                      name="email"
                      placeholder={tPersonalInformation("emailPlaceholder")}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  )}
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
                  {isLoading ? (
                    <Skeleton className="h-8 w-3/4 mx-auto" />
                  ) : (
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder={tPersonalInformation(
                        "phoneNumberPlaceholder"
                      )}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  )}
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
                {isLoading ? (
                  <Skeleton className="h-8 w-3/4 mx-auto" />
                ) : (
                  <Input
                    id="address"
                    name="address"
                    placeholder={tPersonalInformation(
                      "streetAddressPlaceholder"
                    )}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                )}
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
                  {isLoading ? (
                    <Skeleton className="h-8 w-3/4 mx-auto" />
                  ) : (
                    <CountryCombobox
                      countries={countries}
                      value={country}
                      onChange={setCountry}
                      error={formErrors.country?.[0]} // Pass error message here
                    />
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">{tPersonalInformation("city")} *</Label>
                  {isLoading ? (
                    <Skeleton className="h-8 w-3/4 mx-auto" />
                  ) : (
                    <Input
                      id="city"
                      name="city"
                      placeholder={tPersonalInformation("cityPlaceholder")}
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  )}

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
                  {isLoading ? (
                    <Skeleton className="h-8 w-3/4 mx-auto" />
                  ) : (
                    <Input
                      id="postalCode"
                      name="postalCode"
                      placeholder={tPersonalInformation(
                        "postalCodePlaceholder"
                      )}
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                    />
                  )}

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
