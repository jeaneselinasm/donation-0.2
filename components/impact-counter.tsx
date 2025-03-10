"use client"

import { useEffect, useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface ImpactCounterProps {
  value: number
  label: string
  icon?: ReactNode
  className?: string
}

export default function ImpactCounter({ value, label, icon, className }: ImpactCounterProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2000 // ms
    const steps = 20
    const stepValue = value / steps
    const stepTime = duration / steps
    let current = 0

    const timer = setInterval(() => {
      current += stepValue
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, stepTime)

    return () => clearInterval(timer)
  }, [value])

  return (
    <div className={cn("flex flex-col items-center", className)}>
      {icon && <div className="mb-2 text-primary">{icon}</div>}
      <div className="text-3xl md:text-4xl font-bold">{count.toLocaleString()}</div>
      <p className="text-sm text-muted-foreground text-center mt-1">{label}</p>
    </div>
  )
}

