import React from 'react';
import useUserRole from '../Hooks/useUserRole';
import useAuth from '../Hooks/useAuth';
import { Navigate } from 'react-router';
import LoadingSpinner from '../Components/LoadingSpinner/LoadingSpinner';

const UserRoute = ({ children }) => {
    const {role, roleLoading} = useUserRole();
    const {user, loading} = useAuth();

    if (!user || role !== "user") {
        return <Navigate to={'/forbidden'}></Navigate>
    }

    if (loading || roleLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    return children;
};

export default UserRoute;