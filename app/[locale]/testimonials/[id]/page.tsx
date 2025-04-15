import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

// This would typically come from a database or API

// ✅ Define the expected TypeScript type for `params`
// interface PageParams {
//   id: string;
//   locale: string;
// }
const testimonials = [
  {
    id: "kemtuik",
    language: "Kemtuik",
    location: "Papua, Indonesia",
    shortQuote:
      "In my deepest grief, I turned away from God, but through His Word, He called me back. 1 Samuel 2:6 reminded me that life is in His hands. Now, I translate not just words, but a message that strengthens and transforms lives. God is faithful—He never abandons us.",
    fullStory: `In December, while translating the book of Exodus, a deeply painful event struck my life. On December 27, my only child passed away. This loss plunged me into profound grief, filling my heart with anger and a desperate desire to find out who was responsible for my child’s death. In my despair, I sought out shamans to take revenge, but strangely, I couldn’t find a single one.

I returned home with an even harder heart, feeling disappointed in God. Why would He take my child while I was working on translating His Word? I was so hurt and angry that I decided to stop praying, stop reading the Bible, and close my heart to God. By the end of December, I had resolved to walk away from Bible translation altogether.

However, at the end of February, God worked in an unexpected way. The translation team reached out to me, asking me to return. My heart, beginning to soften, led me to accept their invitation and resume my work. This time, I started translating 1 Samuel. Through this book, God spoke to me through the lives of David and Hannah. I saw how David endured great trials with patience and unwavering faith, and I learned from Hannah, a woman who remained steadfast in prayer despite her long suffering.

When I reached 1 Samuel 2:6—"The Lord brings death and makes alive; He brings down to the grave and raises up"—I was deeply moved. This verse gave me new strength, reminding me that life is entirely in God’s hands. I began to accept my loss with faith and found renewed passion to continue translating the Bible into my mother tongue.

I cannot imagine where I would be if I had continued to shut my heart and walk away from this calling. I now believe that God’s Word is not just meant to be translated—it is meant to strengthen and transform our lives. Through this experience, I want to encourage all Bible translators to remain faithful in this work. There may be challenges, there may be tears, but God will bless us through this ministry.

May this testimony be a blessing to future generations and strengthen those who are struggling. God is faithful, and He never abandons us.`,
  },
  {
    id: "suku-laut",
    language: "Suku Laut",
    location: "Riau",
    shortQuote:
      "I was torn between fishing to provide for my family or joining Bible translation training. Praise God, I chose to translate His Word into the Suku Laut language. For the first time, I read the Bible in my own language—and I was one of those who translated it. It filled my heart with joy!",
    fullStory: `When I was invited to become a translator, I initially felt fear and hesitation about joining the team.

At that time, it was the fishing season, and I was torn between providing for my family by casting my nets or attending this translation training and setting aside my family's needs. But praise God, I am grateful that I made the decision to be part of translating the Bible into the Suku Laut language.

I had never read the Bible in my mother tongue before. But when we, the translators, completed translating a few verses of God’s Word into Suku Laut, I read them, and a deep joy filled my heart. It was the first time I read the Bible in my own language—and I was one of those who helped translate it.`,
  },
  {
    id: "bakati-rara",
    language: "Bakati Rara",
    location: "Kalimantan",
    shortQuote:
      "A historic moment for the Bakati’ Rara people! After dedicated efforts since February 2023, the New Testament was completed by August 2024. The launch at GKKI Bukit Sion Church was special—the first worship service entirely in Bakati’ Rara, proving the Bible’s deep impact on faith and culture.",
    fullStory: `The launch of the Bible in the Bakati' Rara language was a truly historic moment and the result of much hard work and dedication from the language group. Starting with training in February 2023, they were able to complete the New Testament translation by August 2024. The event, held at GKKI Bukit Sion Church, was very meaningful because it was the first time that the entire worship service, including songs and Bible readings, was done completely in Bekati Rara. This shows how important local languages are in faith practices and how the Bible can become a valuable heritage for future generations.

The journey to achieve this was not easy. There were many challenges, like a broken generator and limited electricity from solar panels. Some participants even had to travel to Bengkayang to type the handwritten translations. Still, the group stayed motivated, supported by Rev. Darwis, who leads this farming community. During the Christmas celebration, we were honored to give 30 copies of the first printed Bible to the group, showing the importance of preserving local languages in church activities.

This launch is an inspiration for other language groups in West Kalimantan. It also reminds us of the need for strong partnerships to give full support to communities like this. We hope the Bakati' Rara team will continue to revise the Bible, so the results can be even better and more useful for their community. May the Lord Jesus bless this work.`,
  },
];

export default async function TestimonialPage({ params }) {
  const { id, locale } = await params;
  const tTestimonials = await getTranslations("Testimonials");
  const testimonial = testimonials.find((t) => t.id === id);
  const quoteKey = `${id}Quote`;
  const fullStoryKey = `${id}FullStory`;
  const quote = tTestimonials(quoteKey);
  const fullStory = tTestimonials(fullStoryKey);
  if (!testimonial || !quote || !fullStory) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/#testimonials">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {tTestimonials("back")}
        </Link>
      </Button>

      <div className="space-y-6">
        <div className="bg-muted p-6 rounded-lg">
          <h1 className="text-2xl font-bold mb-2 text-blue-500">
            {tTestimonials("titlePage")}{" "}
            {locale === "id" ? (
              <>
                {tTestimonials("language")} {testimonial.language}
              </>
            ) : (
              <>
                {testimonial.language} {tTestimonials("language")}
              </>
            )}
          </h1>
          <p className="text-muted-foreground">
            {tTestimonials("location")}: {testimonial.location}
          </p>
        </div>

        <blockquote className="text-xl italic border-l-4 border-primary pl-4 py-2">
          {quote}
        </blockquote>

        <div className="space-y-4 text-justify">
          {fullStory
            .replace(/\\n/g, "\n") // ✅ Convert escaped `\n` back to actual new lines
            .split("\n\n") // ✅ Now it can split properly
            .map((paragraph, index) => (
              <p key={index} className="text-muted-foreground">
                {paragraph}
              </p>
            ))}
        </div>
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-xl md:text-2xl font-bold mb-4">{tTestimonials('inspired')} </h2>
        <p className="mb-6">
          {tTestimonials('support')}
        </p>
        <Button asChild size="lg" className="bg-orange-400 hover:bg-orange-500">
          <Link href="/#donate">{tTestimonials('donation')}</Link>
        </Button>
      </div>
    </div>
  );
}
