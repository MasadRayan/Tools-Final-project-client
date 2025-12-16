import { motion } from "framer-motion";
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router";

const categories = [
    {
        id: 1,
        name: "Electronics",
        image:"/category/electronic.jpg",
    },
    {
        id: 2,
        name: "Fashion",
        image:"/category/fashion.jpg",
    },
    {
        id: 3,
        name: "Home & Living",
        image:"/category/home.jpg",
    },
    {
        id: 4,
        name: "Beauty",
        image:"/category/beauty.jpg",
    },
    {
        id: 5,
        name: "Sports",
        image:"/category/sport.jpg",
    },
    {
        id: 6,
        name: "Books",
        image:"/category/books.jpg",
    },
];

const CategoriesSection = () => {
    return (
        <section className="py-20 bg-base-100">
            <div className="container mx-auto">
                {/* Header */}
                <Fade direction="up" triggerOnce>
                    <div className="text-center mb-12">
                        <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                            Browse By Category
                        </span>

                        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mt-2">
                            Shop Our Collections
                        </h2>

                        <p className="text-accent mt-4 max-w-2xl mx-auto">
                            Explore our wide range of categories and find exactly what you are
                            looking for.
                        </p>
                    </div>
                </Fade>

                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
                    {categories.map((category, index) => (
                        <Fade key={category.id} direction="up" delay={index * 100} triggerOnce>
                            <motion.div
                                whileHover={{ y: -8 }}
                                className="group cursor-pointer"
                            >
                                <Link to={`/categories/${category.name.toLowerCase()}`}>
                                    <div className="relative overflow-hidden rounded-2xl bg-primary/10 p-4 aspect-square">
                                        {/* Image */}
                                        <div className="absolute inset-4 rounded-xl overflow-hidden">
                                            <img
                                                src={category.image}
                                                alt={category.name}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />

                                            <div className="absolute inset-0 bg-linear-to-t from-secondary/80 via-secondary/30 to-transparent" />
                                        </div>

                                        {/* Content */}
                                        <div className="absolute bottom-8 left-8 right-4 text-base-100">
                                            <h3 className="font-semibold text-lg mb-1  transition-colors">
                                                {category.name}
                                            </h3>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        </Fade>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoriesSection;