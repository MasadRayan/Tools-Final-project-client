import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '../Firebase/firebase.init';

const AuthProvider = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const googleProvider = new GoogleAuthProvider();
    const gitHubProvider = new GithubAuthProvider();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const updateUser = (userInfo) => {
        return updateProfile(auth.currentUser, userInfo);
    }

    const googleSignIn =() => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const gitHubSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, gitHubProvider);
    }
 
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    useEffect(() => {
        const unSubscribe = auth.onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        }) 
        return() => {
            unSubscribe();
        }
    }, [])

    const authData = {
        user,
        setUser,
        loading,
        setLoading,
        loginUser,
        createUser,
        googleSignIn,
        gitHubSignIn,
        updateUser,
        logOut,
        
    }
    return <AuthContext value={authData}>
        {children}
    </AuthContext>
};

export default AuthProvider;