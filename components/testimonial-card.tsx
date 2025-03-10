import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Quote } from "lucide-react"

interface TestimonialCardProps {
  quote: string
  name: string
  location: string
  imageSrc: string
}

export default function TestimonialCard({ quote, name, location, imageSrc }: TestimonialCardProps) {
  return (
    <Card className="h-full">
      <CardContent className="p-6 flex flex-col h-full">
        <Quote className="h-8 w-8 text-primary/40 mb-4" />
        <p className="text-muted-foreground flex-1 mb-6">&rdquo;{quote}&rdquo;</p>
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={imageSrc} alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{name}</p>
            <p className="text-sm text-muted-foreground">{location}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

