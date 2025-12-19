import React from 'react';
import useAuth from '../Hooks/useAuth';
import useUserRole from '../Hooks/useUserRole';
import LoadingSpinner from '../Components/LoadingSpinner/LoadingSpinner';
import { Navigate } from 'react-router';

const AdminRoute = ({ children }) => {

    const {user, loading} = useAuth();
    const {role, roleLoading} = useUserRole();

    if (loading || roleLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    if (!user || role !== "admin") {
        return <Navigate to={'/forbidden'}></Navigate>
    }

    return children;
};

export default AdminRoute;