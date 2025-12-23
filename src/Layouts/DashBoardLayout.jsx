import { FiHome, FiUser, FiBookOpen, FiX, FiCheckCircle, FiUsers, FiLayers, FiPlusCircle, FiCreditCard } from 'react-icons/fi';
import React, { useRef } from 'react';
import useUserRole from '../Hooks/useUserRole';
import { Link, Outlet, NavLink, ScrollRestoration } from 'react-router';
import { motion } from 'framer-motion';
import { IoIosAddCircleOutline } from "react-icons/io";

const DashBoardLayout = () => {
    const { role, roleLoading } = useUserRole();
    const drawerRef = useRef();
    const closeDrawer = () => {
        if (drawerRef.current) {
            drawerRef.current.checked = false;
        }
    };
    return (
        <div className="drawer lg:drawer-open">
            {/* Checkbox controlling the drawer */}
            <input
                id="dashboard-drawer"
                type="checkbox"
                className="drawer-toggle"
                ref={drawerRef}
            />

            <div className="drawer-content flex flex-col">
                {/* Top navbar for small devices */}
                <div className="navbar bg-base-300 w-full lg:hidden shadow-md">
                    <div className="flex-none">
                        <label htmlFor="dashboard-drawer" className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </label>
                    </div>
                    <Link to="/" className="flex items-center gap-2 group">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2"
                        >
                            <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                                <span className="text-white font-bold text-xl">
                                    B
                                </span>
                            </div>
                            <span className="font-serif text-2xl font-bold text-secondary">
                                Buy<span className="text-primary">Nest</span>
                            </span>
                        </motion.div>
                    </Link>
                </div>

                {/* Page content */}
                <Outlet />
            </div>

            <div className="drawer-side">
                <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 shadow-lg rounded-r-2xl space-y-2">

                    {/* Logo with close X on small devices */}
                    <div className="flex items-center justify-between mb-6">
                        <div className='flex items-center gap-2'>
                            <Link to="/" className="md:flex items-center gap-2 group hidden">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-2"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                                        <span className="text-white font-bold text-xl">
                                            B
                                        </span>
                                    </div>
                                    <span className="font-serif text-2xl font-bold text-secondary">
                                        Buy<span className="text-primary">Nest</span>
                                    </span>
                                </motion.div>
                            </Link>
                            <button
                                onClick={closeDrawer}
                                className="cursor-pointer p-2 rounded-full hover:bg-base-300 transition lg:hidden"
                            >
                                <FiX className="text-2xl text-gray-600" />
                            </button>
                        </div>
                    </div>

                    {/* Nav Links */}
                    <li>
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-colors duration-200 hover:bg-primary hover:text-white `
                            }
                            onClick={closeDrawer}
                        >
                            <FiHome className="text-xl" /> Dashboard Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/profile"
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-colors duration-200 hover:bg-primary hover:text-white ${isActive ? 'bg-primary text-white' : ''}`
                            }
                            onClick={closeDrawer}
                        >
                            <FiUser className="text-xl" /> My Profile
                        </NavLink>
                    </li>

                    {/* user layout */}
                    {
                        !roleLoading && role === 'user' &&
                        <>
                            <li>
                                <NavLink
                                    to="/dashboard/myOrders"
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-colors duration-200 hover:bg-primary hover:text-white ${isActive ? 'bg-primary text-white' : ''}`
                                    }
                                    onClick={closeDrawer}
                                >
                                    <FiBookOpen className="text-xl" /> My Orders
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard/paymentHistory"
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-colors duration-200 hover:bg-primary hover:text-white ${isActive ? 'bg-primary text-white' : ''}`
                                    }
                                    onClick={closeDrawer}
                                >
                                    <FiCreditCard className="text-xl" /> Payment History
                                </NavLink>
                            </li>

                        </>
                    }

                    {/* Admin Layout */}
                    {
                        !roleLoading && role === 'admin' &&
                        <>
                            <li>
                                <NavLink
                                    to="/dashboard/allUsers"
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-colors duration-200 hover:bg-primary hover:text-white ${isActive ? 'bg-primary text-white' : ''}`
                                    }
                                    onClick={closeDrawer}
                                >
                                    < FiUsers className="text-xl" /> All User
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to="/dashboard/allOrders"
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-colors duration-200 hover:bg-primary hover:text-white ${isActive ? 'bg-primary text-white' : ''}`
                                    }
                                    onClick={closeDrawer}
                                >
                                    <FiCheckCircle className="text-xl" /> All Orders
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to="/dashboard/allProducts"
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-colors duration-200 hover:bg-primary hover:text-white ${isActive ? 'bg-primary text-white' : ''}`
                                    }
                                    onClick={closeDrawer}
                                >
                                    <FiLayers className="text-xl" /> All Products
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard/allPayments"
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-colors duration-200 hover:bg-primary hover:text-white ${isActive ? 'bg-primary text-white' : ''}`
                                    }
                                    onClick={closeDrawer}
                                >
                                    <FiCreditCard className="text-xl" /> All Payments 
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard/addProducts"
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-colors duration-200 hover:bg-primary hover:text-white ${isActive ? 'bg-primary text-white' : ''}`
                                    }
                                    onClick={closeDrawer}
                                >
                                    <IoIosAddCircleOutline className="text-xl" /> Add Products
                                </NavLink>
                            </li>

                        </>
                    }
                </ul>
            </div>

            <ScrollRestoration />
        </div>

    );
};

export default DashBoardLayout;