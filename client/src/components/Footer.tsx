import { Link } from 'react-router-dom'
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
            <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 SkyEstate. All rights reserved.</p>
            <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                <Link className="text-xs hover:underline underline-offset-4" to={"/contact"}>
                    Contact Us
                </Link>
            </nav>
            <div className="flex gap-4 mt-4 sm:mt-0">
                <Link to={"https://facebook.com/"} aria-label="Facebook">
                    <FaFacebook className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                </Link>
                <Link to={"https://instagram.com/__hamzeee"} target='_blank' aria-label="Instagram">
                    <FaInstagram className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                </Link>
                <Link to={"https://linkedin.com/in/iamhamzaaziz"} target='_blank' aria-label="LinkedIn">
                    <FaLinkedinIn className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                </Link>
            </div>
        </footer>
    )
}

export default Footer