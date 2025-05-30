import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthCheck, LoadingIndicator } from '@/custom_hooks/useAuthCheck';

const LogoutReq = ({ children }: { children: React.ReactNode }) => {
    const { loading, userId } = useAuthCheck();

    if (loading) return <LoadingIndicator />;
    
    return !userId ? children : <Navigate to="/" />;
};

export default LogoutReq;