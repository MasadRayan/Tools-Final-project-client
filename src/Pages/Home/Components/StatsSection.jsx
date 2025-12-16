import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Fade, Zoom } from "react-awesome-reveal";
import { FiUsers, FiPackage, FiGlobe } from "react-icons/fi";
import { MdOutlineCategory } from "react-icons/md";
import CountUp from "react-countup";

const StatsSection = () => {
    const data = {
        totalUsers: 100,
        totalOrders: 20,
        totalProducts: 40,
        totalCategories: 8
    };

    const { totalUsers, totalOrders, totalProducts, totalCategories } = data;

    const ref = useRef(null);
    const inView = useInView(ref, { amount: 0.3, once: false });

    return (
        <section className="py-20 bg-linear-to-r from-primary/95 via-primary/90 to-accent/40 relative overflow-hidden">
            {/* Decorative Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-32 h-32 border border-black rounded-full" />
                <div className="absolute bottom-10 right-1 w-48 h-48 border border-black rounded-full" />
                <div className="absolute top-1/2 left-1/4 w-24 h-24 border border-black rounded-full" />
            </div>

            <div className="container-buynest relative z-10">
                {/* Header */}
                <Fade direction="up" triggerOnce>
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-base-100">
                            Our Journey in Numbers
                        </h2>
                        <p className="text-base-100/80 mt-4 max-w-2xl mx-auto">
                            These milestones reflect our growth, trust, and commitment to excellence.
                        </p>
                    </div>
                </Fade>

                {/* Stats Grid */}
                <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-8 container mx-auto">
                    <Zoom triggerOnce>
                        <motion.div whileHover={{ scale: 1.05 }} className="text-center">
                            <div className="w-20 h-20 mx-auto rounded-2xl bg-secondary flex items-center justify-center mb-6">
                                <FiUsers className="text-primary text-3xl" />
                            </div>
                            <div className="text-4xl md:text-5xl font-bold text-base-100 mb-2">
                                {inView && <CountUp end={totalUsers} duration={3} />}+
                            </div>
                            <p className="text-base-100/80 font-medium">Total Users</p>
                        </motion.div>
                    </Zoom>

                    <Zoom triggerOnce>
                        <motion.div whileHover={{ scale: 1.05 }} className="text-center">
                            <div className="w-20 h-20 mx-auto rounded-2xl bg-green-500/40 flex items-center justify-center mb-6">
                                <FiPackage className="text-green-500 text-3xl" />
                            </div>
                            <div className="text-4xl md:text-5xl font-bold text-base-100 mb-2">
                                {inView && <CountUp end={totalOrders} duration={3} />}+
                            </div>
                            <p className="text-base-100/80 font-medium">Total Orders</p>
                        </motion.div>
                    </Zoom>

                    <Zoom triggerOnce>
                        <motion.div whileHover={{ scale: 1.05 }} className="text-center">
                            <div className="w-20 h-20 mx-auto rounded-2xl bg-purple-500/30 flex items-center justify-center mb-6">
                                <FiGlobe className="text-purple-800 text-3xl" />
                            </div>
                            <div className="text-4xl md:text-5xl font-bold text-base-100 mb-2">
                                {inView && <CountUp end={totalProducts} duration={3} />}+
                            </div>
                            <p className="text-base-100/80 font-medium">Total Products</p>
                        </motion.div>
                    </Zoom>

                    <Zoom triggerOnce>
                        <motion.div whileHover={{ scale: 1.05 }} className="text-center">
                            <div className="w-20 h-20 mx-auto rounded-2xl bg-red-500/40 flex items-center justify-center mb-6">
                                <MdOutlineCategory className="text-red-700 text-3xl" />
                            </div>
                            <div className="text-4xl md:text-5xl font-bold text-base-100 mb-2">
                                {inView && <CountUp end={totalCategories} duration={3} />}+
                            </div>
                            <p className="text-base-100/80 font-medium">Total Categories</p>
                        </motion.div>
                    </Zoom>
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
