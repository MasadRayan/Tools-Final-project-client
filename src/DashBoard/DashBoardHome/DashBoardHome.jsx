import React from 'react';
import useUserRole from '../../Hooks/useUserRole';
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner';
import AdminHome from './AdminHome';
import UserHome from './UserHome';

const DashBoardHome = () => {
    const {role, roleLoading} = useUserRole()

    if (roleLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    
    if (!roleLoading || role === 'user') {
        return <UserHome></UserHome>
    }

    if (!roleLoading || role === 'admin') {
        return <AdminHome></AdminHome>
    }

};

export default DashBoardHome;