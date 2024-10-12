import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useState, useContext } from 'react';
import { UserContext } from '@/context/UserContext';
import { ThreeCircles } from 'react-loader-spinner'
import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VerifyOTP = () => {
    const location = useLocation()

    const navigate = useNavigate()

    const [otp, setOtp] = useState('')
    const [loading, setLoading] = useState(false)
    const [redirect, setRedirect] = useState(false)

    const { setUserInfo } = useContext(UserContext)

    if (!location.state || !location.state.isFromAuth) {
        return <Navigate to="/sign-up" />; // Redirect if accessed directly
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

    const handleVerifyOTP = async () => {
        setLoading(true);

        if (!otp) {
            failure('OTP is required')
            setLoading(false)
            return
        }

        try {
            if (location.state.forPasswordReset) {
                await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/verify-otp`, { email, otp, passwordReset: true }, { withCredentials: true })
                    .then(response => {
                        if (response.status === 200) {
                            navigate('/password-reset', { state: { email: email } })
                        }
                    })
                    .catch(error => {
                        failure('Failed to verify OTP')
                        setLoading(false)
                        console.log(error)
                    })

                return
            }

            await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/verify-otp`, { email, otp }, { withCredentials: true })
                .then(response => {
                    if (response.status === 200) {
                        if (location.state.forPasswordReset) {
                            navigate('/password-reset', { state: { email: email } })
                        }

                        setUserInfo({
                            _id: response.data._id,
                            email: response.data.email,
                            name: response.data.name,
                            isAdmin: response.data.isAdmin,
                        })
                        setLoading(false)

                        setRedirect(true)
                    }
                })
        } catch (error) {
            failure('Failed to verify OTP')
            setLoading(false)
            console.log(error)
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

    document.title = "Verify OTP - SkyEstate"

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
            <Card className="max-w-md w-full shadow-lg">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-semibold">Verify OTP</CardTitle>
                    <CardDescription className="text-center text-gray-600">Enter the OTP sent to {email}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <Input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
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
                                    onClick={handleVerifyOTP}
                                >
                                    Verify OTP
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

export default VerifyOTP