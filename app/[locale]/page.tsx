"use client"

import Link from "next/link"
import { ArrowRight, BookOpen,  PrinterCheck, BookMarked, Instagram, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import TestimonialCard from "@/components/testimonial-card"
import ImpactCounter from "@/components/impact-counter"
import MobileNav from "@/components/mobile-nav"
import Image from "next/image"
import UnifiedDonationForm from "@/components/unified-donation-form"
import { useTranslations } from "next-intl"
import LanguageSwitcher from "@/components/languageSwitcher"



export default function Home() {
  const tHomePage = useTranslations("HomePage")
  const tTestimonials = useTranslations('Testimonials')
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="border-b sticky top-0 bg-background z-10 p-2">
        <div className="container flex h-16 items-center justify-between xl:max-w-5xl 2xl:max-w-[1400px] mx-auto">
          <div className="flex items-center gap-2">
            <Image src="/icons/BAHTRAKU_logo.png" width={150} height={150} alt="BAHTRAKU Logo" />
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium hover:underline hover:text-orange-500 underline-offset-4">
              {tHomePage("home")}
            </Link>
            <Link href="#about" className="text-sm font-medium hover:underline hover:text-orange-500 underline-offset-4">
              {tHomePage("about")}
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:underline hover:text-orange-500 underline-offset-4">
              {tHomePage("testimonials")}
            </Link>
          </nav>
          <div className="flex items-center gap-2 ">
            <LanguageSwitcher />
            <Button asChild className="hidden sm:flex bg-orange-400 hover:bg-slate-200 hover:text-orange-400">
              <Link href="#donate">{tHomePage("donate")}</Link>
            </Button>
            <MobileNav />
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-10 md:py-10 lg:py-10 ">
          <div className="container px-4 md:px-6 xl:max-w-7xl 2xl:max-w-[1400px] mx-auto">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16 2xl:gap-20 items-center">
              <div className="space-y-4">
                <h1 className="text-balance text-3xl md:text-3xl lg:text-4xl xl:text-5xl  font-bold text-[#086ec5]">
                  {tHomePage("mission")}
                </h1>
                <p className="text-muted-foreground text-base md:text-xl xl:text-xl max-w-3xl">{tHomePage("missionText")}</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    size="lg"
                    asChild
                    className="w-full sm:w-auto bg-orange-400 hover:bg-slate-200 hover:text-orange-500"
                  >
                    <Link href="#donate">
                      {tHomePage("donate")} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
                    <Link href="#about"> {tHomePage("learnMore")}</Link>
                  </Button>
                </div>
              </div>
              <div className=" relative aspect-video overflow-hidden rounded-lg mt-6 lg:mt-0">
                <Image src="/3.png" width={900} height={900} alt="Picture of the author" />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-10 md:py-12 bg-orange-50">
          <div className="container px-4 md:px-6 xl:max-w-7xl 2xl:max-w-[1400px] mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 xl:gap-12 2xl:gap-16 text-center">
              <ImpactCounter
                value={141}
                label={tHomePage("bibleTranslationProjects")}
                icon={<BookMarked className="h-5 md:h-6 w-5 md:w-6" />}
              />
              <ImpactCounter
                value={43}
                label={tHomePage("newTestamentTranslations")}
                icon={<BookOpen className="h-5 md:h-6 w-5 md:w-6" />}
              />
              <ImpactCounter
                value={2}
                label={tHomePage("oldTestamentTranslations")}
                icon={<BookOpen className="h-5 md:h-6 w-5 md:w-6" />}
              />
              <ImpactCounter
                value={17}
                label={tHomePage("printedTrialEditions")}
                icon={<PrinterCheck className="h-5 md:h-6 w-5 md:w-6" />}
              />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-10 md:py-16 lg:py-20 scroll-mt-16">
          <div className="container px-4 md:px-6 xl:max-w-7xl 2xl:max-w-[1400px] mx-auto">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16 2xl:gap-20 items-center">
              <div className="space-y-4 order-2 lg:order-1">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tighter">{tHomePage("ourMissionTitle")}</h2>
                <p className="text-muted-foreground text-justify">
                {tHomePage("ourMissionDescription1")}
                </p>
                <p className="text-muted-foreground text-justify">
                {tHomePage("ourMissionDescription2")}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 order-1 lg:order-2 rounded-xl">
                <Image src="/2.png" width={900} height={900} alt="Picture of the author" />
                <Image src="/1.png" width={900} height={900} alt="Picture of the author" />
              </div>
            </div>
          </div>
        </section>

        {/* Donation Section */}
        <section id="donate" className="py-12 bg-orange-50 scroll-mt-16">
          <div className="container px-4 md:px-6 xl:max-w-7xl 2xl:max-w-[1400px] mx-auto">
            <UnifiedDonationForm />
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-8 md:py-8 lg:py-12 scroll-mt-10">
          <div className="container px-4 md:px-6 xl:max-w-7xl 2xl:max-w-[1400px] mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-blue-500 tracking-tighter mb-4">{tTestimonials('title')}</h2>
              <h4 className="text-muted-foreground md:text-nowrap">
               {tTestimonials('description')}
              </h4>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8 2xl:gap-10">
              <TestimonialCard
                id="kemtuik"
                quote={tTestimonials('kemtuikQuote')}
                language="Kemtuik"
              />
              <TestimonialCard
                id="suku-laut"
                quote={tTestimonials('sukuLautQuote')}
                language="Suku Laut"
              />
              <TestimonialCard
                id="bakati-rara"
                quote={tTestimonials('bakatiRaraQuote')}
                language="Bakati Rara"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16 lg:py-24 bg-blue-400 text-primary-foreground">
          <div className="container px-4 md:px-6 xl:max-w-7xl 2xl:max-w-[1400px] mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-4">Join Our Mission Today</h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-6 md:mb-8">
              Your gift, no matter the size, helps bring God's Word to people who have never had Scripture in their
              heart language.
            </p>
            <Button size="lg" variant="secondary" asChild className="w-full sm:w-auto">
              <Link href="#donate">
                Become a Translation Partner <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 md:py-0">
        <div className="container px-4 md:px-6 xl:max-w-7xl 2xl:max-w-[1400px] mx-auto">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 xl:gap-12 2xl:gap-16 md:py-12">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {/* <BookOpen className="h-6 w-6 text-primary" /> */}
                <span className="text-xl font-bold text-orange-400">BAHTRAKU</span>
              </div>
              <p className="text-sm text-muted-foreground">Acceleration of transformation</p>
            </div>
            <div className="space-y-3 col-span-2">
              <h4 className="text-md font-medium text-orange-400">BAHTRAKU Registered In:</h4>
              <ul className="space-y-2">
                <li className="text-sm text-muted-foreground hover:text-foreground">
                  Indonesia Ministry of Law and Human Rights No. AHU-0034498.AH.01.12 (2022)
                </li>
                <li className="text-sm text-muted-foreground hover:text-foreground">
                  Indonesia Ministry of Religious Affairs, Director General for Guidance of the Christian Community
                  Letter No. 363 (2023)
                </li>
                <li className="text-sm text-muted-foreground hover:text-foreground">
                  Fellowship of Indonesian Evangelical Churches and Institutions (Persekutuan Gereja dan Lembaga Injili
                  Indonesia / PGLII)
                </li>
                <li className="text-sm text-muted-foreground hover:text-foreground">
                  Registered Member of the Indonesian Christian Council for Stewardship & Accountability (ICCSA) since
                  2023
                </li>
                <li className="text-sm text-muted-foreground hover:text-foreground">
                  Associate Member of Asia Evangelical Alliance
                </li>
              </ul>
            </div>
            <div className="space-y-3 ">
              <h4 className="text-sm font-medium">Connect With Us</h4>
              <ul className="">
                <li className="flex flex-row text-sm text-muted-foreground hover:text-foreground">
                  <Instagram className="h-6 mr-2" />
                  <span>bahtraku</span>
                </li>
                <li className="flex flex-row text-sm text-muted-foreground hover:text-foreground">
                  <Youtube className="h-6 mr-2" />
                  <span>a ministry of bahtraku</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t md:flex md:flex-col-2 p-4 justify-center items-center text-center text-sm text-orange-400">
            <div className="mr-2">
              {" "}
              <Link href="/privacy-policy" className="hover:underline">
                Privacy Policy
              </Link>
            </div>
            <div> &copy; {new Date().getFullYear()} BAHTRAKU. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}

