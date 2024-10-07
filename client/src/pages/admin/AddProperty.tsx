import { useState, ChangeEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { X } from "lucide-react"

const modules = {
    toolbar: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['link', 'image']
    ],
    clipboard: {
        matchVisual: false
    }
}

const formats = [
    'header',
    'bold', 'italic', 'underline', 'blockquote',
    'list', 'bullet',
    'link', 'image'
]

const AddProperty = () => {
    const [formData, setFormData] = useState({
        title: "",
        price: "",
        area: "",
        location: "",
        city: "",
        description: "",
        whatsapp: "",
        email: "",
    })
    const [thumbnail, setThumbnail] = useState<File | null>(null)
    const [propertyPhotos, setPropertyPhotos] = useState<File[]>([])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setThumbnail(e.target.files[0])
        }
    }

    const handlePropertyPhotosChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setPropertyPhotos((prev) => [...prev, ...Array.from(e.target.files || [])])
        }
    }

    const removeThumbnail = () => {
        setThumbnail(null)
    }

    const removePropertyPhoto = (index: number) => {
        setPropertyPhotos((prev) => prev.filter((_, i) => i !== index))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Implement your form submission logic here
        console.log("Form submitted:", { ...formData, thumbnail, propertyPhotos })
    }


    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Add New Property</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" name="title" value={formData.title} onChange={handleInputChange} required />
                    </div>
                    <div>
                        <Label htmlFor="price">Price</Label>
                        <Input id="price" name="price" type="number" value={formData.price} onChange={handleInputChange} required />
                    </div>
                    <div>
                        <Label htmlFor="area">Area (sqm)</Label>
                        <Input id="area" name="area" type="number" value={formData.area} onChange={handleInputChange} required />
                    </div>
                    <div>
                        <Label htmlFor="city">City</Label>
                        <Input id="city" name="city" value={formData.city} onChange={handleInputChange} required />
                    </div>
                    <div className="md:col-span-2">
                        <Label htmlFor="location">Complete Location</Label>
                        <Input id="location" name="location" value={formData.location} onChange={handleInputChange} required />
                    </div>
                    <div className="md:col-span-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="whatsapp">WhatsApp Number</Label>
                        <Input id="whatsapp" name="whatsapp" value={formData.whatsapp} onChange={handleInputChange} required />
                    </div>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
                    </div>
                </div>

                <div>
                    <Label htmlFor="thumbnail">Thumbnail Photo</Label>
                    <Input id="thumbnail" type="file" onChange={handleThumbnailChange} accept="image/*" required />
                    {thumbnail && (
                        <Card className="mt-2">
                            <CardContent className="p-2">
                                <div className="relative inline-block">
                                    <img
                                        src={URL.createObjectURL(thumbnail)}
                                        alt="Thumbnail preview"
                                        className="w-32 h-32 object-cover rounded"
                                    />
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="icon"
                                        className="absolute -top-2 -right-2 rounded-full"
                                        onClick={removeThumbnail}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>

                <div>
                    <Label htmlFor="propertyPhotos">Property Photos</Label>
                    <Input id="propertyPhotos" type="file" onChange={handlePropertyPhotosChange} accept="image/*" multiple />
                    {propertyPhotos.length > 0 && (
                        <Card className="mt-2">
                            <CardContent className="p-2">
                                <div className="flex flex-wrap gap-2">
                                    {propertyPhotos.map((photo, index) => (
                                        <div key={index} className="relative">
                                            <img
                                                src={URL.createObjectURL(photo)}
                                                alt={`Property photo ${index + 1}`}
                                                className="w-20 h-20 object-cover rounded"
                                            />
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="icon"
                                                className="absolute -top-2 -right-2 rounded-full"
                                                onClick={() => removePropertyPhoto(index)}
                                            >
                                                <X className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>

                <Button type="submit" className="w-full">Add Property</Button>
            </form>
        </div>
    )
}

export default AddProperty