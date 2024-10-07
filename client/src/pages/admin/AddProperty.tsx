import { useState, ChangeEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { X } from "lucide-react"
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { ThreeCircles } from "react-loader-spinner"
import axios from "axios"
import { Bounce, toast, ToastContainer } from "react-toastify"

const modules = {
    toolbar: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['link']
    ],
    clipboard: {
        matchVisual: false
    }
}

const formats = [
    'header',
    'bold', 'italic', 'underline', 'blockquote',
    'list', 'bullet',
    'link'
]

const AddProperty = () => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [area, setArea] = useState("");
    const [location, setLocation] = useState("");
    const [city, setCity] = useState("");
    const [description, setDescription] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    const [email, setEmail] = useState("");

    const [loading, setLoading] = useState(false)

    const [thumbnail, setThumbnail] = useState<File | null>(null)
    const [propertyPhotos, setPropertyPhotos] = useState<File[]>([])

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

    const failure = (message: String) => {
        toast.error(message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
        })
    }

    const success = (message: String) => {
        toast.success(message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        setLoading(true)
    }


    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Add New Property</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" className="border border-gray-400" value={title} onChange={e => setTitle(e.target.value)} required />
                    </div>
                    <div>
                        <Label htmlFor="price">Price</Label>
                        <Input id="price" className="border border-gray-400" type="number" value={price} onChange={e => setPrice(e.target.value)} required />
                    </div>
                    <div>
                        <Label htmlFor="area">Area (sqm)</Label>
                        <Input id="area" className="border border-gray-400" type="number" value={area} onChange={e => setArea(e.target.value)} required />
                    </div>
                    <div>
                        <Label htmlFor="city">City</Label>
                        <Input id="city" className="border border-gray-400" value={city} onChange={e => setCity(e.target.value)} required />
                    </div>
                    <div className="md:col-span-2">
                        <Label htmlFor="location">Complete Location</Label>
                        <Input id="location" className="border border-gray-400" value={location} onChange={e => setLocation(e.target.value)} required />
                    </div>
                    <div className="md:col-span-2">
                        <Label htmlFor="description">Description</Label>
                        <ReactQuill
                            modules={modules}
                            formats={formats}
                            value={description}
                            onChange={(newValue) => setDescription(newValue)}
                            className="border border-gray-400 rounded-lg overflow-hidden"
                        />
                    </div>
                    <div>
                        <Label htmlFor="whatsapp">WhatsApp Number</Label>
                        <Input id="whatsapp" className="border border-gray-400" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} required />
                    </div>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" className="border border-gray-400" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
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

                <Button type={loading ? "button" : "submit"} className="w-full bg-p1 hover:bg-p2">
                    {
                        loading ? (
                            <ThreeCircles height={15} color="white" />
                        ) : (
                            "Add Property"
                        )
                    }
                </Button>
            </form>
        </div>
    )
}

export default AddProperty