import { Link } from 'react-router-dom'
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-p1 text-white flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6">
            <p className="text-xs text-white">© 2024 SkyEstate. All rights reserved.</p>
            <nav className="sm:ml-auto flex gap-4 sm:gap-6 sm:mr-3">
                <Link className="text-xs hover:underline underline-offset-4" to={"/contact"}>
                    Contact Us
                </Link>
            </nav>
            <div className="flex gap-4 mt-4 sm:mt-0">
                <Link to={"https://facebook.com/"} aria-label="Facebook">
                    <FaFacebook className="h-5 w-5 text-white hover:text-p2" />
                </Link>
                <Link to={"https://instagram.com/__hamzeee"} target='_blank' aria-label="Instagram">
                    <FaInstagram className="h-5 w-5 text-white hover:text-p2" />
                </Link>
                <Link to={"https://linkedin.com/in/iamhamzaaziz"} target='_blank' aria-label="LinkedIn">
                    <FaLinkedinIn className="h-5 w-5 text-white hover:text-p2" />
                </Link>
            </div>
        </footer>
    )
}

export default Footer