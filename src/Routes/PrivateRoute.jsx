import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router';
import useAuth from '../Hooks/useAuth';
import LoadingSpinner from '../Components/LoadingSpinner/LoadingSpinner';

const PrivateRoute = ({children}) => {
    const location = useLocation();
    const {user, loading} = useAuth();

    if (loading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    if (user) {
        return children
    }

    return <Navigate to="/login" state={{from: location.pathname}} ></Navigate>
};

export default PrivateRoute;