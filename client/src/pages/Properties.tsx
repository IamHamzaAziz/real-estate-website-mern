import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, HomeIcon, MapPinIcon } from "lucide-react"

// Sample data
const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"]
const propertyTypes = ["Apartment", "House", "Villa"]

const sampleProperties = [
    {
        id: 1,
        city: "New York",
        area: 25,
        photo: "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        propertyType: "Apartment",
        dealerName: "John Doe",
        price: 500000,
        location: "Manhattan",
        datePosted: "2023-05-15",
    },
    {
        id: 2,
        city: "Los Angeles",
        area: 35,
        photo: "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        propertyType: "House",
        dealerName: "Jane Smith",
        price: 750000,
        location: "Beverly Hills",
        datePosted: "2023-05-10",
    },
    {
        id: 2,
        city: "Los Angeles",
        area: 35,
        photo: "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        propertyType: "House",
        dealerName: "Jane Smith",
        price: 750000,
        location: "Beverly Hills",
        datePosted: "2023-05-10",
    },
    {
        id: 2,
        city: "Los Angeles",
        area: 35,
        photo: "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        propertyType: "House",
        dealerName: "Jane Smith",
        price: 750000,
        location: "Beverly Hills",
        datePosted: "2023-05-10",
    },
    {
        id: 2,
        city: "Los Angeles",
        area: 35,
        photo: "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        propertyType: "House",
        dealerName: "Jane Smith",
        price: 750000,
        location: "Beverly Hills",
        datePosted: "2023-05-10",
    },
    {
        id: 2,
        city: "Los Angeles",
        area: 35,
        photo: "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        propertyType: "House",
        dealerName: "Jane Smith",
        price: 750000,
        location: "Beverly Hills",
        datePosted: "2023-05-10",
    },
    {
        id: 2,
        city: "Los Angeles",
        area: 35,
        photo: "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        propertyType: "House",
        dealerName: "Jane Smith",
        price: 750000,
        location: "Beverly Hills",
        datePosted: "2023-05-10",
    },
    {
        id: 2,
        city: "Los Angeles",
        area: 35,
        photo: "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        propertyType: "House",
        dealerName: "Jane Smith",
        price: 750000,
        location: "Beverly Hills",
        datePosted: "2023-05-10",
    },
    {
        id: 2,
        city: "Los Angeles",
        area: 35,
        photo: "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        propertyType: "House",
        dealerName: "Jane Smith",
        price: 750000,
        location: "Beverly Hills",
        datePosted: "2023-05-10",
    },
    {
        id: 2,
        city: "Los Angeles",
        area: 35,
        photo: "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        propertyType: "House",
        dealerName: "Jane Smith",
        price: 750000,
        location: "Beverly Hills",
        datePosted: "2023-05-10",
    },
]

export default function Properties() {
    const [filters, setFilters] = useState({
        city: "",
        propertyType: "",
        area: "",
        dealer: "",
        price: "",
    })

    const handleFilterChange = (key: string, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }))
    }

    const handleFilterSubmit = () => {
        // Here you would typically send a request to your backend with the filters
        console.log("Filtering with:", filters)
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Real Estate Properties</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div>
                    <Label htmlFor="city">City</Label>
                    <Select onValueChange={(value) => handleFilterChange("city", value)}>
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
                    <Select onValueChange={(value) => handleFilterChange("propertyType", value)}>
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

            <Button onClick={handleFilterSubmit} className="mb-8 bg-p1 hover:bg-p2">
                Apply Filters
            </Button>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sampleProperties.map((property) => (
                    <Card key={property.id}>
                        <CardHeader>
                            <CardTitle>{property.propertyType} in {property.city}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <img
                                src={property.photo}
                                alt={`${property.propertyType} in ${property.city}`}
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
                                    <span>Posted on {property.datePosted}</span>
                                </div>
                                <div>
                                    <strong>Price:</strong> ${property.price.toLocaleString()}
                                </div>
                                <div>
                                    <strong>Dealer:</strong> {property.dealerName}
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full bg-p1 hover:bg-p2">View Details</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}