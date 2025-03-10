"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[350px]">
        <nav className="flex flex-col gap-6 mt-10 p-4">
          <Link 
            href="/" 
            className="text-lg font-medium hover:text-primary"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          <Link 
            href="#about" 
            className="text-lg font-medium hover:text-primary"
            onClick={() => setOpen(false)}
          >
            About
          </Link>
          <Link 
            href="#impact" 
            className="text-lg font-medium hover:text-primary"
            onClick={() => setOpen(false)}
          >
            Our Impact
          </Link>
          <Link 
            href="#testimonials" 
            className="text-lg font-medium hover:text-primary"
            onClick={() => setOpen(false)}
          >
            Testimonials
          </Link>
          <Button asChild className="mt-4">
            <Link 
              href="#donate"
              onClick={() => setOpen(false)}
            >
              Donate Now
            </Link>
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
