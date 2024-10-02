import { Link } from "react-router-dom"
import { CalendarIcon } from "lucide-react"

const blogs = [
    {
        id: 1,
        title: "5 Tips for First-Time Home Buyers",
        shortText: "Buying your first home can be both exciting and overwhelming. Here are five essential tips to help you navigate the process and make informed decisions...",
        date: "2023-05-15",
        image: "https://images.pexels.com/photos/981916/pexels-photo-981916.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
        id: 2,
        title: "The Impact of Remote Work on Real Estate Trends",
        shortText: "The rise of remote work has significantly influenced real estate trends. From increased demand for home offices to migration away from urban centers...",
        date: "2023-05-10",
        image: "https://images.pexels.com/photos/981916/pexels-photo-981916.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
        id: 3,
        title: "Understanding Property Taxes: What Every Homeowner Should Know",
        shortText: "Property taxes are an essential aspect of homeownership that often confuses many. This guide breaks down the basics of property taxes...",
        date: "2023-05-05",
        image: "https://images.pexels.com/photos/981916/pexels-photo-981916.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
]

const Blogs = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">SkyEstate Insights</h1>
            <div className="space-y-8">
                {blogs.map((blog) => (
                    <article key={blog.id} className="bg-white rounded-lg shadow-md overflow-hidden">
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
                                    <time dateTime={blog.date}>{new Date(blog.date).toLocaleDateString()}</time>
                                </div>
                                <Link to={`/blog/${blog.id}`} className="block mt-2">
                                    <h2 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition">{blog.title}</h2>
                                </Link>
                                <p className="mt-3 text-gray-600">{blog.shortText}</p>
                                <Link to={`/blog/${blog.id}`} className="mt-3 inline-block text-blue-600 hover:underline">
                                    Read more
                                </Link>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    )
}

export default Blogs