
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import { FiArrowRight, FiShoppingBag } from "react-icons/fi";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { Link } from "react-router";

const heroSlides = [
    {
        id: 1,
        title: "Summer Collection",
        subtitle: "Up to 50% Off",
        description:
            "Discover the latest trends in fashion and lifestyle. Shop now and save big on premium products.",
        cta: "Shop Now",
        image:
            "/hero/1.jpeg",
        accent: "New Season",
    },
    {
        id: 2,
        title: "Tech Essentials",
        subtitle: "Latest Gadgets",
        description:
            "Explore cutting-edge technology at unbeatable prices. Upgrade your life with smart devices.",
        cta: "Explore Tech",
        image:
            "/hero/2.jpeg",
        accent: "Hot Deals",
    },
    {
        id: 3,
        title: "Home & Living",
        subtitle: "Transform Your Space",
        description:
            "Create your dream home with our curated collection of furniture and decor items.",
        cta: "Shop Home",
        image:
            "/hero/3.jpg",
        accent: "Trending",
    },
];

const HeroSection = () => {
    return (
        <section className="relative">
            <Swiper
                modules={[Autoplay, Pagination, EffectFade, Navigation]}
                effect="fade"
                pagination={{ clickable: true }}
                navigation
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop
                className="h-125 md:h-150 lg:h-180"
            >
                {heroSlides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className="relative h-full w-full">
                            {/* Background Image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: `url(${slide.image})` }}
                            >
                                {/* Secondary overlay */}
                                <div className="absolute inset-0 bg-linear-to-r from-secondary/90 via-secondary/70 to-transparent" />
                            </div>

                            {/* Content */}
                            <div className="relative h-full container-buynest flex items-center container mx-auto lg:pl-30 px-12 md:px-0">
                                <div className="">
                                    <motion.span
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-semibold mb-4"
                                    >
                                        {slide.accent}
                                    </motion.span>

                                    <motion.h1
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="text-4xl md:text-5xl lg:text-7xl font-bold mb-2 text-white"
                                    >
                                        {slide.title}
                                    </motion.h1>

                                    <motion.p
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="text-2xl md:text-3xl lg:text-4xl font-light text-primary mb-4"
                                    >
                                        {slide.subtitle}
                                    </motion.p>

                                    <motion.p
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                        className="text-lg text-gray-300 mb-8 max-w-lg"
                                    >
                                        {slide.description}
                                    </motion.p>

                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6 }}

                                        className="flex flex-wrap gap-4"
                                    >
                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                        >
                                            <Link to={'/products'}>
                                                <button className="btn bg-primary flex items-center gap-2 text-lg px-8 py-7 border-none rounded-2xl">
                                                    <FiShoppingBag size={20} />
                                                    {slide.cta}
                                                </button>
                                            </Link>
                                        </motion.div>

                                        <Link to={'/products'}>
                                            <button className="btn btn-outline border-base-100 text-white hover:border-primary hover:text-primary flex items-center justify-center gap-2 text-lg px-8 py-7 rounded-2xl">
                                                Learn More
                                                <FiArrowRight size={20} />
                                            </button>
                                        </Link>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Bottom fade into base color */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-linear-to-t from-base-100 to-transparent z-10" />
        </section>
    );
};

export default HeroSection;
