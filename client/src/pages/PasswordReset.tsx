import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { ThreeCircles } from 'react-loader-spinner';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import axios from 'axios'
import { Navigate, useLocation } from 'react-router-dom';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

const PasswordReset = () => {
    const location = useLocation()

    const [loading, setLoading] = useState(false)
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')

    const [showPassword, setShowPassword] = useState(false)
    const [showPassword2, setShowPassword2] = useState(false)

    if (!location.state || !location.state.email) {
        return <Navigate to="/" />; // Redirect if accessed directly
    }

    const email = location.state.email

    const failure = (message: String = 'Cannot verify OTP') => {
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

    const handleSubmit = async () => {
        setLoading(true)

        if (!password || !password2) {
            failure('Fill both fields')
            setLoading(false)
            return
        }

        if (password !== password2) {
            failure('Passwords do not match')
            setLoading(false)
            return
        }

        await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/reset-password`, { email, password })
            .then(response => {
                if (response.status === 200) {
                    toast.success('Password reset successfully. Now head to Sign In page', {
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
                    setLoading(false)
                } else {
                    failure('Failed to reset password')
                    setLoading(false)
                }
            })
            .catch(error => {
                failure('Failed to reset password')
                setLoading(false)
                console.error(error)
            })
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
            <Card className="max-w-md w-full shadow-lg">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-semibold">Reset Password</CardTitle>
                    <CardDescription className="text-center text-gray-600">Enter your new password for account with email {email}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="relative">
                            <Input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="new-password"
                                required
                                className="relative block w-full pr-10"
                                placeholder="Enter Password"
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


                            <Input
                                id="password"
                                name="password"
                                type={showPassword2 ? "text" : "password"}
                                autoComplete="new-password"
                                required
                                className="relative block w-full pr-10"
                                placeholder="Re Enter Password"
                                value={password2}
                                onChange={(e) => setPassword2(e.target.value)}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 flex items-center pr-3"
                                onClick={() => setShowPassword2(!showPassword2)}
                                aria-label={showPassword2 ? "Hide password" : "Show password"}
                            >
                                {showPassword2 ? (
                                    <EyeOffIcon className="h-5 w-5 text-gray-400" />
                                ) : (
                                    <EyeIcon className="h-5 w-5 text-gray-400" />
                                )}
                            </button>
                        </div>
                        {
                            loading ? (
                                <Button className='w-full bg-p1 rounded-lg hover:bg-p2'>
                                    <ThreeCircles
                                        color="white"
                                        height={15}
                                    />
                                </Button>
                            ) : (
                                <Button
                                    className="w-full bg-p1 text-white rounded-lg hover:bg-p2 transition-colors"
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </Button>
                            )
                        }
                    </div>
                </CardContent>
            </Card>

            <ToastContainer />
        </div>
    )
}

export default PasswordReset