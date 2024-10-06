import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { EyeIcon, EyeOffIcon } from "lucide-react"
import { ThreeCircles } from 'react-loader-spinner'
import axios from 'axios'

import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const failure = (message: String = 'Failed to sign up') => {
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
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        setLoading(true)

        if (!name || !email || !password || !password2) {
            failure('All fields are required')
            setLoading(false)
            return
        }

        if (password !== password2) {
            failure('Passwords do not match')
            setLoading(false)
            return
        }

        // compare email with an email regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            failure('Invalid email address')
            setLoading(false)
            return
        }

        if (password.length < 6) {
            failure('Password must be at least 6 characters long')
            setLoading(false)
            return
        }

        try {
            await axios.post('http://localhost:4000/api/auth/sign-up', { name, email, password })
                .then(response => {
                    if (response.status === 200) {
                        navigate('/verify-otp', { state: { isFromAuth: true, email: email } })
                    }
                })

            setLoading(false)
        } catch (error: any) {
            console.log(error)
            if (error.status === 400) {
                failure(error.response.data.message)
            }
            setLoading(false)
        }
    }

    document.title = "Sign Up - SkyEstate"

    return (
        <div className="flex min-h-screen">
            {/* Left side with image */}
            <div className="hidden w-1/2 bg-gray-100 lg:block">
                <img
                    src="https://images.pexels.com/photos/3625734/pexels-photo-3625734.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Property dealers"
                    className="h-screen w-full object-cover"
                />
            </div>

            {/* Right side with sign-up form */}
            <div className="flex w-full items-center justify-center lg:w-1/2">
                <div className="w-full max-w-md space-y-8 px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create your account</h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-4 rounded-md shadow-sm">
                            <div>
                                <Label htmlFor="name" className="sr-only">
                                    Name
                                </Label>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    className="relative block w-full"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div>
                                <Label htmlFor="email-address" className="sr-only">
                                    Email address
                                </Label>
                                <Input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="relative block w-full"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="relative">
                                <Label htmlFor="password" className="sr-only">
                                    Password
                                </Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="new-password"
                                    required
                                    className="relative block w-full pr-10"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? (
                                        <EyeOffIcon className="h-5 w-5 text-gray-400" />
                                    ) : (
                                        <EyeIcon className="h-5 w-5 text-gray-400" />
                                    )}
                                </button>
                            </div>
                            <div className="relative">
                                <Label htmlFor="re-enter-password" className="sr-only">
                                    Re-enter Password
                                </Label>
                                <Input
                                    id="re-enter-password"
                                    name="re-enter-password"
                                    type={showConfirmPassword ? "text" : "password"}
                                    autoComplete="new-password"
                                    required
                                    className="relative block w-full pr-10"
                                    placeholder="Re-enter Password"
                                    value={password2}
                                    onChange={(e) => setPassword2(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                                >
                                    {showConfirmPassword ? (
                                        <EyeOffIcon className="h-5 w-5 text-gray-400" />
                                    ) : (
                                        <EyeIcon className="h-5 w-5 text-gray-400" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div>
                            {
                                loading ? (
                                    <Button className="w-full bg-p1 hover:bg-p2">
                                        <ThreeCircles color="white" height={15} />
                                    </Button>
                                ) : (
                                    <Button type="submit" className="w-full bg-p1 hover:bg-p2">
                                        Sign Up
                                    </Button>
                                )
                            }
                        </div>
                    </form>
                    <div className="text-center text-sm">
                        Already have an account?{" "}
                        <Link to="/sign-in" className="font-medium text-blue-800 underline">
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>

            <ToastContainer />
        </div>
    )
}

export default SignUp