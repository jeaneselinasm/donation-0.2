import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function PrivacyPolicy() {
  const tPrivacyPolicy = useTranslations("PrivacyPolicy");
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {tPrivacyPolicy("backButton")}
        </Link>
      </Button>

      <h1 className="text-3xl font-bold mb-6 text-orange-400">
        {" "}
        {tPrivacyPolicy("title")}{" "}
      </h1>

      <div className="space-y-6">
        <section>
          <p className="text-justify">
            {" "}
            {tPrivacyPolicy("description")} information@bahtraku.org
          </p>
        </section>
      </div>
    </div>
  );
}
