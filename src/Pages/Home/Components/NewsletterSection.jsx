import { useState } from "react";
import { motion } from "framer-motion";
import { Fade, Zoom } from "react-awesome-reveal";
import { FiMail, FiSend, FiGift, FiPercent, FiBell } from "react-icons/fi";
import toast from "react-hot-toast";

const benefits = [
    { icon: FiGift, text: "Exclusive offers" },
    { icon: FiPercent, text: "Special discounts" },
    { icon: FiBell, text: "Early access" },
];

const NewsletterSection = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email) return;

        toast.success(
            "Successfully subscribed! Check your email for a welcome gift.",
            {
                duration: 4000,
                style: {
                    background: "#EFECE3",
                    color: "#1B3C53",
                    padding: '16px',
                    border: "1px solid #4A70A9",
                },
                iconTheme: {
                    primary: "#4A70A9",
                    secondary: "#EFECE3",
                },
            }
        );

        setEmail("");
    };

    return (
        <section className="pb-20 bg-base-100 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full -translate-x-1/2 translate-y-1/2" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-base-100 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden border border-secondary/10">
                        {/* Decorative Pattern */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-4 left-4 w-20 h-20 border-2 border-secondary rounded-full" />
                            <div className="absolute bottom-4 right-4 w-32 h-32 border-2 border-secondary rounded-full" />
                            <div className="absolute top-1/2 right-1/4 w-16 h-16 border-2 border-secondary rounded-full" />
                        </div>

                        <div className="relative z-10">
                            {/* Icon */}
                            <Zoom  >
                                <div className="w-20 h-20 mx-auto rounded-2xl bg-primary flex items-center justify-center mb-6">
                                    <FiMail className="text-white text-3xl" />
                                </div>
                            </Zoom>

                            {/* Content */}
                            <Fade direction="up"  >
                                <div className="text-center mb-8">
                                    <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
                                        Stay in the Loop
                                    </h2>
                                    <p className="text-accent max-w-xl mx-auto">
                                        Subscribe to our newsletter and get updates on new arrivals,
                                        exclusive deals, and special promotions.
                                    </p>
                                </div>
                            </Fade>

                            {/* Benefits */}
                            <Fade direction="up" delay={100}  >
                                <div className="flex flex-wrap justify-center gap-6 mb-8">
                                    {benefits.map((benefit, index) => (
                                        <motion.div
                                            key={benefit.text}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="flex items-center gap-2 text-secondary"
                                        >
                                            <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center">
                                                <benefit.icon
                                                    className="text-primary"
                                                    size={16}
                                                />
                                            </div>
                                            <span className="font-medium">{benefit.text}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </Fade>

                            {/* Form */}
                            <Fade direction="up" delay={200}  >
                                <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <div className="relative grow">
                                            <FiMail
                                                className="absolute left-4 top-1/2 -translate-y-1/2 text-accent"
                                                size={20}
                                            />
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Enter your email"
                                                required
                                                className="w-full pl-12 pr-4 py-3 rounded-lg bg-white border border-secondary/20 focus:outline-none focus:border-primary text-secondary"
                                            />
                                        </div>

                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            type="submit"
                                            className="px-6 py-3 rounded-lg bg-primary text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition"
                                        >
                                            Subscribe <FiSend size={18} />
                                        </motion.button>
                                    </div>

                                    <p className="text-sm text-accent text-center mt-4">
                                        By subscribing, you agree to our Privacy Policy. Unsubscribe
                                        anytime.
                                    </p>
                                </form>
                            </Fade>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewsletterSection;