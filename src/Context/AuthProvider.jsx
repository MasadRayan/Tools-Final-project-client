import React, { useState } from 'react';
import { AuthContext } from './AuthContext';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Firebase/firebase.init';

const AuthProvider = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const authData = {
        loading,
        user,
        loginUser,
        createUser,
        
    }
    return <AuthContext value={authData}>
        {children}
    </AuthContext>
};

export default AuthProvider;