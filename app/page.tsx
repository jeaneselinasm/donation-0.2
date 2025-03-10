import Link from "next/link"
import { ArrowRight, BookOpen, Globe, Heart, Users } from 'lucide-react'
import { Button } from "@/components/ui/button"
import DonationCard from "@/components/donation-card"
import TestimonialCard from "@/components/testimonial-card"
import ImpactCounter from "@/components/impact-counter"
import MobileNav from "@/components/mobile-nav"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="border-b sticky top-0 bg-background z-10">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">WordReach</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">
              Home
            </Link>
            <Link href="#about" className="text-sm font-medium hover:underline underline-offset-4">
              About
            </Link>
            <Link href="#impact" className="text-sm font-medium hover:underline underline-offset-4">
              Our Impact
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:underline underline-offset-4">
              Testimonials
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild className="hidden sm:flex">
              <Link href="#donate">Donate Now</Link>
            </Button>
            <MobileNav />
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-20 lg:py-28 bg-gradient-to-b from-primary/10 to-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">
                  Bringing God's Word to Every Language
                </h1>
                <p className="text-muted-foreground text-base md:text-xl">
                  Join our mission to translate the Bible into every language, reaching communities that have never had
                  Scripture in their heart language.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button size="lg" asChild className="w-full sm:w-auto">
                    <Link href="#donate">
                      Donate Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
                    <Link href="#about">Learn More</Link>
                  </Button>
                </div>
              </div>
              <div className="relative aspect-video overflow-hidden rounded-lg mt-6 lg:mt-0">
                <img
                  src="/placeholder.svg?height=720&width=1280"
                  alt="Translators working with community members"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-10 md:py-12 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
              <ImpactCounter
                value={2000}
                label="Languages Still Need Translation"
                icon={<Globe className="h-5 md:h-6 w-5 md:w-6" />}
              />
              <ImpactCounter 
                value={500} 
                label="Active Translation Projects" 
                icon={<BookOpen className="h-5 md:h-6 w-5 md:w-6" />} 
              />
              <ImpactCounter 
                value={350} 
                label="Communities Reached" 
                icon={<Users className="h-5 md:h-6 w-5 md:w-6" />} 
              />
              <ImpactCounter 
                value={10000} 
                label="Monthly Donors" 
                icon={<Heart className="h-5 md:h-6 w-5 md:w-6" />} 
              />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-12 md:py-16 lg:py-24 scroll-mt-16">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4 order-2 lg:order-1">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tighter">Our Mission</h2>
                <p className="text-muted-foreground">
                  We believe everyone should have access to God's Word in their heart language. Our translators work
                  alongside local communities to create accurate, culturally relevant translations of the Bible.
                </p>
                <p className="text-muted-foreground">
                  With your support, we can accelerate Bible translation projects worldwide, bringing Scripture to
                  communities that have waited generations for God's Word in their language.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 order-1 lg:order-2">
                <img
                  src="/placeholder.svg?height=400&width=300"
                  alt="Translator working with community members"
                  className="rounded-lg object-cover w-full h-full"
                />
                <img
                  src="/placeholder.svg?height=400&width=300"
                  alt="New Testament dedication ceremony"
                  className="rounded-lg object-cover w-full h-full hidden sm:block"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Donation Section */}
        <section id="donate" className="py-12 md:py-16 lg:py-24 bg-primary/5 scroll-mt-16">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-4">Support Bible Translation</h2>
              <p className="text-muted-foreground">
                Your gift helps bring God's Word to people in their heart language. Choose how you'd like to give below.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <DonationCard
                title="One-Time Gift"
                description="Make an immediate impact with a one-time donation to Bible translation projects."
                amounts={[50, 100, 250, 500]}
                buttonText="Donate Now"
              />
              <DonationCard
                title="Monthly Partner"
                description="Join our community of monthly supporters providing sustainable funding for translations."
                amounts={[25, 50, 100, 200]}
                buttonText="Become a Partner"
                highlighted={true}
              />
              <DonationCard
                title="Sponsor a Project"
                description="Fund a specific language project and receive updates on its progress."
                amounts={[1000, 2500, 5000, 10000]}
                buttonText="Sponsor Now"
                className="sm:col-span-2 lg:col-span-1"
              />
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section id="impact" className="py-12 md:py-16 lg:py-24 scroll-mt-16">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-4">Your Impact</h2>
              <p className="text-muted-foreground">
                See how your donations transform lives by bringing God's Word to communities around the world.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
                <img
                  src="/placeholder.svg?height=300&width=500"
                  alt="Community Bible study"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-bold mb-2">Community Transformation</h3>
                  <p className="text-muted-foreground text-sm md:text-base">
                    When people receive Scripture in their heart language, entire communities are transformed through
                    God's Word.
                  </p>
                </div>
              </div>

              <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
                <img
                  src="/placeholder.svg?height=300&width=500"
                  alt="Literacy class"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-bold mb-2">Literacy Development</h3>
                  <p className="text-muted-foreground text-sm md:text-base">
                    Bible translation projects often include literacy programs, helping people read and write in their
                    own language.
                  </p>
                </div>
              </div>

              <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
                <img
                  src="/placeholder.svg?height=300&width=500"
                  alt="Digital Scripture access"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-bold mb-2">Digital Access</h3>
                  <p className="text-muted-foreground text-sm md:text-base">
                    Your support helps create digital Scripture resources, making God's Word accessible on phones and
                    devices worldwide.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-12 md:py-16 lg:py-24 bg-muted scroll-mt-16">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-4">Testimonials</h2>
              <p className="text-muted-foreground">
                Hear from those whose lives have been changed by receiving God's Word in their heart language.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <TestimonialCard
                quote="For the first time, I can understand God's promises in my own language. It's like He is speaking directly to me."
                name="Maria"
                location="Guatemala"
                imageSrc="/placeholder.svg?height=200&width=200"
              />
              <TestimonialCard
                quote="Our church has grown so much since we received the New Testament in our language. People are hungry for God's Word."
                name="Pastor Thomas"
                location="Papua New Guinea"
                imageSrc="/placeholder.svg?height=200&width=200"
              />
              <TestimonialCard
                quote="I've been a monthly donor for 5 years. The updates I receive about how my giving impacts communities brings me so much joy."
                name="Sarah"
                location="United States"
                imageSrc="/placeholder.svg?height=200&width=200"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16 lg:py-24 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6 text-center">
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
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 md:py-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">WordReach</span>
              </div>
              <p className="text-sm text-muted-foreground">Bringing God's Word to every language since 1985.</p>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#about" className="text-sm text-muted-foreground hover:text-foreground">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#donate" className="text-sm text-muted-foreground hover:text-foreground">
                    Ways to Give
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Prayer Requests
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Volunteer
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Annual Report
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Financial Accountability
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Translation Progress
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Contact</h4>
              <ul className="space-y-2">
                <li className="text-sm text-muted-foreground">123 Translation Way</li>
                <li className="text-sm text-muted-foreground">Dallas, TX 75001</li>
                <li className="text-sm text-muted-foreground">info@wordreach.org</li>
                <li className="text-sm text-muted-foreground">(555) 123-4567</li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-6 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} WordReach Bible Translation. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
