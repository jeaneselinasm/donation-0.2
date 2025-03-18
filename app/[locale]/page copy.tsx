import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  const t = useTranslations('HomePage');

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b sticky top-0 bg-background z-10 p-2">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/icons/BAHTRAKU_logo.png"
              width={150}
              height={150}
              alt="BAHTRAKU Logo"
            />
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium hover:underline hover:text-orange-500">
              {t("home")}
              aa
            </Link>
            <Link href="#about" className="text-sm font-medium hover:underline">
              {t("about")}
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:underline">
              {t("testimonials")}
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild className="hidden sm:flex bg-orange-400 hover:bg-slate-200 hover:text-orange-400">
              <Link href="#donate">{t("donate")}</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-10 md:py-10 lg:py-10">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-400 tracking-tighter">
                  {t("mission")}
                </h1>
                <p className="text-muted-foreground text-base md:text-xl">
                  {t("missionText")}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button size="lg" asChild className="w-full sm:w-auto bg-orange-400 hover:bg-slate-200">
                    <Link href="#donate">
                      {t("donate")} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
                    <Link href="#about">{t("learnMore")}</Link>
                  </Button>
                </div>
              </div>
              <div className="relative aspect-video overflow-hidden rounded-lg mt-6 lg:mt-0">
                <Image src="/3.png" width={900} height={900} alt="Mission Image" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
