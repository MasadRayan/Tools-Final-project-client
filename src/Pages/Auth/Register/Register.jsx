import React, { useState, useEffect } from 'react';
import useAxios from '../../../Hooks/useAxios';
import useAuth from '../../../Hooks/useAuth';
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff, FiShoppingBag, FiArrowRight, FiCheck } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { FaCamera, FaEye, FaEyeSlash } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Link, ScrollRestoration, useLocation, useNavigate } from "react-router";
import { set, useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';

const Register = () => {
    useEffect(() => {
        document.title = 'Register ';
    })
    const axiosInstance = useAxios();
    const [showPass, setShowPass] = useState(false);
    const [profilePic, setProfilePic] = useState('');
    const { setUser, createUser, updateUser, googleSignIn, gitHubSignIn } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || '/';
    const features = [
        "Access exclusive deals & discounts",
        "Track your orders in real-time",
        "Save favorites to your wishlist",
        "Fast & secure checkout",
    ];


    const {
        reset,
        handleSubmit,
        register,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        const { email, password } = data;
        createUser(email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;

                // Create user in database
                const userInfo = {
                    email: data.email,
                    displayName: data.name,
                    photoURL: profilePic,
                    role: "user",
                    createdAt: new Date().toString(),
                    lastLogin: new Date().toString()
                }

                const userResponse = await axiosInstance.post("/users", userInfo);

                // update user status in firebase
                const userProfile = {
                    displayName: data.name,
                    photoURL: profilePic
                }

                updateUser(userProfile)
                    .then(() => {
                        setUser({ ...user, displayName: data.name, photoURL: profilePic })
                        toast.success("User created successfully!");
                        navigate(from, { replace: true });
                    })

            })
            .catch((error) => {
                toast.error(error.message);
            });
    }

    useEffect(() => {
        reset();
    }, []);


    // Image Upload function
    const handleImageUpload = async (e) => {
        const image = e.target.files[0];

        if (!image) {
            return;
        }

        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
        formData.append('cloud_name', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

        try {
            const res = await axios.post(
                `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
                formData
            );

            // console.log("Uploaded image URL: ", res.data.secure_url);
            setProfilePic(res.data.secure_url);
        } catch (error) {
            console.log("Cloudinary Imnage Upload failed", error);
        }
    }

    // handle Google SignIn
    const handleGoogleSignIn = () => {
        googleSignIn()
            .then( async (userCredential) => {
                const user  = userCredential.user;
                const userInfo = {
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    role: "user",
                    createdAt: new Date().toString(),
                    lastLogin: new Date().toString()
                };
                const userResponse = await axiosInstance.post("/users", userInfo);
                toast.success("User logged in successfully!");
                navigate(from, { replace: true });
            })
            .catch((err) => {
                console.log("Cant sign in with Google. Please try again.");
            })
    }

    // handle GitHub SignIn
    const handleGitHubSignIn = () => {
        gitHubSignIn()
            .then( async (userCredential) => {
                const user = userCredential.user;
                const userInfo = {
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    role: "user",
                    createdAt: new Date().toString(),
                    lastLogin: new Date().toString()
                }
                const userResponse = await axiosInstance.post("/users", userInfo);
                toast.success("User logged in successfully!");
                navigate(from, { replace: true });
            })
            .catch((err) => {
                console.log("Cant sign in with GitHub. Please try again.");
            })
    }


    return (
        <div className='flex'>
            {/* Left side */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-linear-to-br from-primary via-primary/90 to-accent overflow-hidden py-25">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl" />
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-white rounded-full blur-3xl opacity-20" />
                </div>

                {/* Floating Elements */}
                <div className="absolute inset-0">
                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-30 left-20 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center"
                    >
                        <FiShoppingBag className="w-8 h-8 text-white" />
                    </motion.div>
                    <motion.div
                        animate={{ y: [0, 20, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-50 right-25 w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                    >
                        <span className="text-3xl">🛒</span>
                    </motion.div>
                    <motion.div
                        animate={{ y: [0, -15, 0] }}
                        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-20 left-25 w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center"
                    >
                        <span className="text-2xl">💳</span>
                    </motion.div>
                    <motion.div
                        animate={{ y: [0, 15, 0] }}
                        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-45 right-80 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center"
                    >
                        <span className="text-4xl">⭐</span>
                    </motion.div>
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >


                        <h1 className="text-4xl xl:text-5xl font-bold text-white mb-6 leading-tight">
                            Your One-Stop
                            <br />
                            <span className="text-white/90">Shopping Destination</span>
                        </h1>

                        <p className="text-white/80 text-lg mb-10 max-w-md">
                            Join thousands of happy customers and discover amazing products at unbeatable prices.
                        </p>

                        <div className="space-y-4">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                                    className="flex items-center gap-3"
                                >
                                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                                        <FiCheck className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="text-white/90">{feature}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
            {/* Right side */}
            <div className='w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-base-100'>
                <AnimatePresence mode='wait'>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-secondary mb-2">
                            Create an account
                        </h2>
                        <p className="text-center mb-8">
                            Fill in your details to get started
                        </p>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className=''>
                                <div className='flex flex-col space-y-4'>
                                    {/* name */}
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">
                                            Full Name
                                        </label>
                                        <div className='relative'>
                                            <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                            <input type="text" {...register('name', { required: true })} className='w-full pl-12 pr-12 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200  placeholder:text-muted-foreground' placeholder='Your Name' />
                                        </div>
                                        {
                                            errors.name && <span className='text-red-400'>Name is required</span>
                                        }
                                    </div>
                                    {/* email */}
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">
                                            Email Address
                                        </label>
                                        <div className='relative'>
                                            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                            <input type="email" {...register('email', { required: true })} className='w-full pl-12 pr-12 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200  placeholder:text-muted-foreground' placeholder='Your Email' />
                                        </div>
                                        {
                                            errors.email && <span className='text-red-400'>Email is required</span>
                                        }
                                    </div>
                                    {/* Photo */}
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">
                                            Photo
                                        </label>
                                        <div className='relative'>
                                            <FaCamera className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                            <input type="file" onChange={handleImageUpload} className='w-full pl-12 pr-12 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200  placeholder:text-muted-foreground cursor-pointer' placeholder='Your Photo' />
                                        </div>
                                    </div>
                                    {/* Password */}
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">
                                            Password
                                        </label>
                                        <div className='relative'>
                                            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                            <input
                                                type={showPass ? 'text' : "password"}
                                                {...register('password', { required: true, minLength: 6, maxLength: 20, pattern: /^(?=.*[A-Z]).+$/ })}
                                                className='w-full pl-12 pr-12 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200  placeholder:text-muted-foreground cursor-pointer'
                                                placeholder='Your Password' />
                                            <button onClick={() => setShowPass(!showPass)} type='button' className='btn btn-ghost btn-sm absolute top-2 right-3 '>
                                                {
                                                    showPass ? <FaEyeSlash /> : <FaEye />
                                                }
                                            </button>

                                        </div>
                                        {
                                            errors.password?.type === 'required' && (<span className='text-red-400 mt-2'>Password is required</span>)
                                        }
                                        {
                                            errors.password?.type === 'minLength' && (<span className='text-red-400 mt-2'>Password must be at least 6 characters</span>)
                                        }
                                        {
                                            errors.password?.type === 'maxLength' && (<span className='text-red-400 mt-2'>Password must be at most 20 characters</span>)
                                        }
                                        {
                                            errors.password?.type === 'pattern' && (<span className='text-red-400 mt-2'>Password must contain at least one uppercase letter</span>)
                                        }
                                    </div>
                                    {/* Terms and Conditions */}
                                    <div>
                                        <label className="flex items-start gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                required
                                                className="w-4 h-4 mt-0.5 rounded border-border text-primary focus:ring-primary"
                                            />
                                            <span className="text-sm text-muted-foreground">
                                                I agree to the{" "}
                                                <span className="text-primary hover:underline">
                                                    Terms of Service
                                                </span>{" "}
                                                and{" "}
                                                <span className="text-primary hover:underline">
                                                    Privacy Policy
                                                </span>
                                            </span>
                                        </label>

                                    </div>
                                    {/* submit button */}
                                    <div>
                                        <button
                                            type="submit"
                                            className="w-full py-3.5 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all duration-200 flex items-center justify-center gap-2 group shadow-lg shadow-primary/25"
                                        >
                                            Create Account
                                            <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        {/* Bottom Text */}
                        <p className="text-center text-muted-foreground mt-6">
                            Already have an account? {" "}
                            <Link
                                to="/login"
                                className="text-primary font-semibold hover:underline"
                            >
                                Sign in
                            </Link>
                        </p>
                        {/* devider */}
                        <div className="divider">OR</div>
                        {/* social login */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <button onClick={handleGoogleSignIn} className="cursor-pointer flex items-center justify-center gap-2 py-3 px-4 border border-border rounded-xl hover:bg-primary hover:text-white transition-colors duration-200">
                                <FcGoogle className="w-5 h-5" />
                                <span className="font-medium text-foreground">Google</span>
                            </button>
                            <button onClick={handleGitHubSignIn} className="cursor-pointer flex items-center justify-center gap-2 py-3 px-4 border border-border rounded-xl hover:bg-primary hover:text-white transition-colors duration-200">
                                <FaGithub className="w-5 h-5 text-foreground" />
                                <span className="font-medium text-foreground">GitHub</span>
                            </button>
                        </div>

                    </motion.div>
                </AnimatePresence>
            </div>
            <ScrollRestoration></ScrollRestoration>
        </div>
    );
};

export default Register;
