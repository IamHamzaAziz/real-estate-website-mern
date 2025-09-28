import { Navigate, Outlet } from 'react-router-dom';
import { useAuthCheck, LoadingIndicator } from '@/custom_hooks/useAuthCheck';

const LogoutReq = () => {
    const { loading, userId } = useAuthCheck();

    if (loading) return <LoadingIndicator />;
    
    return !userId ? <Outlet /> : <Navigate to="/" />;
};

export default LogoutReq;