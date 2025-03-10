import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Quote } from "lucide-react"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"

interface TestimonialCardProps {
  quote: string
  language: string
}

export default function TestimonialCard({ quote, language }: TestimonialCardProps) {
  return (
    <Card className="h-full">
      <CardContent className="p-6 flex flex-col h-full">
        <Quote className="h-8 w-8 text-primary/40 mb-4" />
        <p className="text-muted-foreground flex-1 mb-6 text-justify">&rdquo;{quote}&rdquo;</p>
        
        <div className="flex flex-row justify-between">
        <Badge variant="outline">language : {language}</Badge>
        <Button>Read More</Button>
        
        {/* <Avatar>
            <AvatarImage src={imageSrc} alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{name}</p>
            <p className="text-sm text-muted-foreground">{location}</p>
          </div> */}
        </div>
      </CardContent>
    </Card>
  )
}

