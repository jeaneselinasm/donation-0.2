import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import Link from "next/link";
import { useTranslations, useLocale } from "use-intl";
interface TestimonialCardProps {
  id: string;
  quote: string;
  language: string;
}

export default function TestimonialCard({
  id,
  quote,
  language,
}: TestimonialCardProps) {
  const locale = useLocale(); // ✅ Get the current locale
  const tTestimonials = useTranslations("Testimonials");
  return (
    <Card className="h-full">
      <CardContent className="p-6 flex flex-col h-full">
        <Quote className="h-8 w-8 mb-4 text-orange-400" />
        <p className="text-muted-foreground flex-1 mb-6 text-justify text-wrap">
          &rdquo;{quote}&rdquo;
        </p>

        <div className="flex flex-row justify-between">
          <Badge variant="secondary" className="text-sm text-orange-400 bg-orange-50">
            {locale === "id" ? (
              <>
                {tTestimonials("language")} {language}
              </>
            ) : (
              <>
                {language} {tTestimonials("language")}
              </>
            )}
          </Badge>
          <Button asChild className="mt-auto bg-blue-500 hover:bg-blue-700">
            <Link href={`/${locale}/testimonials/${id}`}>
              {tTestimonials("readFullStory")}
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
