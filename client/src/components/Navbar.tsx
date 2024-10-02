import { useState } from 'react'
import { Home, Building2, BookOpen, Users, Phone, LogIn, Menu, Building } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Link } from 'react-router-dom'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <nav className="bg-p1 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to={'/'} className="flex items-center space-x-2">
                    <Building className="h-8 w-8" />
                    <span className="text-xl font-bold">SkyEstate</span>
                </Link>

                <div className="hidden md:flex items-center space-x-6">
                    <Link to={'/'} className="hover:text-p2 cursor-pointer font-bold">
                        Home
                    </Link>
                    <span className="hover:text-p2 cursor-pointer font-bold">
                        Properties
                    </span>
                    <span className="hover:text-p2 cursor-pointer font-bold">
                        Blogs
                    </span>
                    <Link to={'/team'} className="hover:text-p2 cursor-pointer font-bold">
                        Team
                    </Link>
                    <Link to={'/contact'} className="hover:text-p2 cursor-pointer font-bold">
                        Contact
                    </Link>

                    <Link to={'/sign-in'}>
                        <Button variant="outline" className="text-p1 bg-white">
                            <LogIn className="mr-2 h-4 w-4" /> Sign In
                        </Button>
                    </Link>
                </div>

                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-p1 text-white">
                        <div className="flex justify-between items-center mb-8">
                            <span className="flex items-center space-x-2">
                                <Building className="h-8 w-8" />
                                <span className="text-xl font-bold">SkyEstate</span>
                            </span>
                        </div>
                        <div className="space-y-4">
                            <Link to={'/'}
                                className="flex items-center space-x-2 hover:text-gray-300"
                                onClick={() => { setIsOpen(false); }}
                            >
                                <Home className="h-5 w-5" />
                                <span>Home</span>
                            </Link>
                            <span
                                className="flex items-center space-x-2 hover:text-gray-300"
                                onClick={() => setIsOpen(false)}
                            >
                                <Building2 className="h-5 w-5" />
                                <span>Properties</span>
                            </span>
                            <span
                                className="flex items-center space-x-2 hover:text-gray-300"
                                onClick={() => setIsOpen(false)}
                            >
                                <BookOpen className="h-5 w-5" />
                                <span>Blogs</span>
                            </span>
                            <Link to={'/team'}
                                className="flex items-center space-x-2 hover:text-gray-300"
                                onClick={() => setIsOpen(false)}
                            >
                                <Users className="h-5 w-5" />
                                <span>Team</span>
                            </Link>
                            <Link to={'/contact'}
                                className="flex items-center space-x-2 hover:text-gray-300"
                                onClick={() => setIsOpen(false)}
                            >
                                <Phone className="h-5 w-5" />
                                <span>Contact</span>
                            </Link>

                            <Button variant="outline" className="w-full border-white text-p1">
                                <LogIn className="mr-2 h-4 w-4" /> Sign In
                            </Button>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </nav>
    )
}