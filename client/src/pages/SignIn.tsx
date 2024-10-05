import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import axios from "axios"
import { ThreeCircles } from "react-loader-spinner"
import { Bounce, toast, ToastContainer } from "react-toastify"
import { UserContext } from "@/context/UserContext"

const SignIn = () => {
    const [showPassword, setShowPassword] = useState(false)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [loading, setLoading] = useState(false)

    const { setUserInfo } = useContext(UserContext)

    const navigate = useNavigate()

    const failure = (message: String = 'Failed to sign in') => {
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

        if (!email || !password) {
            failure('All fields are required')
            setLoading(false)
            return
        }

        try {
            await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/sign-in`, { email, password }, { withCredentials: true })
                .then(response => {
                    if (response.status === 200) {
                        console.log(response.data);
                        setUserInfo(response.data)
                        navigate('/')
                    }
                })
        } catch (error: any) {
            console.log(error)
            if (error.status === 400) {
                failure(error.response.data.message)
            } else if (error.status === 401) {
                navigate('/verify-otp', { state: { isFromAuth: true, email: email } })
            }
            setLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen">
            {/* Left side with image */}
            <div className="hidden w-1/2 bg-gray-100 lg:block">
                <img
                    src="https://images.pexels.com/photos/415687/pexels-photo-415687.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="Property dealers"
                    className="h-screen w-full object-cover"
                />
            </div>

            {/* Right side with sign-up form */}
            <div className="flex w-full items-center justify-center lg:w-1/2">
                <div className="w-full max-w-md space-y-8 px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign In to SkyEstates</h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-4 rounded-md shadow-sm">
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
                        </div>

                        <div>
                            {
                                loading ? (
                                    <Button className="w-full bg-p1 hover:bg-p2">
                                        <ThreeCircles height={15} color="white" />
                                    </Button>
                                ) : (

                                    <Button type="submit" className="w-full bg-p1 hover:bg-p2">
                                        Sign In
                                    </Button>
                                )
                            }
                        </div>
                    </form>
                    <div className="text-center text-sm">
                        Do not have an account?{" "}
                        <Link to="/sign-up" className="font-medium text-blue-800 underline">
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>

            <ToastContainer />
        </div>
    )
}

export default SignIn