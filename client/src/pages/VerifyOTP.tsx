import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Navigate, useLocation } from 'react-router-dom'
import axios from 'axios';
import { useState } from 'react';

const VerifyOTP = () => {
    const location = useLocation()

    const [otp, setOtp] = useState('')

    if (!location.state || !location.state.isFromAuth) {
        return <Navigate to="/sign-up" />; // Redirect if accessed directly
    }

    const email = location.state.email

    const handleVerifyOTP = () => {

    }

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
                        <Button
                            className="w-full bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            onClick={handleVerifyOTP}
                        >
                            Verify OTP
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default VerifyOTP