import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthCheck, LoadingIndicator } from '@/custom_hooks/useAuthCheck';

const OnlyAdmin = ({ children }: { children: React.ReactNode }) => {
    const { loading, isAdmin } = useAuthCheck();
    
    if (loading) return <LoadingIndicator />;
    
    return isAdmin ? children : <Navigate to="/" />;
};

export default OnlyAdmin;