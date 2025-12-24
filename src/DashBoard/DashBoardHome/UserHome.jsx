import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import {
    ShoppingBag,
    CreditCard,
    Truck,
    CheckCircle2,
    Clock,
    Package,
    ArrowUpRight,
    Sparkles,
    TrendingUp,
    Calendar,
    MapPin,
    ChevronRight,
    ArrowLeft
} from 'lucide-react';

const UserHome = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [greeting] = useState(() => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    });
    const { data, isLoading, isError } = useQuery({
        queryKey: ['userDashboard', user?.email],
        queryFn: async () => {
            if (!user || !user.email) {
                return;
            }
            const res = await axiosSecure.get(`userDashboard/aggregate/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,
        onError: (error) => {
            console.error('Error fetching user role:', error);
        },
    })

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    if (isError) {
        return <div className='text-5cl text-red-500 font-bold text-center py-100'>User Data Not Found</div>
    }

    const { totalPayments, totalOrders, recentOrders, recentPayments, deliveredOrders, totalMoneySpent, userInfo } = data;

    console.log({
        totalPayments, totalOrders, recentOrders, recentPayments, deliveredOrders, totalMoneySpent, userInfo
    });



    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const getStatusConfig = (status) => {
        switch (status) {
            case 'delivered':
                return { color: 'bg-gray-500/10 text-gray-600 border-gray-500/20', icon: Package };
            case 'success':
                return { color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20', icon: CheckCircle2 };
        }
    };


    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100">
            {/* Decorative Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-linear-to-br from-violet-400/20 to-fuchsia-400/20 rounded-full blur-3xl" />
                <div className="absolute top-1/2 -left-40 w-96 h-96 bg-linear-to-br from-cyan-400/15 to-blue-400/15 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-linear-to-br from-amber-400/10 to-orange-400/10 rounded-full blur-3xl" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10"
                >
                    <div className="flex items-center gap-5">
                        <Link
                            to="/"
                            className="p-2.5 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
                        >
                            <ArrowLeft className="w-5 h-5 text-slate-600" />
                        </Link>
                        <div className="relative">
                            <div className="absolute inset-0 bg-linear-to-br from-violet-500 to-fuchsia-500 rounded-2xl blur-lg opacity-40" />
                            <img
                                src={userInfo.photoURL}
                                alt={userInfo.displayName}
                                className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover ring-4 ring-white shadow-xl"
                            />
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                                <Sparkles className="w-3 h-3 text-white" />
                            </div>
                        </div>
                        <div>
                            <p className="text-slate-500 text-sm font-medium">{greeting}</p>
                            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">{userInfo.displayName}</h1>
                            <p className="text-slate-400 text-sm mt-0.5 flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5" />
                                Member since {formatDate(userInfo.createdAt)}
                            </p>
                        </div>
                    </div>

                    {/* Loyalty Points Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="bg-linear-to-r from-violet-600 via-purple-600 to-fuchsia-600 rounded-2xl p-5 text-white shadow-xl shadow-violet-500/20"
                    >
                        <div className="flex items-center justify-between gap-8">

                            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                                <TrendingUp className="w-7 h-7" />
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Stats Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10"
                >
                    {[
                        { label: 'Total Orders', value: totalOrders, icon: ShoppingBag, gradient: 'from-blue-500 to-cyan-500', shadow: 'shadow-blue-500/20' },
                        { label: 'Total Spent', value: formatCurrency(totalMoneySpent), icon: CreditCard, gradient: 'from-emerald-500 to-teal-500', shadow: 'shadow-emerald-500/20' },
                        { label: 'Delivered', value: deliveredOrders, icon: CheckCircle2, gradient: 'from-violet-500 to-purple-500', shadow: 'shadow-violet-500/20' },

                    ].map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + index * 0.05 }}
                            className={`group relative bg-white rounded-2xl p-5 shadow-lg ${stat.shadow} hover:shadow-xl transition-all duration-300 overflow-hidden`}
                        >
                            <div className={`absolute top-0 right-0 w-24 h-24 bg-linear-to-br ${stat.gradient} opacity-5 rounded-full -translate-y-8 translate-x-8 group-hover:scale-150 transition-transform duration-500`} />
                            <div className={`w-11 h-11 bg-linear-to-br ${stat.gradient} rounded-xl flex items-center justify-center mb-4 shadow-lg ${stat.shadow}`}>
                                <stat.icon className="w-5 h-5 text-white" />
                            </div>
                            <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
                            <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Recent Orders */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="lg:col-span-2 bg-white rounded-2xl shadow-lg shadow-slate-200/50 overflow-hidden"
                    >
                        <div className="p-6 border-b border-slate-100">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                                        <Package className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-bold text-slate-900">Recent Orders</h2>
                                        <p className="text-slate-400 text-sm">Your latest purchases</p>
                                    </div>
                                </div>
                                <Link to={'/dashboard/myOrders'}>
                                    <button className="flex items-center gap-1 text-sm font-medium text-violet-600 hover:text-violet-700 transition-colors">
                                        View All
                                        <ArrowUpRight className="w-4 h-4" />
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {recentOrders.map((order, index) => {
                                const statusConfig = getStatusConfig(order.status);
                                const StatusIcon = statusConfig.icon;
                                
                                    <motion.div
                                        key={order.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 + index * 0.1 }}
                                        className="p-5 hover:bg-slate-50/50 transition-colors group cursor-pointer"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="relative">
                                                <img
                                                    src={order?.productImage}
                                                    alt={order?.productName}
                                                    className="w-16 h-16 rounded-xl object-cover ring-2 ring-slate-100"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold text-slate-900 truncate group-hover:text-violet-600 transition-colors">
                                                    {order?.productName}
                                                </h3>
                                                <p className="text-slate-400 text-sm mt-0.5">{order?._id}</p>
                                                <div className="flex items-center gap-3 mt-2">
                                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${statusConfig.color}`}>
                                                        <StatusIcon className="w-3.5 h-3.5" />
                                                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                    </span>
                                                    <span className="text-slate-400 text-xs flex items-center gap-1">
                                                        <Calendar className="w-3.5 h-3.5" />
                                                        {formatDate(order.date)}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-lg font-bold text-slate-900">{formatCurrency(order.totalAmount)}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                            })}
                        </div>
                    </motion.div>

                    {/* Recent Payments */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 overflow-hidden"
                    >
                        <div className="p-6 border-b border-slate-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-linear-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                                    <CreditCard className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-slate-900">Payments</h2>
                                    <p className="text-slate-400 text-sm">Transaction history</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 space-y-3">
                            {recentPayments.map((payment, index) => {
                                const statusConfig = getStatusConfig(payment.status);
                                return (
                                    <motion.div
                                        key={payment.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 + index * 0.1 }}
                                        className="p-4 rounded-xl bg-slate-50 hover:bg-slate-100/80 transition-colors cursor-pointer group"
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-semibold text-slate-900 group-hover:text-violet-600 transition-colors">
                                                {formatCurrency(payment.totalAmount)}
                                            </span>
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${statusConfig.color}`}>
                                                {payment.status}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-slate-500">BKash</span>
                                            <span className="text-slate-400 flex items-center gap-1">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {formatDate(payment.date)}
                                            </span>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                        <div className="p-4 border-t border-slate-100">
                            <Link to={'/dashboard/paymentHistory'}>
                                <button className="w-full py-2.5 text-sm font-medium text-violet-600 hover:text-violet-700 hover:bg-violet-50 rounded-xl transition-colors flex items-center justify-center gap-1">
                                    View All Transactions
                                    <ArrowUpRight className="w-4 h-4" />
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Quick Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
                >
                    {[
                        { label: 'Track Order', icon: MapPin, color: 'from-rose-500 to-pink-500', path: '#' },
                        { label: 'Order History', icon: ShoppingBag, color: 'from-blue-500 to-indigo-500', path: '/dashboard/myOrders' },
                        { label: 'Payment Methods', icon: CreditCard, color: 'from-emerald-500 to-green-500', path: '#' },
                        { label: 'Get Support', icon: Sparkles, color: 'from-amber-500 to-orange-500', path: '/contact' },
                    ].map((action, index) => (
                        <Link key={action.label} className='w-full' to={action.path}>
                            <motion.button

                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.6 + index * 0.05 }}
                                className="group relative bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden w-full flex flex-col items-center justify-center"
                            >
                                <div className={`absolute inset-0 bg-linear-to-br ${action.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                                <div className={`w-10 h-10 bg-linear-to-br ${action.color} rounded-lg flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    <action.icon className="w-5 h-5 text-white" />
                                </div>
                                <p className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">{action.label}</p>
                            </motion.button>
                        </Link>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default UserHome;