import { useState, useEffect, useContext } from 'react';
import { UserContext } from '@/context/UserContext';
import axios from 'axios';

export const useAuthCheck = () => {
    const [loading, setLoading] = useState(true);
    const { userInfo, setUserInfo } = useContext(UserContext);

    useEffect(() => {
        const checkLogin = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_SERVER_URL}/api/auth/profile`, 
                    { withCredentials: true }
                );
                setUserInfo(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        checkLogin();
    }, [setUserInfo]);

    return { loading, userId: userInfo?._id };
};

export const LoadingIndicator = () => (
    <div className='container mx-auto px-4 py-8'>
        <div className="text-center">
            <p className="text-xl">Loading...</p>
        </div>
    </div>
);