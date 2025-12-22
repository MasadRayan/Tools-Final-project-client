import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiUser, FiShield } from 'react-icons/fi';
import useUserRole from '../../Hooks/useUserRole';
import useAuth from '../../Hooks/useAuth';
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner';

const Profile = () => {
    useEffect(() => {
        document.title = "My profile";
    }, []);
    const { user, loading } = useAuth();
    const { role, roleLoading } = useUserRole();

    if (loading || roleLoading) {
        return <LoadingSpinner></LoadingSpinner>;
    }

    return (
        <motion.div
            className="flex flex-col items-center justify-center min-h-[80vh] px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-primary mb-6 shadow-lg">
                <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="w-full h-full object-cover" referrerPolicy='no-referrer'
                />
            </div>

            <div className="bg-base-200 shadow-xl rounded-xl p-8 w-full max-w-md text-center space-y-4">
                <h2 className="text-3xl font-bold flex items-center justify-center gap-2">
                    <FiUser /> {user.displayName}
                </h2>
                <p className="text-lg flex items-center justify-center gap-2">
                    {role === 'admin' && <FiShield className="text-primary" />}
                    {role === 'user' && <FiUser className="text-primary" />}
                    <span className="capitalize">{role}</span>
                </p>

                <p className="text-lg flex items-center justify-center gap-2">
                    <FiMail /> {user.email}
                </p>
            </div>
        </motion.div>
    );
};

export default Profile;