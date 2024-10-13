import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '@/context/UserContext'
import axios from 'axios'
import { Navigate } from 'react-router-dom'

const OnlyAdmin = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState(true)
    const { userInfo, setUserInfo } = useContext(UserContext)

    useEffect(() => {
        const checkLogin = async () => {
            await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/auth/profile`, { withCredentials: true })
                .then((response) => {
                    setUserInfo(response.data)
                    setLoading(false)
                })
                .catch((error) => { console.log(error); setLoading(false) })
        }

        checkLogin()
    }, [])

    if (loading) {
        return (
            <div className='container mx-auto px-4 py-8'>
                <div className="text-center">
                    <p className="text-xl">Loading...</p>
                </div>
            </div>
        )
    }

    const isAdmin = userInfo ? userInfo.isAdmin : null

    return (
        isAdmin ? children : <Navigate to={'/'} />
    )
}

export default OnlyAdmin