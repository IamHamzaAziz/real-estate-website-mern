import { useContext, useEffect, useState } from 'react'
import { useParams, Link } from "react-router-dom"
import { CalendarIcon, PenIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import axios from 'axios'
import { UserContext } from '@/context/UserContext'

interface Blog {
    title: string,
    content: string,
    createdAt: Date,
    image: string,
    summary: string,
    blogSlug: string,
}

const BlogDetails = () => {
    const { slug } = useParams()

    const [blog, setBlog] = useState<Blog>()
    const [latestBlogs, setLatestBlogs] = useState<Blog[]>([])

    const { userInfo } = useContext(UserContext)

    const isAdmin = userInfo ? userInfo.isAdmin : false


    useEffect(() => {
        fetchBlog()
        fetchLatestBlogs()
    }, [])

    async function fetchBlog() {
        await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/blog/get-blog/${slug}`)
            .then(response => {
                if (response.status === 200) {
                    setBlog(response.data)
                }
            })
            .catch(error => console.error(error))
    }

    async function fetchLatestBlogs() {
        await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/blog/latest-three-blogs/${slug}`)
            .then(response => {
                if (response.status === 200) {
                    setLatestBlogs(response.data)
                }
            })
            .catch(error => console.error(error))
    }

    document.title = blog?.title ? blog.title : 'SkyEstate'

    return (
        <div className="container mx-auto px-4 py-8">
            <article className="mb-12">
                <img
                    src={blog?.image}
                    alt="Blog post main image"
                    className="rounded-lg w-full h-[400px] mb-8"
                />
                <h1 className="text-4xl font-bold mb-4">{blog?.title}</h1>

                {
                    isAdmin && (
                        <Link to={`/admin/update-blog/${slug}`}>
                            <Button variant="default" size="lg" className='mb-5'>
                                <PenIcon className="mr-2 h-4 w-4" />
                                Edit
                            </Button>
                        </Link>
                    )
                }

                <div className="flex items-center text-muted-foreground mb-6">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    <span>{new Date(blog?.createdAt).toLocaleDateString()}</span>
                </div>

                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: blog?.content }} />
            </article>

            <Separator className="my-12" />

            <section>
                <h2 className="text-3xl font-bold mb-8">Read More Blogs</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {latestBlogs.map((blog, index) => (
                        <Card key={index}>
                            <CardHeader className="p-0">
                                <img
                                    src={blog.image}
                                    alt={`Cover image for ${blog.title}`}
                                    className="rounded-t-lg object-cover w-full h-48"
                                />
                            </CardHeader>
                            <CardContent className="p-4">
                                <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                                <p className="text-muted-foreground text-sm mb-4">{blog.summary}</p>
                                <div className="flex items-center text-muted-foreground text-sm">
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                </div>
                            </CardContent>
                            <CardFooter className="p-4 pt-0">
                                <Link to={`/blog/${blog.blogSlug}`}>
                                    <Button variant="outline">
                                        Read More
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default BlogDetails