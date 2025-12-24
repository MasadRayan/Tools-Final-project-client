import React, { useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner';
import { motion } from 'framer-motion';
import {
    Users,
    Package,
    ShoppingCart,
    CreditCard,
    DollarSign,
    TrendingUp,
    TrendingDown,
    CheckCircle2,
    Clock,
    ArrowUpRight,
    ArrowDownRight,
    BarChart3,
    Activity,
    Zap,
    Target,
    RefreshCw,
    Bell
} from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
    Legend,
    RadialBarChart,
    RadialBar
} from 'recharts';
import { Link, ScrollRestoration } from 'react-router';
import useAuth from '../../Hooks/useAuth';

const AdminHome = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth()

    const { data, refetch, isLoading, isError } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin/aggregate-data');
            return res.data;
        }
    })

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    if (isError) {
        return <div className='text-5xl text-center font-black text-red-500'>Error loading admin stats</div>
    }

    const totalAmount = data?.totalAmountEarned || 0;
    const totalUsers = data?.totalUsers || 0;
    const totalProduct = data?.totalProduct || 0;
    const totalOrders = data?.totalOrders || 0;
    const totalPayments = data?.totalPayments || 0;
    const totalSuccessFulDelivary = data?.totalSuccessFulDelivary || 0;
    const totalIncomeLast7Days = data?.totalIncomeLast7Days || 0;

    const revenueData = data?.revenueData || [];
    const monthlyData = data?.monthlyData || [];
    const orderStatusData = data?.orderStatusData || [];
    const recentOrders = data?.recentOrders || [];



    const colors = ['#4ade80', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#83a6ed', '#f472b6', '#fbbf24'];

    const newOrder = orderStatusData.map((order, index) => ({
        ...order,
        fill: colors[index]
    }));

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    };

    const formatNumber = (value) => {
        if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
        if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
        return value;
    };
    const stats = [
        {
            title: 'Total Revenue',
            value: formatCurrency(totalAmount),
            change: '+12.5%',
            trend: 'up',
            icon: DollarSign,
            color: 'from-emerald-500 to-teal-600',
            bgColor: 'bg-emerald-500/10',
            iconColor: 'text-emerald-500'
        },
        {
            title: 'Total Users',
            value: formatNumber(totalUsers),
            change: '+8.2%',
            trend: 'up',
            icon: Users,
            color: 'from-blue-500 to-indigo-600',
            bgColor: 'bg-blue-500/10',
            iconColor: 'text-blue-500'
        },
        {
            title: 'Total Orders',
            value: formatNumber(totalOrders),
            change: '+23.1%',
            trend: 'up',
            icon: ShoppingCart,
            color: 'from-purple-500 to-pink-600',
            bgColor: 'bg-purple-500/10',
            iconColor: 'text-purple-500'
        },
        {
            title: 'Total Products',
            value: formatNumber(totalProduct),
            change: '+5.4%',
            trend: 'up',
            icon: Package,
            color: 'from-orange-500 to-amber-600',
            bgColor: 'bg-orange-500/10',
            iconColor: 'text-orange-500'
        },
        {
            title: 'Total Payments',
            value: formatNumber(totalPayments),
            change: '+18.7%',
            trend: 'up',
            icon: CreditCard,
            color: 'from-cyan-500 to-blue-600',
            bgColor: 'bg-cyan-500/10',
            iconColor: 'text-cyan-500'
        },
        {
            title: 'Delivered Orders',
            value: formatNumber(totalSuccessFulDelivary),
            change: '+15.3%',
            trend: 'up',
            icon: CheckCircle2,
            color: 'from-green-500 to-emerald-600',
            bgColor: 'bg-green-500/10',
            iconColor: 'text-green-500'
        }
    ];

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-primary/40 backdrop-blur-xl border border-border rounded-xl p-4 shadow-lg">
                    <p className="font-semibold text-secondary mb-2">{label}</p>
                    {payload.map((entry, index) => (
                        <p key={index} className="text-sm" style={{ color: 'black' }}>
                            {entry.name}: {entry.name.includes('revenue') || entry.name.includes('sales')
                                ? formatCurrency(entry.value)
                                : entry.value}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08, delayChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <div className="min-h-screen bg-background px-10">
            {/* Header */}
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border"
            >
                <div className="container-buynest py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
                                Dashboard Overview
                            </h1>
                            <p className="text-muted-foreground text-sm mt-1">
                                Welcome back! <strong>{user.displayName}</strong> Here's what's happening with your store.
                            </p>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium transition-all hover:shadow-buynest-hover"
                        >
                            <Bell size={24} />
                        </motion.button>
                    </div>
                </div>
            </motion.header>

            <main className="container-buynest py-8">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-8"
                >
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.title}
                                variants={itemVariants}
                                whileHover={{ y: -4, scale: 1.02 }}
                                className="relative overflow-hidden bg-card rounded-2xl p-5 border border-border shadow-buynest-card hover:shadow-buynest-hover transition-all duration-300"
                            >
                                {/* Gradient Accent */}
                                <div className={`absolute top-0 left-0 right-0 h-1 bg-linear-to-r ${stat.color}`} />

                                <div className="flex items-start justify-between mb-3">
                                    <div className={`p-2.5 rounded-xl ${stat.bgColor}`}>
                                        <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
                                    </div>
                                    <div className={`flex items-center gap-1 text-xs font-medium ${stat.trend === 'up' ? 'text-emerald-500' : 'text-red-500'
                                        }`}>
                                        {stat.trend === 'up' ? (
                                            <ArrowUpRight className="w-3 h-3" />
                                        ) : (
                                            <ArrowDownRight className="w-3 h-3" />
                                        )}
                                        {stat.change}
                                    </div>
                                </div>

                                <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider mb-1">
                                    {stat.title}
                                </p>
                                <p className="text-xl font-bold text-foreground">
                                    {stat.value}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* 7-Day Income Highlight */}
                    <motion.div
                        variants={itemVariants}
                        className="relative overflow-hidden bg-linear-to-r from-primary via-primary/90 to-secondary rounded-2xl p-6 md:p-8"
                    >
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />

                        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
                                    <Zap className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <p className="text-white/80 text-sm font-medium mb-1">Last 7 Days Income</p>
                                    <p className="text-3xl md:text-4xl font-bold text-white">
                                        {formatCurrency(totalIncomeLast7Days)}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3">
                                <TrendingUp className="w-5 h-5 text-emerald-300" />
                                <div>
                                    <p className="text-white/80 text-xs">vs last week</p>
                                    <p className="text-emerald-300 font-bold">+24.5%</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Charts Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Revenue Chart */}
                        <motion.div
                            variants={itemVariants}
                            className="lg:col-span-3  bg-card rounded-2xl p-6 border border-border shadow-buynest-card"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-foreground">Revenue Overview</h3>
                                    <p className="text-sm text-muted-foreground">Daily revenue for the past week</p>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 rounded-full">
                                    <Activity className="w-4 h-4 text-emerald-500" />
                                    <span className="text-sm font-medium text-emerald-500">Live</span>
                                </div>
                            </div>

                            <div className="h-75">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={revenueData}>
                                        <defs>
                                            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#4A70A9" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#4A70A9" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                                        <XAxis
                                            dataKey="name"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                                        />
                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                                            tickFormatter={(value) => `$${value / 1000}k`}
                                        />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Area
                                            type="monotone"
                                            dataKey="revenue"
                                            stroke="#4A70A9"
                                            strokeWidth={3}
                                            fill="url(#revenueGradient)"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </motion.div>


                    </div>

                    {/* Second Charts Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Monthly Sales vs Target */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-card rounded-2xl p-6 border border-border shadow-buynest-card"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-foreground">Sales vs Target</h3>
                                    <p className="text-sm text-muted-foreground">Monthly performance comparison</p>
                                </div>
                                <div className="flex items-center gap-4 text-xs">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-secondary" />
                                        <span className="text-muted-foreground">Sales</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-primary" />
                                        <span className="text-muted-foreground">Target</span>
                                    </div>
                                </div>
                            </div>

                            <div className="h-70">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={monthlyData} barCategoryGap="20%">
                                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                                        <XAxis
                                            dataKey="month"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: 'hsl(var(--primary))', fontSize: 12 }}
                                        />
                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: 'hsl(var(--primary))', fontSize: 12 }}
                                            tickFormatter={(value) => `$${value / 1000}k`}
                                        />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Bar dataKey="sales" name="Sales" fill="#1B3C53" radius={[4, 4, 0, 0]} />
                                        <Bar dataKey="target" name="Target" fill="#4A70A9" radius={[4, 4, 0, 0]} />

                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </motion.div>

                        {/* Order Status */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-card rounded-2xl p-6 border  shadow-lg"
                        >
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-foreground">Order Status</h3>
                                <p className="text-sm text-muted-foreground">Current order distribution</p>
                            </div>

                            <div className="flex items-center gap-8 h-full w-full">
                                <div style={{ width: 256, height: 256 }}> {/* 256px = h-64/w-64 */}
                                    <ResponsiveContainer width="100%" aspect={1}>
                                        <RadialBarChart
                                            cx="50%"
                                            cy="50%"
                                            innerRadius="30%"
                                            outerRadius="100%"
                                            data={newOrder}
                                            startAngle={90}
                                            endAngle={-270}
                                        >
                                            <RadialBar
                                                dataKey="value"
                                                cornerRadius={10}
                                            />
                                        </RadialBarChart>
                                    </ResponsiveContainer>
                                </div>


                                <div className="flex-1 space-y-4">
                                    {newOrder.map((status) => (
                                        <div key={status.name} className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <div
                                                        className="w-3 h-3 rounded-full"
                                                        style={{ backgroundColor: status.fill }}
                                                    />
                                                    <span className="text-sm font-medium text-foreground">{status.name}</span>
                                                </div>
                                                <span className="text-sm font-bold text-foreground">{status.value}%</span>
                                            </div>
                                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${status.value}%` }}
                                                    transition={{ duration: 1, delay: 0.5 }}
                                                    className="h-full rounded-full"
                                                    style={{ backgroundColor: status.fill }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Bottom Section */}
                    <div className="grid grid-cols-1  gap-6">
                        {/* Recent Orders */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-card rounded-2xl p-6 border border-border shadow-buynest-card"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-foreground">Recent Orders</h3>
                                    <p className="text-sm text-muted-foreground">Latest transactions</p>
                                </div>
                                <Link to={'/dashboard/allOrders'} className="text-sm text-primary font-medium hover:underline">
                                    View All
                                </Link>
                            </div>

                            <div className="space-y-4">
                                {recentOrders.map((order, index) => (
                                    <motion.div
                                        key={order.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${order.status === 'delivered'
                                                ? 'bg-emerald-500/10 text-emerald-500'
                                                : order.status === 'processing'
                                                    ? 'bg-blue-500/10 text-blue-500'
                                                    : 'bg-amber-500/10 text-amber-500'
                                                }`}>
                                                {order.status === 'delivered' ? (
                                                    <CheckCircle2 className="w-5 h-5" />
                                                ) : (
                                                    <Clock className="w-5 h-5" />
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-medium text-foreground">{order.customer}</p>
                                                <p className="text-xs text-muted-foreground">{order.id} • {order.time}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold text-foreground">${order.amount.toFixed(2)}</p>
                                            <span className={`text-xs px-2 py-0.5 rounded-full ${order.status === 'delivered'
                                                ? 'bg-emerald-500/10 text-emerald-500'
                                                : order.status === 'processing'
                                                    ? 'bg-blue-500/10 text-blue-500'
                                                    : 'bg-amber-500/10 text-amber-500'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>


                    </div>

                    {/* Quick Stats Footer */}
                    <motion.div
                        variants={itemVariants}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4"
                    >
                        {[
                            { label: 'Avg. Order Value', value: '$127.50', icon: Target, color: 'text-blue-500' },
                            { label: 'Conversion Rate', value: '3.24%', icon: TrendingUp, color: 'text-emerald-500' },
                            { label: 'Total Reviews', value: '47', icon: Clock, color: 'text-amber-500' },
                            { label: 'Active Users', value: totalUsers, icon: Activity, color: 'text-purple-500' }
                        ].map((stat) => (
                            <div
                                key={stat.label}
                                className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border"
                            >
                                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                                <div>
                                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                                    <p className="font-bold text-foreground">{stat.value}</p>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </main>
            <ScrollRestoration></ScrollRestoration>
        </div>
    );
};

export default AdminHome;