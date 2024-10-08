import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, HomeIcon, MapPinIcon } from "lucide-react"
import InfiniteScroll from 'react-infinite-scroll-component';
import ContentLoader from "@/components/ContentLoader";
import axios from "axios"

// Sample data
const cities = ["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Peshawar", "Quetta"]
const propertyTypes = ["Apartment", "House", "Villa"]


interface Property {
    _id: string,
    title: string,
    slug: string,
    price: number,
    area: number,
    location: string,
    city: string,
    type: string,
    createdAt: Date,
    thumbnail: string,
}

export default function Properties() {
    const [properties, setProperties] = useState<Property[]>([])

    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchProperties()
    }, [])

    const fetchProperties = async () => {
        axios.get(`${import.meta.env.VITE_SERVER_URL}/api/property/all-properties?page=${page}&limit=6`)
            .then(response => {
                if (response.status === 200) {
                    setProperties([...properties, ...response.data])
                    setHasMore(response.data.length > 0)
                    setPage(page + 1)
                }
            })
    }

    const fetchMoreProperties = () => {
        fetchProperties()
    }

    document.title = "Properties - SkyEstate"

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Real Estate Properties</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div>
                    <Label htmlFor="city">City</Label>
                    <Select>
                        <SelectTrigger id="city">
                            <SelectValue placeholder="Select city" />
                        </SelectTrigger>
                        <SelectContent>
                            {cities.map((city) => (
                                <SelectItem key={city} value={city}>
                                    {city}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Label htmlFor="propertyType">Property Type</Label>
                    <Select>
                        <SelectTrigger id="propertyType">
                            <SelectValue placeholder="Select property type" />
                        </SelectTrigger>
                        <SelectContent>
                            {propertyTypes.map((type) => (
                                <SelectItem key={type} value={type}>
                                    {type}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <Button className="mb-8 bg-p1 hover:bg-p2">
                Apply Filters
            </Button>

            <InfiniteScroll
                dataLength={properties.length}
                next={fetchMoreProperties}
                hasMore={hasMore}
                loader={<ContentLoader />}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {properties.map((property) => (
                        <Card key={property._id}>
                            <CardHeader>
                                <CardTitle>{property.type} in {property.city}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <img
                                    src={property.thumbnail}
                                    alt={`${property.type} in ${property.city}`}
                                    className="w-full h-48 object-cover mb-4 rounded-md"
                                />
                                <div className="space-y-2">
                                    <div className="flex items-center">
                                        <HomeIcon className="w-5 h-5 mr-2" />
                                        <span>{property.area} sq. meters</span>
                                    </div>
                                    <div className="flex items-center">
                                        <MapPinIcon className="w-5 h-5 mr-2" />
                                        <span>{property.location}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <CalendarIcon className="w-5 h-5 mr-2" />
                                        <span>Posted on {new Date(property.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <div>
                                        <strong>Price:</strong> {property.price.toLocaleString()} PKR
                                    </div>
                                    {/* <div>
                                        <strong>Dealer:</strong> {property.dealerName}
                                    </div> */}
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full bg-p1 hover:bg-p2">View Details</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </InfiniteScroll>
        </div>
    )
}