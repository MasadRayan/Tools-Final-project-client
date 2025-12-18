import { useState, useEffect } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
    FiMenu,
    FiX,
    FiShoppingCart,
    FiHeart,
    FiUser,
    FiSearch,
    FiChevronDown,
} from "react-icons/fi";
import { IoIosLogOut } from "react-icons/io";
import useAuth from "../../Hooks/useAuth";



const categories = [
    "Electronics",
    "Fashion",
    "Home & Living",
    "Beauty",
    "Sports",
    "Books",
];

const Navbar = () => {
    const { user, setUser, logOut } = useAuth()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [dashboartBtn, setDashboartBtn] = useState(false);

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Products", path: "/products" },
        { name: "Categories", path: "/categories", hasDropdown: true },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" },
    ];

    if (user) {
        navLinks.push({ name: "Dashboard", path: "/dashboard" });
    }

    const handleLogOut = async () => {
        try {
            await logOut();
            setUser(null);
            // window.location.reload();
            setDashboartBtn(false);
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <>
            <div className="hidden md:block bg-secondary text-white py-2 text-center text-sm font-medium">
                <div className="container-buynest">
                    Free Shipping on Orders Over $5000 | Use Code:{" "}
                    <span className="font-bold">BUYNEST20</span> for 20% Off!
                </div>
            </div>

            {/* Main Navbar */}
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={"sticky top-0 z-50 bg-transparent transition-all duration-300 px-2 backdrop-blur-2xl shadow-md"}
            >
                <div className="container-buynest">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
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

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <div
                                    key={link.name}
                                    className="relative"
                                    onMouseEnter={() =>
                                        link.hasDropdown && setActiveDropdown(link.name)
                                    }
                                    onMouseLeave={() => setActiveDropdown(null)}
                                >
                                    <div>
                                        <Link
                                            to={link.path}
                                            className="flex items-center gap-1 text-foreground font-medium hover:text-primary transition-colors duration-300 py-2"
                                        >
                                            {link.name}
                                            {link.hasDropdown && (
                                                <FiChevronDown
                                                    className={`transition-transform duration-300 ${activeDropdown === link.name ? "rotate-180" : ""
                                                        }`}
                                                />
                                            )}

                                        </Link>

                                    </div>

                                    {/* Dropdown Menu */}
                                    {link.hasDropdown && (
                                        <AnimatePresence>
                                            {activeDropdown === link.name && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="absolute bg-base-100 top-full left-0 mt-2 w-48 bg-card rounded-xl shadow-buynest-lg overflow-hidden"
                                                >
                                                    {categories.map((category) => (
                                                        <Link
                                                            key={category}
                                                            to={`/categories/${category.toLowerCase()}`}
                                                            className="block px-4 py-3 text-secondary hover:bg-muted hover:text-primary transition-colors duration-200"
                                                        >
                                                            {category}
                                                        </Link>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Action Icons */}
                        <div className="flex items-center gap-0 md:gap-4">

                            <div className="flex items-center gap-3 relative">
                                {
                                    user ? (<>
                                        <motion.div
                                            onClick={() => setDashboartBtn(!dashboartBtn)}
                                        >
                                            <img src={user.photoURL}
                                                alt={user.displayName}
                                                referrerPolicy="no-referrer"
                                                className="w-12 h-12 rounded-full object-cover cursor-pointer hover:scale-105 transition-all"
                                            />

                                            {/* Profile dropdown */}
                                            {dashboartBtn && (
                                                <div className="hidden md:flex absolute top-14 right-8 w-56 bg-base-100 border-4 border-primary shadow-lg rounded-xl p-4 z-50 flex-col gap-3">
                                                    <div className="text-center">
                                                        <p className="font-semibold text-lg">{user.displayName}</p>
                                                    </div>
                                                    <Link
                                                        to="/dashboard"
                                                        onClick={() => setDashboartBtn(false)}
                                                        className="btn btn-sm text-white bg-primary rounded-2xl py-5 text-base w-full"
                                                    >
                                                        Dashboard
                                                    </Link>
                                                </div>
                                            )}

                                        </motion.div>
                                        <div>
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={handleLogOut}
                                                className="hidden sm:flex items-center gap-2 btn bg-primary rounded-4xl text-white py-2 px-4"
                                            >
                                                <IoIosLogOut size={18} />
                                                <span>LogOut</span>
                                            </motion.button>
                                        </div>
                                    </>) :

                                        (<>
                                            <Link to={'/login'}>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className="hidden sm:flex items-center gap-2 btn bg-primary rounded-4xl text-white py-2 px-4"
                                                >
                                                    <FiUser size={18} />
                                                    <span>Login</span>
                                                </motion.button>
                                            </Link>
                                            <Link to={'/register'}>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className="hidden sm:flex items-center gap-2 btn bg-primary rounded-4xl text-white py-2 px-4"
                                                >
                                                    <FiUser size={18} />
                                                    <span>Register</span>
                                                </motion.button>
                                            </Link>
                                        </>)
                                }
                            </div>

                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
                            >
                                {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>



                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="lg:hidden border-t overflow-hidden bg-card"
                        >
                            <div className="container-buynest py-6 space-y-4">
                                {navLinks.map((link, index) => (
                                    <motion.div
                                        key={link.name}
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: index * 0.15 }}
                                    >
                                        <Link
                                            to={link.path}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="block py-3 text-lg font-medium text-foreground hover:text-primary transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                ))}

                                <motion.div
                                    initial={{ y: -20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: navLinks.length * 0.18 }}
                                    className="pt-4 border-t border-border flex gap-5 justify-center items-center"
                                >
                                    {
                                        user ?
                                            (<>
                                                <motion.div
                                                    initial={{ opacity: 0, y: -100 }}
                                                    animate={{ opacity: 1, y: 0 }}                                                   
                                                    className="flex justify-center items-center gap-5 "
                                                >
                                                    <div className="flex flex-col justify-center items-center gap-2">
                                                        <img src={user.photoURL}
                                                            alt={user.displayName}
                                                            referrerPolicy="no-referrer"
                                                            className="w-12 h-12 rounded-full"
                                                        />
                                                        <span className="text-lg font-bold">{user.displayName}</span>
                                                    </div>
                                                    <div>
                                                        <button
                                                        onClick={handleLogOut}
                                                            className="items-center gap-2 btn bg-primary rounded-4xl text-white py-2 px-4"
                                                        >
                                                            <IoIosLogOut size={18} />
                                                            <span>LogOut</span>
                                                        </button>
                                                    </div>

                                                </motion.div>
                                            </>)
                                            :
                                            (<>
                                                <Link to={'/login'}>
                                                    <button className=" flex-1 btn-buynest py-3 flex items-center justify-center gap-2">
                                                        <FiUser size={18} />
                                                        Login
                                                    </button>
                                                </Link>
                                                <Link to={'/register'}>
                                                    <button className=" flex-1 btn-buynest py-3 flex items-center justify-center gap-2">
                                                        <FiUser size={18} />
                                                        Register
                                                    </button>
                                                </Link>
                                            </>)
                                    }
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>
        </>
    );
};

export default Navbar;
