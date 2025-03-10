"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export default function UnifiedDonationForm() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState<string>("")

  const donationAmounts = [50, 100, 250, 500]

  const handleAmountClick = (amount: number) => {
    setSelectedAmount(amount)
    setCustomAmount("")
  }

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value)
    setSelectedAmount(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const donationAmount = selectedAmount || (customAmount ? Number.parseFloat(customAmount) : 0)

    // In a real application, this would connect to a payment processor
    alert(`Processing one-time donation of $${donationAmount}`)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl md:text-3xl">Support Bible Translation</CardTitle>
        <CardDescription>Your one-time gift helps bring God's Word to people in their heart language.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <Label htmlFor="donation-amount">Select Amount</Label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {donationAmounts.map((amount) => (
                <Button
                  key={amount}
                  type="button"
                  variant={selectedAmount === amount ? "default" : "outline"}
                  onClick={() => handleAmountClick(amount)}
                  className={cn("h-12 text-base", selectedAmount === amount && "bg-primary text-primary-foreground")}
                >
                  ${amount}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="custom-amount">Custom Amount</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                id="custom-amount"
                type="number"
                min="1"
                step="1"
                placeholder="Enter amount"
                value={customAmount}
                onChange={handleCustomAmountChange}
                className="pl-7"
              />
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg">
            Donate Now
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-6">
        <p className="text-xs text-center text-muted-foreground max-w-md">
          Your donation is tax-deductible. You'll receive a receipt for your records. For questions about your donation,
          please contact our donor services team.
        </p>
      </CardFooter>
    </Card>
  )
}

