"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface DonationCardProps {
  title: string
  description: string
  amounts: number[]
  buttonText: string
  highlighted?: boolean
}

export default function DonationCard({
  title,
  description,
  amounts,
  buttonText,
  highlighted = false,
}: DonationCardProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState<string>("")

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
    alert(`Processing ${title} donation of $${donationAmount}`)
  }

  return (
    <Card className={cn("flex flex-col h-full", highlighted && "border-primary shadow-lg")}>
      <CardHeader className={cn(highlighted && "bg-primary text-primary-foreground")}>
        <CardTitle>{title}</CardTitle>
        <CardDescription className={cn(highlighted && "text-primary-foreground/80")}>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            {amounts.map((amount) => (
              <Button
                key={amount}
                type="button"
                variant={selectedAmount === amount ? "default" : "outline"}
                onClick={() => handleAmountClick(amount)}
                className="w-full"
              >
                ${amount}
              </Button>
            ))}
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium">Custom Amount</div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                type="number"
                min="1"
                step="1"
                placeholder="Other amount"
                value={customAmount}
                onChange={handleCustomAmountChange}
                className="pl-7"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full" variant={highlighted ? "secondary" : "default"} onClick={handleSubmit}>
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  )
}

