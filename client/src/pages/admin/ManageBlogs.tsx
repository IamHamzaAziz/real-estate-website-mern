import { Link } from "react-router-dom"
import { CalendarIcon, SearchIcon } from "lucide-react"
import axios from "axios"
import { useEffect, useState } from "react"
import InfiniteScroll from 'react-infinite-scroll-component';
import ContentLoader from "@/components/ContentLoader";

interface Blogs {
    _id: string;
    title: string;
    summary: string;
    image: string;
    blogSlug: string;
    createdAt: Date;
}

const ManageBlogs = () => {
    const [blogs, setBlogs] = useState<Blogs[]>([])
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)

    useEffect(() => {
        fetchBlogs()
    }, [])

    async function fetchBlogs() {
        try {
            await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/blog/get-blogs?page=${page}&limit=3`)
                .then(response => {
                    setBlogs([...blogs, ...response.data])
                    setHasMore(response.data.length > 0)
                    setPage(page + 1)
                })
                .catch(error => console.log(error))
        } catch (error) {
            console.error(error)
        }
    }

    const fetchMoreBlogs = () => {
        fetchBlogs()
    }


    return (
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-8">Manage Blogs</h1>

            <div className="mb-8 flex flex-col sm:flex-row gap-4">
                <input
                    type="text"
                    placeholder="Search blogs..."
                    className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center"
                >
                    <SearchIcon className="w-5 h-5 mr-2" />
                    Search Blogs
                </button>
            </div>

            <InfiniteScroll
                dataLength={blogs.length}
                next={fetchMoreBlogs}
                hasMore={hasMore}
                loader={<ContentLoader />}
            >
                <div className="space-y-8">
                    {blogs.map((blog) => (
                        <article key={blog._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="md:flex">
                                <div className="md:flex-shrink-0">
                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                        className="h-[200px] w-full object-cover md:w-80"
                                    />
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center text-sm text-gray-500 mb-2">
                                        <CalendarIcon className="h-4 w-4 mr-2" />
                                        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <Link to={`/blog/${blog.blogSlug}`} className="block mt-2">
                                        <h2 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition">{blog.title}</h2>
                                    </Link>
                                    <p className="mt-3 text-gray-600">{blog.summary}</p>
                                    <Link to={`/blog/${blog.blogSlug}`} className="mt-3 inline-block text-blue-600 hover:underline">
                                        Read more
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </InfiniteScroll>
        </div>
    )
}

export default ManageBlogs