import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { ThreeCircles } from 'react-loader-spinner';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const EnterEmailPassReset = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)

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
        setLoading(true);

        if (!email) {
            failure('Please enter an email address')
            setLoading(false)
            return
        }

        await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/send-otp-password-reset`, { email })
            .then(response => {
                if (response.status === 200) {
                    navigate('/verify-otp', { state: { isFromAuth: true, email: email, forPasswordReset: true } })
                }
            })
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
            <Card className="max-w-md w-full shadow-lg">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-semibold">Enter your email</CardTitle>
                    <CardDescription className="text-center text-gray-600">We will send an OTP and later you can reset your password</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <Input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-center"
                        />
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
                                    Send OTP
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

export default EnterEmailPassReset