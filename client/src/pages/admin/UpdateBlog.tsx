import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ThreeCircles } from "react-loader-spinner";
import axios from "axios";
import { Bounce, toast, ToastContainer } from "react-toastify";

const modules = {
    toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
    ],
};

const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
];

const UpdateBlog = () => {
    const { slug } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");
    const [newImage, setNewImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchBlogDetails();
    }, []);

    const fetchBlogDetails = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/blog/get-blog/${slug}`);
            if (response.status === 200) {
                const { title, summary, content, image } = response.data;
                setTitle(title);
                setSummary(summary);
                setContent(content);
                setImage(image);
            }
        } catch (error) {
            console.error("Error fetching blog details:", error);
            toast.error("Failed to fetch blog details.");
        }
    };

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
        });
    };

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
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!title || !summary || !content) {
            failure("All fields are required");
            setLoading(false);
            return;
        }

        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("summary", summary);
            formData.append("content", content);
            if (newImage) {
                formData.append("image", newImage);
            }

            await axios.put(`${import.meta.env.VITE_SERVER_URL}/api/blog/update-blog/${slug}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            })
                .then(response => {
                    if (response.status === 200) {
                        success("Blog updated successfully");
                        navigate(`/blog/${slug}`); // Redirect to the blog details page after updating
                    }
                })
                .catch(error => {
                    failure("Failed to update blog");
                    console.error("Update blog error:", error);
                })
                .finally(() => {
                    setLoading(false);
                })
        } catch (error) {
            failure("Failed to update blog");
            console.error("Update blog error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-center">Update Blog</h1>
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
                    <Label htmlFor="content">Content</Label>
                    <ReactQuill
                        modules={modules}
                        formats={formats}
                        value={content}
                        onChange={(newValue) => setContent(newValue)}
                        className="border border-gray-400 rounded-lg overflow-hidden"
                    />
                </div>
                <div>
                    <div className="h-[300px] border border-gray-400 rounded-se-lg rounded-ss-lg overflow-hidden">
                        {
                            newImage ? (
                                <img
                                    src={URL.createObjectURL(newImage)}
                                    alt="Selected blog image"
                                    className="w-full h-full"
                                />
                            ) : (
                                <img
                                    src={image}
                                    alt="Selected blog image"
                                    className="w-full h-full"
                                />
                            )
                        }
                    </div>
                    <Label htmlFor="image" className="block w-full text-center p-3 cursor-pointer text-white rounded-none rounded-es-lg rounded-ee-lg bg-p1 hover:bg-p2">
                        Change Image
                    </Label>
                    <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const files = e.target.files;
                            if (files && files.length > 0) {
                                setNewImage(files[0]); // Set the first file if available
                            } else {
                                setNewImage(null); // Reset the image if no file is selected
                            }
                        }}
                        className="hidden"
                    />
                </div>
                <Button type={loading ? "button" : "submit"} className="w-full bg-p1 hover:bg-p2">
                    {loading ? <ThreeCircles height={15} color="white" /> : "Update Blog Post"}
                </Button>
            </form>
            <ToastContainer />
        </div>
    );
}

export default UpdateBlog