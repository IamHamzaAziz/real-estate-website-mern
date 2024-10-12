import { useState, useEffect, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { HomeIcon, MapPinIcon, CalendarIcon } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";
import ContentLoader from "@/components/ContentLoader";
import { UserContext } from "@/context/UserContext";

interface Property {
    _id: string;
    title: string;
    slug: string;
    price: number;
    area: number;
    location: string;
    city: string;
    type: string;
    createdAt: Date;
    thumbnail: string;
}

export default function SavedProperties() {
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);

    const { userInfo } = useContext(UserContext)

    const userId = userInfo ? userInfo._id : null

    useEffect(() => {
        if (userId) {
            fetchSavedProperties(); // Only fetch if userId exists
        }
    }, [userId]);

    const fetchSavedProperties = async () => {
        if (!userId) return

        await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/user/saved-properties`, { params: { userId }, withCredentials: true })
            .then(response => {
                if (response.status === 200) {
                    setProperties(response.data)
                }
            })
            .catch(error => console.error(error))
            .finally(() => {
                setLoading(false);
            });
    };

    if (loading) {
        return <ContentLoader />;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Saved Properties</h1>

            {properties.length === 0 ? (
                <div className="text-center mt-8">
                    <p>No saved properties found.</p>
                </div>
            ) : (
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
                                        <span className="font-bold">{property.title}</span>
                                    </div>
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
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Link to={`/property/${property.slug}`}>
                                    <Button className="w-full bg-p1 hover:bg-p2">View Details</Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
