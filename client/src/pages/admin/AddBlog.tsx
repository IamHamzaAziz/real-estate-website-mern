import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { ThreeCircles } from "react-loader-spinner"

const modules = {
    toolbar: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
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

const AddBlog = () => {
    const [title, setTitle] = useState("")
    const [summary, setSummary] = useState("")
    const [content, setContent] = useState("")
    const [image, setImage] = useState<string | null>(null)

    const [loading, setLoading] = useState(false)

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setImage(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        console.log({ title, summary, content, image })
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-center">Add Blog</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                        id="title"
                        value={title}
                        className="border border-gray-400"
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="summary">Summary</Label>
                    <Textarea
                        id="summary"
                        className="border border-gray-400"
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="summary">Content</Label>
                    <ReactQuill
                        modules={modules}
                        formats={formats}
                        value={content}
                        onChange={(newValue) => setContent(newValue)}
                        className='border border-gray-400 rounded-lg overflow-hidden'
                    />
                </div>

                <div>
                    <div className="h-[300px] border border-gray-400 rounded-se-lg rounded-ss-lg overflow-hidden">
                        {
                            image && (
                                <img
                                    src={image}
                                    alt="Selected blog image"
                                    className="w-full h-full"
                                />
                            )
                        }
                    </div>
                    <Label htmlFor="image" className="block w-full text-center p-3 cursor-pointer text-white rounded-none rounded-es-lg rounded-ee-lg bg-p1 hover:bg-p2">
                        {image ? 'Change Image' : 'Select Image'}
                    </Label>

                    <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                    />
                </div>

                <Button type={loading ? "button" : "submit"} className="w-full bg-p1 hover:bg-p2">
                    {
                        loading ? (
                            <ThreeCircles height={15} color="white" />
                        ) : (
                            "Create Blog Post"
                        )
                    }
                </Button>
            </form>
        </div>
    )
}

export default AddBlog