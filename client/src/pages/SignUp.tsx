import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { EyeIcon, EyeOffIcon } from "lucide-react"

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    return (
        <div className="flex min-h-screen">
            {/* Left side with image */}
            <div className="hidden w-1/2 bg-gray-100 lg:block">
                <img
                    src="https://images.pexels.com/photos/783745/pexels-photo-783745.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="Property dealers"
                    className="h-full w-full object-cover"
                />
            </div>

            {/* Right side with sign-up form */}
            <div className="flex w-full items-center justify-center lg:w-1/2">
                <div className="w-full max-w-md space-y-8 px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create your account</h2>
                    </div>
                    <form className="mt-8 space-y-6" action="#" method="POST">
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
                            <Button type="submit" className="w-full bg-p1 hover:bg-p2">
                                Sign Up
                            </Button>
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
        </div>
    )
}

export default SignUp