import { useState } from "react"
import { Link, Outlet } from "react-router-dom"
import { Menu, X, Home, PlusCircle, List, Building, MessageSquare, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

const AdminDashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const menuItems = [
        { icon: Home, label: "Dashboard", href: "/admin" },
        { icon: PlusCircle, label: "Add Blog", href: "/admin/add-blog" },
        { icon: List, label: "Manage Blogs", href: "/admin/manage-blogs" },
        { icon: PlusCircle, label: "Add Property", href: "/admin/add-property" },
        { icon: Building, label: "Manage Properties", href: "/admin/properties" },
        { icon: MessageSquare, label: "Contact Messages", href: "/admin/messages" },
        { icon: Users, label: "Manage Users", href: "/admin/users" },
    ]

    document.title = "Admin Panel"

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside
                className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
            >
                <div className="flex items-center justify-end p-4 lg:hidden">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X className="h-6 w-6" />
                        <span className="sr-only">Close sidebar</span>
                    </Button>
                </div>
                <nav className="mt-8">
                    <ul className="list-none">
                        {menuItems.map((item, index) => (
                            <li key={index}>
                                <Link
                                    to={item.href}
                                    className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                                >
                                    <item.icon className="h-5 w-5 mr-3" />
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white shadow-sm z-10">
                    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="mr-4 lg:hidden"
                                onClick={() => setSidebarOpen(true)}
                            >
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Open sidebar</span>
                            </Button>
                            <h1 className="text-2xl font-semibold text-gray-900">Admin Panel</h1>
                        </div>
                    </div>
                </header>
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                    <div className="container mx-auto px-6 py-8">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    )
}

export default AdminDashboardLayout