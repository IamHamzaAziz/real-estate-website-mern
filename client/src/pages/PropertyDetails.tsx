import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Building2, CalendarDays, Mail, MapPin, Ruler, MessageCircle } from "lucide-react"
import useEmblaCarousel from 'embla-carousel-react'
import { useParams } from "react-router-dom"
import axios from "axios"

interface Property {
    title: string,
    price: number,
    area: number,
    location: string,
    city: string,
    type: string,
    description: string,
    thumbnail: string,
    propertyPhotos: string[],
    whatsapp: string,
    email: string,
    createdAt: Date,
}

const PropertyDetails = () => {
    const { slug } = useParams()

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

    const [property, setProperty] = useState<Property>()

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    useEffect(() => {
        fetchProperty()
    }, [])

    async function fetchProperty() {
        await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/property/get-property/${slug}`)
            .then(response => {
                if (response.status === 200) {
                    setProperty(response.data)
                    console.log(response.data)
                }
            })
            .catch(error => console.error(error))
    }


    useEffect(() => {
        if (emblaApi) {
            const intervalId = setInterval(() => {
                scrollNext()
            }, 5000)

            return () => clearInterval(intervalId)
        }
    }, [emblaApi, scrollNext])


    return (
        <div className="container mx-auto px-10 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="w-full">
                    <div className="w-full max-w-xl mx-auto">
                        <div className="overflow-hidden w-full" ref={emblaRef}>
                            <div className="flex">
                                {property?.thumbnail && (
                                    <div className="flex-[0_0_100%] min-w-0">
                                        <img
                                            src={property.thumbnail}
                                            alt="Property thumbnail"
                                            className="w-full h-[400px] md:h-[500px] rounded-lg"
                                        />
                                    </div>
                                )}

                                {property?.propertyPhotos.map((image, index) => (
                                    <div className="flex-[0_0_100%] min-w-0" key={index}>
                                        <img
                                            src={image}
                                            alt={`Property image ${index + 1}`}
                                            className="w-full h-[400px] md:h-[500px] rounded-lg"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h1 className="text-3xl font-bold mb-4">{property?.title}</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <Card>
                            <CardContent className="flex items-center p-4">
                                <Building2 className="w-6 h-6 mr-2 text-primary" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Property Type</p>
                                    <p className="font-semibold">{property?.type}</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="flex items-center p-4">
                                <Ruler className="w-6 h-6 mr-2 text-primary" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Area</p>
                                    <p className="font-semibold">{property?.area} m²</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="flex items-center p-4">
                                <MapPin className="w-6 h-6 mr-2 text-primary" />
                                <div>
                                    <p className="text-sm text-muted-foreground">City</p>
                                    <p className="font-semibold">{property?.city}</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="flex items-center p-4">
                                <CalendarDays className="w-6 h-6 mr-2 text-primary" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Posted</p>
                                    <p className="font-semibold">
                                        {new Date(property?.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold mb-2">Price</h2>
                        <p className="text-3xl font-bold text-primary">
                            ${property?.price.toLocaleString()}
                        </p>
                    </div>
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold mb-2">Location</h2>
                        <p className="text-lg">{property?.location}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <Button className="w-full">
                            <MessageCircle className="w-5 h-5 mr-2" />
                            <a href={`https://wa.me/${property?.whatsapp}`} target="_blank" rel="noopener noreferrer">
                                Contact via WhatsApp
                            </a>
                        </Button>
                        <Button className="w-full" variant="outline">
                            <Mail className="w-5 h-5 mr-2" />
                            <a href={`mailto:${property?.email}`}>Contact via Email</a>
                        </Button>
                    </div>
                </div>
            </div>
            <div className="mt-8">
                <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: property?.description }}
                />
            </div>
        </div>
    )
}

export default PropertyDetails