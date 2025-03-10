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

export default function UnifiedDonationForm() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>("");

  const donationAmounts = [39, 79, 109];

  const handleAmountClick = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setSelectedAmount(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const donationAmount =
      selectedAmount || (customAmount ? Number.parseFloat(customAmount) : 0);

    // In a real application, this would connect to a payment processor
    alert(`Processing one-time donation of $${donationAmount}`);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl md:text-3xl">
          Support Bible Translation
        </CardTitle>
        <CardDescription className="">
          By donating, you will directly impact communities that have never
          heard the Word of God. Your contribution will fund essential
          translation efforts and outreach initiatives.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Donation Amount Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Donation Amount</h3>
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
                      "bg-primary text-primary-foreground"
                  )}
                >
                  ${amount}
                </Button>
              ))}
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                $
              </span>
              <Input
                id="custom-amount"
                type="number"
                min="1"
                step="1"
                placeholder="Custom amount"
                value={customAmount}
                onChange={handleCustomAmountChange}
                className="pl-7"
              />
            </div>
          </div>

          {/* Personal Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Personal Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">First Name *</Label>
                <Input
                  id="first-name"
                  placeholder="Enter your first name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last Name *</Label>
                <Input
                  id="last-name"
                  placeholder="Enter your last name"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Address Information</h3>
            <div className="space-y-2">
              <Label htmlFor="address">Street Address *</Label>
              <Input
                id="address"
                placeholder="Enter your street address"
                required
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="country">Country *</Label>
                <Input id="country" placeholder="Enter your country" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input id="city" placeholder="Enter your city" required />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="postal-code">Postal Code *</Label>
                <Input
                  id="postal-code"
                  placeholder="Enter your postal code"
                  required
                />
              </div>
              <div className="sm:pt-7 flex items-center">
                <p className="text-xs text-muted-foreground">
                  * Required fields
                </p>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg">
            Complete Donation
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-6">
        <p className="text-xs text-center text-muted-foreground max-w-lg">
          You are entering amounts in USD. Our system will convert and display
          the amount in IDR when you proceed to choose your payment method.
        </p>
      </CardFooter>
    </Card>
  );
}
