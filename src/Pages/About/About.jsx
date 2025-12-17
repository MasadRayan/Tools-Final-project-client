import { motion } from "framer-motion";
import { Fade, Slide, Zoom } from "react-awesome-reveal";
import {
    FiTarget,
    FiEye,
    FiHeart,
    FiUsers,
    FiAward,
    FiTruck,
    FiShield,
    FiStar,
    FiLinkedin,
    FiGithub,
    FiCheckCircle,
} from "react-icons/fi";
import { FaFacebookF } from "react-icons/fa";
import { Link } from "react-router";

const About = () => {
    const stats = [
        { number: "50K+", label: "Happy Customers", icon: FiUsers },
        { number: "10K+", label: "Products", icon: FiAward },
        { number: "99%", label: "Satisfaction Rate", icon: FiStar },
        { number: "24/7", label: "Support", icon: FiShield },
    ];

    const values = [
        {
            icon: FiHeart,
            title: "Customer First",
            description: "We prioritize our customers' needs and strive to exceed their expectations in every interaction.",
            color: "bg-primary/10 text-primary",
        },
        {
            icon: FiShield,
            title: "Trust & Security",
            description: "Your data and transactions are protected with industry-leading security measures.",
            color: "bg-red-500/10 text-red-500",
        },
        {
            icon: FiTruck,
            title: "Fast Delivery",
            description: "We ensure quick and reliable delivery to get your products to you as fast as possible.",
            color: "bg-purple-500/10 text-purple-500",
        },
        {
            icon: FiAward,
            title: "Quality Assurance",
            description: "Every product undergoes rigorous quality checks before reaching our customers.",
            color: "bg-orange-500/10 text-orange-500",
        },
    ];
    const features = [
        "Secure payment processing",
        "Easy returns & refunds",
        "24/7 customer support",
        "AI assistance",
    ];

    return (
        <div className="min-h-screen bg-base-100 text-secondary">

            {/* Hero */}
            <section className="pt-32 pb-20 relative overflow-hidden bg-linear-to-br from-primary/10 to-secondary/10">
                <div className="container mx-auto px-4 text-center">
                    <Fade triggerOnce>
                        <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm">
                            About Us
                        </span>
                        <h1 className="text-5xl font-bold mt-4">
                            Redefining Your{" "}
                            <span className="text-primary">Shopping Experience</span>
                        </h1>
                        <p className="mt-6 text-accent max-w-3xl mx-auto">
                            We make online shopping seamless, secure, and enjoyable with
                            modern technology and customer-first design.
                        </p>
                    </Fade>
                </div>
            </section>

            {/* Stats */}
            <section className="py-16 bg-base-100">
                <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, i) => (
                        <Zoom key={i} triggerOnce>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="text-center p-6 rounded-xl bg-base-100 shadow"
                            >
                                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                                    <stat.icon className="text-primary text-3xl" />
                                </div>
                                <h3 className="text-3xl font-bold">{stat.number}</h3>
                                <p className="text-accent">{stat.label}</p>
                            </motion.div>
                        </Zoom>
                    ))}
                </div>
            </section>

            {/* Company Info */}
            <section className="py-20 px-5 lg:px-10 bg-linear-to-br from-primary/10 to-secondary/20">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <Slide direction="left" triggerOnce>
                            <div className="relative">
                                <div className="absolute -top-4 -left-4 w-full h-full bg-primary/20 rounded-3xl" />
                                <img
                                    src="/team/team.jpg"
                                    alt="Our Team"
                                    className="relative rounded-3xl shadow-2xl w-full object-cover"
                                />
                                <div className="absolute -bottom-6 -right-6 bg-base-100 p-6 rounded-2xl shadow-xl border border-border">
                                    <p className="text-4xl font-bold text-primary">1+</p>
                                    <p className="text-muted-foreground">Years of Excellence</p>
                                </div>
                            </div>
                        </Slide>

                        <Slide direction="right" triggerOnce>
                            <div>
                                <span className="inline-block px-4 py-2 bg-primary/60 text-secondary-foreground rounded-full text-sm font-medium mb-4">
                                    Who We Are
                                </span>
                                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 font-serif">
                                    Building the Future of E-Commerce
                                </h2>
                                <p className="text-muted-foreground mb-6 leading-relaxed">
                                    SmartShop is a cutting-edge e-commerce platform designed to provide an exceptional
                                    shopping experience. Founded in 2025, we have grown from a small startup to a
                                    leading online marketplace serving thousands of customers worldwide.
                                </p>
                                <p className="text-muted-foreground mb-8 leading-relaxed">
                                    Our platform combines advanced technology with user-centric design to offer
                                    personalized shopping experiences, secure transactions, and reliable delivery
                                    services. We partner with trusted brands and sellers to bring you quality
                                    products at competitive prices.
                                </p>
                                <div className="grid grid-cols-2 gap-4">
                                    {features.slice(0, 4).map((feature, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <FiCheckCircle className="w-5 h-5 text-primary shrink-0" />
                                            <span className="text-foreground text-sm">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Slide>
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-20  px-5 lg:px-10 overflow-hidden">
                <div className="container mx-auto">
                    <div className="text-center mb-14">
                        <Fade triggerOnce>
                            <span className="px-4 py-2 bg-primary/10 text-primary rounded-full">
                                Our Team
                            </span>
                            <h1 className="text-5xl font-bold mt-4">
                                The People Behind SmartShop
                            </h1>
                            <p className="mt-6 text-accent max-w-3xl mx-auto">
                                Our diverse team of experts is dedicated to delivering the best shopping experience.
                            </p>
                        </Fade>
                    </div>
                    <div className="">
                        {/* members info- 3 members */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                            {/* Masad */}
                            <Fade triggerOnce delay={200} >
                                <motion.div
                                    whileHover={{ y: -10, scale: 1.05 }}
                                    className="bg-primary/10  rounded-2xl shadow-md overflow-hidden group"
                                >
                                    {/* Image */}
                                    <div className="relative">
                                        <img
                                            src='/team/masad.jpg'
                                            alt=''
                                            className="w-full h-100 object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 text-center">
                                        <h4 className="text-xl font-bold">Masad Rayan</h4>
                                        <p className="text-primary font-medium text-sm mt-1">
                                            Team Leader
                                        </p>
                                        <p className="text-accent text-sm mt-3">
                                            A Full Stack Web Developer with a passion for creating user-friendly web applications.
                                        </p>
                                        <div className="flex justify-center items-center mt-5 gap-3">
                                            <a href="https://www.linkedin.com/in/masad-rayan/" target="_blank" className="p-3 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition">
                                                <FiLinkedin />
                                            </a>
                                            <a href="https://www.facebook.com/masad.rayan.2024" target="_blank" className="p-3 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition">
                                                <FaFacebookF />
                                            </a>
                                            <a href=" https://github.com/masadrayan" target="_blank" className="p-3 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition">
                                                <FiGithub />
                                            </a>
                                        </div>
                                    </div>
                                </motion.div>
                            </Fade>
                            {/* Jabir */}
                            <Fade triggerOnce delay={200} >
                                <motion.div
                                    whileHover={{ y: -10, scale: 1.05 }}
                                    className="bg-primary/10  rounded-2xl shadow-md overflow-hidden group"
                                >
                                    {/* Image */}
                                    <div className="relative">
                                        <img
                                            src='/team/jabir.jpg'
                                            alt=''
                                            className="w-full h-100 object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 text-center">
                                        <h4 className="text-xl font-bold">Jabir Siddique Talim</h4>
                                        <p className="text-primary font-medium text-sm mt-1">
                                            Team Member
                                        </p>
                                        <p className="text-accent text-sm mt-3">
                                            A Problem Solver, a Curious Developer, and a Passionate Learner.
                                        </p>
                                        <div className="flex justify-center items-center mt-5 gap-3">
                                            <a href="https://www.linkedin.com/in/jabir-siddique-talim-0007192b2/" target="_blank" className="p-3 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition">
                                                <FiLinkedin />
                                            </a>
                                            <a href="https://www.facebook.com/jabir.siddique.127" target="_blank" className="p-3 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition">
                                                <FaFacebookF />
                                            </a>
                                            <a href=" https://share.google/Pe8JFk4kpH4NSCI4j" target="_blank" className="p-3 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition">
                                                <FiGithub />
                                            </a>
                                        </div>
                                    </div>
                                </motion.div>
                            </Fade>
                            {/* Nafi */}
                            <Fade triggerOnce delay={400}>
                                <motion.div
                                    whileHover={{ y: -10, scale: 1.05 }}
                                    className="bg-primary/10 rounded-2xl shadow-md overflow-hidden group"
                                >
                                    {/* Image */}
                                    <div className="relative">
                                        <img
                                            src='/team/nafi.jpeg'
                                            alt=''
                                            className="w-full h-100 object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 text-center">
                                        <h4 className="text-xl font-bold"> Mashrur Ibne Mamun</h4>
                                        <p className="text-primary font-medium text-sm mt-1">
                                           Team Member
                                        </p>
                                        <p className="text-accent text-sm mt-3">
                                            A tech enthusiast, a problem solver, and a lifelong learner.
                                        </p>
                                        <div className="flex justify-center items-center mt-5 gap-3">
                                            <a href="https://www.linkedin.com/in/mashrur-nafi-a28029354/" target="_blank" className="p-3 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition">
                                                <FiLinkedin />
                                            </a>
                                            <a href="https://www.facebook.com/mashrur.nafi" target="_blank" className="p-3 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition">
                                                <FaFacebookF />
                                            </a>
                                            <a href="https://github.com/MashrurNafi" target="_blank" className="p-3 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition">
                                                <FiGithub />
                                            </a>
                                        </div>
                                    </div>
                                </motion.div>
                            </Fade>
                            {/* Shahriar */}
                            <Fade triggerOnce delay={600}>
                                <motion.div
                                    whileHover={{ y: -10, scale: 1.05 }}
                                    className="bg-primary/10 rounded-2xl shadow-md overflow-hidden group"
                                >
                                    {/* Image */}
                                    <div className="relative">
                                        <img
                                            src='/team/shezan.jpeg'
                                            alt=''
                                            className="w-full h-100 object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 text-center">
                                        <h4 className="text-xl font-bold">Md. Shahriar Islam</h4>
                                        <p className="text-primary font-medium text-sm mt-1">
                                            Team Member 
                                        </p>
                                        <p className="text-accent text-sm mt-3">
                                            An Expert in MicroSoft PowerPoint and a good designer 
                                        </p>
                                        <div className="flex justify-center items-center mt-5 gap-3">
                                            <a href="https://www.linkedin.com/in/mohammad-shahriar-islam-32b44a27a" target="_blank" className="p-3 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition">
                                                <FiLinkedin />
                                            </a>
                                            <a href="https://www.facebook.com/shahriar.shahriarshejan.shejan" target="_blank" className="p-3 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition">
                                                <FaFacebookF />
                                            </a>
                                            <a href="https://github.com/Shahriar-Shezan/" target="_blank" className="p-3 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition">
                                                <FiGithub />
                                            </a>
                                        </div>
                                    </div>
                                </motion.div>
                            </Fade>
                        </div>
                    </div>

                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20 bg-linear-to-b from-primary/5 to-secondary/5">
                <div className="text-center mb-14">
                    <Slide direction="down" triggerOnce>
                        <span className="px-4 py-2 bg-primary/10 text-primary rounded-full">
                            Our Purpose
                        </span>
                        <h1 className="text-5xl font-bold mt-4">
                            Mission & Vision
                        </h1>
                    </Slide>
                </div>
                <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-10">
                    <Slide triggerOnce direction="left">
                        <div className="bg-base-100 p-8 rounded-3xl shadow">
                            <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center pt-4 mb-4">
                                <FiTarget className="text-primary text-5xl mb-4" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3">Our Mission</h3>
                            <p className="text-accent">
                                To democratize access to quality products by creating an inclusive, user-friendly e-commerce platform that connects buyers with trusted sellers. We strive to make online shopping accessible, affordable, and enjoyable for everyone, while supporting businesses of all sizes to reach their full potential.
                            </p>
                        </div>
                    </Slide>

                    <Slide triggerOnce direction="right">
                        <div className="bg-base-100 p-8 rounded-3xl shadow">
                            <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center pt-4 mb-4">
                                <FiEye className="text-primary text-4xl mb-4 " />
                            </div>
                            <h3 className="text-2xl font-bold mb-3">Our Vision</h3>
                            <p className="text-accent">
                                To become the world's most customer-centric e-commerce platform, where technology and human connection converge to create meaningful shopping experiences. We envision a future where every purchase contributes to a sustainable economy and empowers communities around the globe.
                            </p>
                        </div>
                    </Slide>
                </div>
            </section>

            {/* Values */}
            <section className="py-20">
                <div className="text-center mb-14">
                    <Slide triggerOnce direction="down">
                        <span className="px-4 py-2 bg-primary/10 text-primary rounded-full">
                            What Drives Us
                        </span>
                        <h1 className="text-5xl font-bold mt-4">
                            Our Core Values
                        </h1>
                    </Slide>
                </div>
                <div className="container mx-auto px-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:px-20">
                    {values.map((v, i) => (
                        <Zoom key={i} triggerOnce>
                            <motion.div
                                whileHover={{ y: -8 }}
                                className="bg-base-100 px-6 rounded-xl shadow text-center h-52 flex flex-col justify-center items-center"
                            >
                                <div className={`w-14 h-14 ${v.color} rounded-xl flex items-center justify-center mb-4`}>
                                    <v.icon size={22} />
                                </div>
                                <h4 className="font-bold mb-2">{v.title}</h4>
                                <p className="text-accent text-sm">{v.description}</p>
                            </motion.div>
                        </Zoom>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="py-15 bg-primary/10 text-center">
                <Fade triggerOnce>
                    <h2 className="text-4xl font-bold mb-6">
                        Ready to Start Shopping?
                    </h2>
                    <div className="flex justify-center items-center gap-4">
                        <button className="btn px-5 bg-secondary text-white rounded-full">
                            <Link to="/products">Explore Products</Link>
                        </button>
                        <button className="px-5 py-3 btn btn-outline text-secondary hover:bg-secondary hover:text-white rounded-full">
                            <Link to="/contact">Contact Us</Link>
                        </button>
                    </div>
                </Fade>
            </section>

        </div>
    );
};

export default About;
