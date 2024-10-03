import { useState, useContext, useEffect } from 'react'
import { Home, Building2, BookOpen, Users, Phone, LogIn, Menu, Building, User, BookmarkIcon, LogOut } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Link } from 'react-router-dom'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserContext } from '@/context/UserContext'
import axios from 'axios'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    const { setUserInfo, userInfo } = useContext(UserContext)

    useEffect(() => {
        axios.get('http://localhost:4000/account/profile', { withCredentials: true })
            .then((response) => {
                setUserInfo(response.data)
            })
    }, [])

    const email = userInfo ? userInfo.email : null

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
                    <Link to={'/properties'} className="hover:text-p2 cursor-pointer font-bold">
                        Properties
                    </Link>
                    <Link to={'/blogs'} className="hover:text-p2 cursor-pointer font-bold">
                        Blogs
                    </Link>
                    <Link to={'/team'} className="hover:text-p2 cursor-pointer font-bold">
                        Team
                    </Link>
                    <Link to={'/contact'} className="hover:text-p2 cursor-pointer font-bold">
                        Contact
                    </Link>

                    {
                        email ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="border-white text-p1">
                                        <User className="mr-2 h-4 w-4" /> Profile
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end" forceMount>
                                    <DropdownMenuItem>
                                        <User className="mr-2 h-4 w-4" />
                                        <span>My Account</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <BookmarkIcon className="mr-2 h-4 w-4" />
                                        <span>Saved Properties</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Log out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Link to={'/sign-in'}>
                                <Button variant="outline" className="text-p1 bg-white">
                                    <LogIn className="mr-2 h-4 w-4" /> Sign In
                                </Button>
                            </Link>
                        )
                    }

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
                            <Link to={'/properties'}
                                className="flex items-center space-x-2 hover:text-gray-300"
                                onClick={() => setIsOpen(false)}
                            >
                                <Building2 className="h-5 w-5" />
                                <span>Properties</span>
                            </Link>
                            <Link to={'/blogs'}
                                className="flex items-center space-x-2 hover:text-gray-300"
                                onClick={() => setIsOpen(false)}
                            >
                                <BookOpen className="h-5 w-5" />
                                <span>Blogs</span>
                            </Link>
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

                            {
                                email ? (
                                    <>
                                        <Button variant="outline" className="w-full border-white hover:bg-white text-p1" onClick={() => setIsOpen(false)}>
                                            <User className="mr-2 h-4 w-4" /> My Account
                                        </Button>
                                        <Button variant="outline" className="w-full border-white hover:bg-white text-p1" onClick={() => setIsOpen(false)}>
                                            <BookmarkIcon className="mr-2 h-4 w-4" /> Saved Properties
                                        </Button>
                                        <Button variant="outline" className="w-full border-white hover:bg-white text-p1" onClick={() => { setIsOpen(false); }}>
                                            <LogOut className="mr-2 h-4 w-4" /> Log out
                                        </Button>
                                    </>
                                ) : (
                                    <Link to={'/sign-in'} onClick={() => setIsOpen(false)}>
                                        <Button variant="outline" className="w-full border-white text-p1 mt-4">
                                            <LogIn className="mr-2 h-4 w-4" /> Sign In
                                        </Button>
                                    </Link>
                                )
                            }
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </nav>
    )
}