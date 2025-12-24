import React from 'react';
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
    RefreshCw
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

const AdminHome = () => {
    const axiosSecure = useAxiosSecure();

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
    const totalIncomeLast7Days = data?.totalIncomeLast7Days || 0;

    const revenueData = data?.revenueData || [];
    const monthlyData = data?.monthlyData || [];
    const orderStatusData = data?.orderStatusData || [];
    const recentOrders = data?.recentOrders || [];

    console.log(totalAmount, totalUsers, totalProduct, totalOrders, totalPayments, totalIncomeLast7Days, monthlyData, orderStatusData, recentOrders, revenueData);

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
        return value.toString();
    };

    return (
        <div>

        </div>
    );
};

export default AdminHome;