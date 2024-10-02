import React from 'react'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FaFacebook } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";

const Contact = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle form submission logic here
        console.log("Form submitted:", { name, email, message })
    }

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-grow flex items-stretch">
                <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row lg:items-stretch w-full">
                    <div className="lg:w-1/2 space-y-6 lg:pr-8 mb-8 lg:mb-0">
                        <h2 className="text-3xl font-bold">Contact Us</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Name
                                </label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                    Message
                                </label>
                                <Textarea
                                    id="message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                    className="mt-1"
                                    rows={4}
                                />
                            </div>
                            <Button type="submit" className="w-full bg-p1 hover:bg-p2">
                                Send Message
                            </Button>
                        </form>
                        <div className="pt-4">
                            <h3 className="text-lg font-semibold mb-2">Connect with us</h3>
                            <div className="flex space-x-4">
                                <a href="https://facebook.com/" target='_blank'>
                                    <FaFacebook className="h-6 w-6" />
                                    <span className="sr-only">Facebook</span>
                                </a>
                                <a href="https://wa.me/923086646421" target='_blank'>
                                    <FaWhatsapp className="h-6 w-6" />
                                    <span className="sr-only">WhatsApp</span>
                                </a>
                                <a href="https://linkedin.com/in/iamhamzaaziz" target='_blank'>
                                    <FaXTwitter className="h-6 w-6" />
                                    <span className="sr-only">Twitter</span>
                                </a>
                                <a href="https://instagram.com/__hamzeee" target='_blank'>
                                    <FaInstagram className="h-6 w-6" />
                                    <span className="sr-only">Instagram</span>
                                </a>
                                <a href="https://linkedin.com/in/iamhamzaaziz" target='_blank'>
                                    <FaLinkedinIn className="h-6 w-6" />
                                    <span className="sr-only">LinkedIn</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-1/2 h-[400px] lg:h-auto">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d334377.79250312445!2d73.99896046240227!3d31.56451230825216!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39191caf52106af1%3A0x144aada181d3c88!2sTown%20Hall!5e0!3m2!1sen!2s!4v1727863752477!5m2!1sen!2s"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Contact