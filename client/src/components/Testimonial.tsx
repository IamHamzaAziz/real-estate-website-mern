import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Quote } from "lucide-react"

const testimonials = [
    {
        name: "Sarah Johnson",
        designation: "CEO, TechCorp",
        content: "This product has revolutionized our workflow. It's intuitive, powerful, and has saved us countless hours.",
        avatar: "https://images.pexels.com/photos/11452464/pexels-photo-11452464.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
        name: "Michael Chen",
        designation: "Lead Developer, InnoSoft",
        content: "I've never seen a tool so well-designed. It's a game-changer for our development team.",
        avatar: "https://images.pexels.com/photos/3389111/pexels-photo-3389111.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
        name: "Emily Rodriguez",
        designation: "Marketing Director, BrandBurst",
        content: "The analytics features are outstanding. We've gained invaluable insights that have boosted our campaigns significantly.",
        avatar: "https://images.pexels.com/photos/12472870/pexels-photo-12472870.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
]

export default function TestimonialCarousel() {
    return (
        <Carousel className="w-full max-w-xs sm:max-w-sm md:max-w-xl lg:max-w-xl xl:max-w-xl mx-auto">
            <CarouselContent>
                {testimonials.map((testimonial, index) => (
                    <CarouselItem key={index}>
                        <Card className="bg-primary/5 border-none">
                            <CardContent className="flex flex-col items-center justify-center p-6">
                                <Quote className="text-primary w-12 h-12 mb-4" />
                                <p className="text-center mb-4 italic text-muted-foreground">
                                    "{testimonial.content}"
                                </p>
                                <div className="flex items-center space-x-4">
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                                        <img
                                            src={testimonial.avatar}
                                            alt={testimonial.name}
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">{testimonial.name}</h3>
                                        <p className="text-sm text-muted-foreground">{testimonial.designation}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}