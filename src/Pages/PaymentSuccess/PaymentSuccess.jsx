import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner';
import { motion } from 'framer-motion';
import {
    FiCheckCircle,
    FiPackage,
    FiCreditCard,
    FiCalendar,
    FiMail,
    FiUser,
    FiHome,
    FiShoppingBag,
    FiDownload,
    FiShare2,
    FiCopy
} from 'react-icons/fi';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const trxid = searchParams.get("trxid");
    const axiosSeecure = useAxiosSecure();
    const { user } = useAuth();
    const [copied, setCopied] = useState("");

    const { data, isLoading, refetch, isError } = useQuery({
        queryKey: ['paymentSuccess', trxid],
        queryFn: async () => {
            const res = await axiosSeecure.get(`/products/transaction/${trxid}`)
            return res.data;
        },
        enabled: !!trxid && !!user?.email
    })

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    if (isError) {
        return <div className='text-5xl text-center font-bold text-red-500'>Error loading payment details.</div>;
    }

    const { paymentInfo, productInfo, updateProductQuantity } = data;

    const formatDate = (dateString) =>
        new Date(dateString).toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(text);
        setTimeout(() => setCopied(""), 2000);
    };


    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const pulseVariants = {
        animate: {
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.2, 0.4],
            transition: { duration: 2, repeat: Infinity }
        }
    };

    return (
        <div className=" py-10 px-4">
            <motion.div
                className="container mx-auto"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Header */}
                <motion.div className="text-center mb-10" variants={itemVariants}>
                    <div className="relative inline-flex mb-6">
                        <motion.div
                            className="absolute inset-0 w-32 h-32 rounded-full bg-primary/20"
                            variants={pulseVariants}
                            animate="animate"
                        />
                        <div className="relative w-24 h-24 rounded-full bg-primary flex items-center justify-center shadow-xl">
                            <FiCheckCircle className="w-14 h-14 text-primary-foreground" />
                        </div>
                    </div>

                    <h1 className="text-4xl font-bold text-foreground mb-2">
                        Payment Successful
                    </h1>
                    <p className="text-muted-foreground">
                        Your order has been placed successfully.
                    </p>
                </motion.div>

                <div className='grid grid-cols-1 md:grid-cols-2'>
                    {/* Product Card */}
                    <div className="mb-6 border rounded-lg shadow md:max-w-10/12 mx-auto bg-white">
                        <div className="flex flex-col md:flex-row gap-1 p-5">
                            <img
                                src={productInfo.images[0]}
                                alt={productInfo.name}
                                className="md:w-70  rounded-lg object-cover"
                            />
                            <div className="flex-1">
                                <span className="badge bg-primary/40 text-secondary mb-2">{productInfo.category}</span>
                                <h3 className="text-xl font-semibold">{productInfo.name}</h3>
                                <p className="text-sm text-muted-foreground mt-1 max-w-10/2">
                                    {productInfo.shortDescription}
                                </p>

                                <div className="flex items-center gap-3 mt-3 mb-3">
                                    <span className="text-sm">Color:</span>
                                    <span
                                        className="w-5 h-5 rounded-full border"
                                        style={{ backgroundColor: paymentInfo.color }}
                                    />
                                </div>
                                <hr className='border border-gray-500 ' />

                                <div className="flex justify-between mt-4 font-medium">
                                    <span>Qty: {paymentInfo.quantity}</span>
                                    <span className="text-primary">
                                        ${paymentInfo.totalAmount}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Transaction */}
                    <div className="mb-6 border rounded-lg shadow md:max-w-10/12  bg-white">
                        <div className="p-5 space-y-4">
                            <h3 className="font-semibold flex items-center text-primary text-2xl gap-2">
                                <FiCreditCard /> Transaction Details
                            </h3>

                            <div className="flex flex-col justify-between items-start gap-2 bg-base-100 p-3 rounded-3xl border-2 border-primary w-fit">
                                <span className="font-medium">Transaction ID:</span>
                                <div className='flex justify-center items-center gap-5'>
                                    <code className="text-sm font-bold">{paymentInfo.transactionID}</code>
                                    <button
                                        onClick={() => handleCopy(`${paymentInfo.transactionID}`)}
                                        className='text-neutral-400 hover:text-primary transition-colors relative cursor-pointer'
                                        title='Copy to clipboard'
                                    >
                                        <FiCopy size={18} />
                                        {copied === `${paymentInfo.transactionID}` && (
                                            <span className='absolute -top-2.5 left-18 -translate-x-1/2 text-base text-primary whitespace-nowrap bg-primary/70 px-2 py-1 rounded'>
                                                Copied!
                                            </span>
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className='divider'></div>

                            <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                        <FiUser className="w-4 h-4 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">Customer</p>
                                        <p className="font-medium text-foreground">{paymentInfo.userName}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                        <FiMail className="w-4 h-4 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">Email</p>
                                        <p className="font-medium text-foreground text-sm break-all">{paymentInfo.email}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                        <FiCalendar className="w-4 h-4 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">Date & Time</p>
                                        <p className="font-medium text-foreground text-sm">{formatDate(paymentInfo.date)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* delivary status */}
                    <div className="border border-primary rounded-lg shadow md:max-w-10/12  bg-white md:ml-16 backdrop-blur-sm">
                        <div className="p-5 md:p-6">
                            <h3 className="text-lg font-semibold text-foreground mb-5 flex items-center gap-2">
                                <FiPackage className="w-5 h-5 text-primary" />
                                Order Status
                            </h3>

                            <div className="relative">
                                {/* Timeline line */}
                                <div className="absolute left-2.75 top-6 bottom-6 w-0.5 bg-linear-to-b from-green-500 via-primary to-muted" />

                                {/* Timeline items */}
                                <div className="space-y-6">
                                    {[
                                        { label: "Order Placed", status: "complete", time: "Just now" },
                                        { label: "Payment Confirmed", status: "complete", time: "Just now" },
                                        { label: "Processing", status: "current", time: "In progress" },
                                        { label: "Shipped", status: "pending", time: "Estimated 2-3 days" },
                                        { label: "Delivered", status: "pending", time: "Estimated 5-7 days" }
                                    ].map((step, index) => (
                                        <div key={index} className="flex items-start gap-4">
                                            <div className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center ${step.status === 'complete'
                                                    ? 'bg-green-500 text-white'
                                                    : step.status === 'current'
                                                        ? 'bg-primary text-primary-foreground animate-pulse'
                                                        : 'bg-muted border-2 border-border'
                                                }`}>
                                                {step.status === 'complete' && (
                                                    <FiCheckCircle className="w-3.5 h-3.5" />
                                                )}
                                                {step.status === 'current' && (
                                                    <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                                                )}
                                            </div>
                                            <div className="flex-1 pb-0">
                                                <p className={`font-medium ${step.status === 'pending' ? 'text-muted-foreground' : 'text-foreground'
                                                    }`}>
                                                    {step.label}
                                                </p>
                                                <p className="text-sm text-muted-foreground">{step.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </motion.div>
        </div>
    );
};

export default PaymentSuccess;