import { useRef, useState } from "react";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Fade, Slide, Zoom } from "react-awesome-reveal";
import {
    FiMail,
    FiPhone,
    FiMapPin,
    FiClock,
    FiSend,
    FiUser,
    FiMessageSquare,
    FiChevronDown,
} from "react-icons/fi";
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
} from "react-icons/fa";
import emailjs from '@emailjs/browser';


/* Contact info */
const contactInfo = [
    {
        icon: FiMapPin,
        title: "Our Location",
        details: ["International Islamic University Chittagong", "Bangladesh"],
        color: "bg-primary/10 text-primary",
    },
    {
        icon: FiPhone,
        title: "Phone Number",
        details: ["+880 1870943008"],
        color: "bg-red-500/10 text-red-500",
    },
    {
        icon: FiMail,
        title: "Email Address",
        details: ["mashrurnafi2k2@gmail.com"],
        color: "bg-purple-500/10 text-purple-500",
    },
    {
        icon: FiClock,
        title: "Working Hours",
        details: ["Mon – Fri: 9AM – 6PM"],
        color: "bg-orange-500/10 text-orange-500",
    },
];

const Contact = () => {
    const formRef = useRef();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        console.log(data);
        setIsSubmitting(true);

        try {
            await emailjs.sendForm(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                formRef.current,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            );

            toast.success("Message sent successfully!");
            reset();
        } catch (error) {
            console.error("EmailJS Error:", error);
            toast.error("Failed to send message. Please try again.");
        } finally {
            setIsSubmitting(false);
        }

    };

    return (
        <div className="min-h-screen bg-base-100">
            {/* HERO */}
            <section className="bg-secondary py-20">
                <Fade triggerOnce>
                    <div className="text-center max-w-3xl mx-auto text-white">
                        <span className="px-4 py-2 bg-primary rounded-full text-sm">
                            Get In Touch
                        </span>
                        <h1 className="font-serif text-5xl font-bold mt-4">Contact Us</h1>
                        <p className="text-white/80 mt-4">
                            We’d love to hear from you. Our team is always ready to help.
                        </p>
                    </div>
                </Fade>
            </section>

            {/* INFO CARDS */}
            <section className="pt-16 pb-10 -mt-30 relative z-10 px-2 md:px-10">
                <div className="container mx-auto grid md:grid-cols-4 gap-6">
                    {contactInfo.map((info, i) => (
                        <Zoom key={i} triggerOnce>
                            <div className="bg-white p-6 min-h-48 rounded-2xl shadow border border-border">
                                <div className={`w-14 h-14 ${info.color} rounded-xl flex items-center justify-center mb-4`}>
                                    <info.icon size={22} />
                                </div>
                                <h3 className="font-semibold text-foreground">{info.title}</h3>
                                {info.details.map((d, idx) => (
                                    <p key={idx} className="text-muted-foreground text-sm">{d}</p>
                                ))}
                            </div>
                        </Zoom>
                    ))}
                </div>
            </section>

            {/* FORM */}
            <section className="py-16 px-2 md:px-10">
                <div className="container mx-auto grid lg:grid-cols-2 gap-12">
                    <Fade direction="left" triggerOnce>
                        <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
                            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-2">
                                Send us a Message
                            </h2>
                            <p className="text-muted-foreground mb-8">
                                Fill out the form below and we'll respond within 24 hours.
                            </p>

                            <form
                                ref={formRef}
                                onSubmit={handleSubmit(onSubmit)}
                                className="space-y-6"
                            >
                                {/* Name Field */}
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Full Name *
                                    </label>
                                    <div className="relative">
                                        <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            className={`w-full pl-12 pr-4 py-3 rounded-xl border ${errors.name
                                                ? "border-destructive"
                                                : "border-border"
                                                } bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all`}
                                            {...register("name", {
                                                required: "Name is required",
                                                minLength: {
                                                    value: 2,
                                                    message: "Name must be at least 2 characters",
                                                },
                                            })}
                                        />
                                    </div>
                                    {errors.name && (
                                        <p className="text-destructive text-sm mt-1">
                                            {errors.name.message}
                                        </p>
                                    )}
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Email Address *
                                    </label>
                                    <div className="relative">
                                        <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                        <input
                                            type="email"
                                            placeholder="john@example.com"
                                            className={`w-full pl-12 pr-4 py-3 rounded-xl border ${errors.email
                                                ? "border-destructive"
                                                : "border-border"
                                                } bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all`}
                                            {...register("email", {
                                                required: "Email is required",
                                                pattern: {
                                                    value:
                                                        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: "Invalid email address",
                                                },
                                            })}
                                        />
                                    </div>
                                    {errors.email && (
                                        <p className="text-destructive text-sm mt-1">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>

                                {/* Phone Field */}
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Phone Number
                                    </label>
                                    <div className="relative">
                                        <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                        <input
                                            type="tel"
                                            placeholder="+1 (555) 123-4567"
                                            className={`w-full pl-12 pr-4 py-3 rounded-xl border ${errors.phone
                                                ? "border-destructive"
                                                : "border-border"
                                                } bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all`}
                                            {...register("phone", {
                                                pattern: {
                                                    value: /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/,
                                                    message: "Invalid phone number",
                                                },
                                            })}
                                        />
                                    </div>
                                    {errors.phone && (
                                        <p className="text-destructive text-sm mt-1">
                                            {errors.phone.message}
                                        </p>
                                    )}
                                </div>

                                {/* Subject Field */}
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Subject *
                                    </label>
                                    <select
                                        className={`w-full px-4 py-3 rounded-xl border ${errors.subject
                                            ? "border-destructive"
                                            : "border-border"
                                            } bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all`}
                                        {...register("subject", {
                                            required: "Please select a subject",
                                        })}
                                    >
                                        <option value="">Select a subject</option>
                                        <option value="general">General Inquiry</option>
                                        <option value="support">Customer Support</option>
                                        <option value="orders">Order Related</option>
                                        <option value="returns">Returns & Refunds</option>
                                        <option value="partnership">Partnership</option>
                                        <option value="other">Other</option>
                                    </select>
                                    {errors.subject && (
                                        <p className="text-destructive text-sm mt-1">
                                            {errors.subject.message}
                                        </p>
                                    )}
                                </div>

                                {/* Message Field */}
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Message *
                                    </label>
                                    <div className="relative">
                                        <FiMessageSquare className="absolute left-4 top-4 text-muted-foreground" />
                                        <textarea
                                            rows={5}
                                            placeholder="Write your message here..."
                                            className={`w-full pl-12 pr-4 py-3 rounded-xl border ${errors.message
                                                ? "border-destructive"
                                                : "border-border"
                                                } bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none`}
                                            {...register("message", {
                                                required: "Message is required",
                                                minLength: {
                                                    value: 10,
                                                    message:
                                                        "Message must be at least 10 characters",
                                                },
                                            })}
                                        />
                                    </div>
                                    {errors.message && (
                                        <p className="text-destructive text-sm mt-1">
                                            {errors.message.message}
                                        </p>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-4 bg-primary text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <div className="w-6 h-6 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <FiSend className="w-5 h-5 text-white" />
                                            Send Message
                                        </>
                                    )}
                                </motion.button>
                            </form>
                        </div>
                    </Fade>

                    {/* FAQ */}
                    <Fade direction="right" triggerOnce>
                        <div className="space-y-8">
                            {/* Map Placeholder */}
                            <div className="bg-card rounded-2xl overflow-hidden shadow-lg border border-border h-80">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3686.202028225202!2d91.71850347475494!3d22.496602035752492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30ad2777a615585d%3A0xdcf908f6e4f3a713!2sInternational%20Islamic%20University%20Chittagong!5e0!3m2!1sen!2sbd!4v1765914649931!5m2!1sen!"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="BuyNest Location"
                                />
                            </div>

                            {/* Social Links */}
                            <div className="bg-card rounded-2xl p-6 shadow-lg border border-border">
                                <h3 className="font-semibold text-lg text-foreground mb-4">
                                    Connect With Us
                                </h3>
                                <p className="text-muted-foreground text-sm mb-6">
                                    Follow us on social media for updates, deals, and more!
                                </p>
                                <div className="flex gap-4">
                                    {[
                                        {
                                            icon: FaFacebookF,
                                            href: "https://www.facebook.com/mashrur.nafi",
                                            color: "hover:bg-blue-600",
                                        },
                                        {
                                            icon: FaTwitter,
                                            href: "https://x.com/Mashrur_Nafi",
                                            color: "hover:bg-sky-500",
                                        },
                                        {
                                            icon: FaInstagram,
                                            href: "https://www.instagram.com/mashrurnafi/",
                                            color: "hover:bg-pink-600",
                                        },
                                        {
                                            icon: FaLinkedinIn,
                                            href: "https://www.linkedin.com/in/Mashrur_Nafi/",
                                            color: "hover:bg-blue-700",
                                        },
                                    ].map((social, index) => (
                                        <motion.a
                                            key={index}
                                            href={social.href}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                            target="_blank"
                                            className={`w-12 h-12 bg-muted rounded-xl flex items-center justify-center text-muted-foreground ${social.color} hover:text-white transition-all`}
                                        >
                                            <social.icon className="w-5 h-5" />
                                        </motion.a>
                                    ))}
                                </div>
                            </div>

                            {/* Quick Support */}
                            <div className="bg-linear-to-r from-primary to-secondary rounded-2xl p-6 text-white">
                                <h3 className="font-semibold text-lg mb-2">
                                    Need Immediate Help?
                                </h3>
                                <p className="text-white/80 text-sm mb-4">
                                    Our support team is available 24/7 for urgent inquiries.
                                </p>
                                <motion.a
                                    href="tel:+8801870943008"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl font-medium hover:bg-white/30 transition-colors"
                                >
                                    <FiPhone className="w-5 h-5" />
                                    Call Now: +880 1870943008
                                </motion.a>
                            </div>
                        </div>
                    </Fade>
                </div>
            </section>

        </div>
    );
};

export default Contact;
