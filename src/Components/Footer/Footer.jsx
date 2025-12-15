
import { Link } from "react-router";
import { motion } from "framer-motion";
import {
    FiFacebook,
    FiTwitter,
    FiInstagram,
    FiMail,
    FiPhone,
    FiMapPin,
    FiSend,
    FiCreditCard,
    FiShield,
    FiTruck,
    FiHeadphones,
} from "react-icons/fi";
import { Fade } from "react-awesome-reveal";

const footerLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Categories", path: "/categories" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
]

const socialLinks = [
    { icon: FiFacebook, url: "#", label: "Facebook" },
    { icon: FiTwitter, url: "#", label: "Twitter" },
    { icon: FiInstagram, url: "#", label: "Instagram" },
];

const paymentMethods = ["Visa", "Mastercard", "PayPal", "Apple Pay"];

const Footer = () => {
    return (
        <footer className="bg-secondary text-base-100 ">
            {/* Features Bar */}
            <div className="border-b border-secondary-foreground/10 px-2 md:px-0">
                <div className="container mx-auto py-8 lg:px-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <Fade direction="up" triggerOnce>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                                    <FiTruck className="text-primary text-xl hover:animate-bounce transition-all hover:text-white" />
                                </div>
                                <div>
                                    <h4 className="font-semibold">Free Shipping</h4>
                                    <p className="text-sm text-secondary-foreground/70">
                                        On orders over $5000
                                    </p>
                                </div>
                            </div>
                        </Fade>

                        <Fade direction="up" delay={100} triggerOnce>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                                    <FiShield className="text-primary text-xl hover:animate-bounce transition-all hover:text-white" />
                                </div>
                                <div>
                                    <h4 className="font-semibold">Secure Payment</h4>
                                    <p className="text-sm text-secondary-foreground/70">
                                        100% protected
                                    </p>
                                </div>
                            </div>
                        </Fade>

                        <Fade direction="up" delay={200} triggerOnce>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                                    <FiHeadphones className="text-primary text-xl hover:animate-bounce transition-all hover:text-white" />
                                </div>
                                <div>
                                    <h4 className="font-semibold">24/7 Support</h4>
                                    <p className="text-sm text-secondary-foreground/70">
                                        Dedicated support
                                    </p>
                                </div>
                            </div>
                        </Fade>

                        <Fade direction="up" delay={300} triggerOnce>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                                    <FiCreditCard className="text-primary text-xl hover:animate-bounce transition-all hover:text-white" />
                                </div>
                                <div>
                                    <h4 className="font-semibold">Easy Returns</h4>
                                    <p className="text-sm text-secondary-foreground/70">
                                        30 day returns
                                    </p>
                                </div>
                            </div>
                        </Fade>
                    </div>
                </div>
            </div>

            {/* Main Footer */}
            <div className="container-buynest py-16 px-10 md:px-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:px-10">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <Link to="/" className="flex items-center gap-2 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                                <span className="text-primary-foreground font-bold text-xl">
                                    B
                                </span>
                            </div>
                            <span className="  text-2xl font-bold">
                                Buy<span className="text-primary">Nest</span>
                            </span>
                        </Link>

                        <p className="text-secondary-foreground/80 mb-6 leading-relaxed lg:max-w-8/12">
                            Your one-stop destination for quality products at unbeatable prices.
                            Shop with confidence and discover the joy of smart shopping.
                        </p>
                        {/* Social */}
                        <div className="flex gap-3">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.url}
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                                    aria-label={social.label}
                                >
                                    <social.icon size={18} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Link colums */}
                    <motion.div>
                        <p className="text-xl font-semibold mb-4">Quick Links</p>

                        <motion.ul>
                            {footerLinks.map((link) => (
                                <motion.li
                                    key={link.name}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="font-semibold text-lg mb-3"
                                >
                                    <Link to={link.path} className="hover:text-primary">
                                        {link.name}
                                    </Link>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.div>


                    {/* Office */}

                    <div className="space-y-3 mb-6 text-lg">
                        <a
                            href="mailto:support@buynest.com"
                            className="flex items-center gap-3 text-secondary-foreground/80 hover:text-primary transition-colors"
                        >
                            <FiMail size={18} />
                            support@buynest.com
                        </a>
                        <a
                            href="tel:+1234567890"
                            className="flex items-center gap-3 text-secondary-foreground/80 hover:text-primary transition-colors"
                        >
                            <FiPhone size={18} />
                            +880 1709341256
                        </a>
                        <div className="flex items-center gap-3 text-secondary-foreground/80 hover:text-primary transition-colors">
                            <FiMapPin size={18} />
                            Chittagong, Bangladesh
                        </div>
                    </div>


                    {/* Newsletter */}
                    <div>
                        <h3 className="  font-semibold text-lg mb-4">
                            Newsletter
                        </h3>
                        <p className="text-secondary-foreground/70 mb-4 text-sm">
                            Subscribe to get special offers, free giveaways, and new arrivals.
                        </p>
                        <div className="space-y-3">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="w-full px-4 py-3 rounded-lg bg-secondary-foreground/10 border border-secondary-foreground/20 placeholder:text-secondary-foreground/50 focus:outline-none focus:border-primary"
                            />
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
                            >
                                <FiSend size={16} />
                                Subscribe
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-secondary-foreground/10">
                <div className="container-buynest py-6 flex flex-col md:flex-row items-center justify-between gap-4 lg:px-10">
                    <div className="flex flex-wrap gap-4 text-sm text-secondary-foreground/60">
                        <span>© 2024 BuyNest. All rights reserved.</span>

                    </div>

                    <div className="flex items-center gap-2 ">
                        <span className="text-sm text-secondary-foreground/60">
                            We accept:
                        </span>
                        {paymentMethods.map((method, index) => (
                            <div
                                key={index}
                                className="px-3 py-1 bg-secondary-foreground/10 rounded text-xs font-medium bg-primary text-primary-foreground hover:scale-105 transition-transform max-w-8/12"
                            >
                                {method}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
