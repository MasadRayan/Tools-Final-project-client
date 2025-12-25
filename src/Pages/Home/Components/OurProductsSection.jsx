import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Fade } from "react-awesome-reveal";
import { FiShoppingCart, FiHeart, FiStar, FiEye } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../Components/LoadingSpinner/LoadingSpinner";
import axios from "axios";
import useAxios from "../../../Hooks/useAxios";
import { Link } from "react-router";

const categories = ["All", "Electronics", "Fashion", "Home & Living", "Beauty"];


const OurProductsSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const axiosInstance = useAxios()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await axiosInstance.get('/products/all');
      return res.data;
    }
  })

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>
  }

  if (isError) {
    return <div className="text-center text-red-500 font-bold text-5xl">Error loading products</div>;
  }

  const fetchedProducts = data || [];

  const products = fetchedProducts.slice(0, 8);

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section className="md:py-20 pb-10 bg-base-100 md:px-10 px-5">
      <div className="container mx-auto">
        {/* Header */}
        <Fade direction="up" triggerOnce>
          <div className="text-center mb-12">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Our Collection
            </span>

            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mt-2">
              Our Products
            </h2>

            <p className="text-accent mt-4 max-w-2xl mx-auto">
              Explore our curated selection of quality products designed to meet
              your everyday needs.
            </p>
          </div>
        </Fade>

        {/* Category Tabs */}
        <Fade direction="up" triggerOnce>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full font-medium transition-all ${activeCategory === category
                  ? "bg-primary text-base-100 shadow-md"
                  : "bg-secondary/10 text-secondary hover:bg-secondary/20"
                  }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </Fade>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}

                whileHover={{ y: -8 }}
                className="bg-base-100 border border-secondary/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all"
              >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Hover Actions */}
                  <div className="absolute inset-0 bg-secondary/40 opacity-0 hover:opacity-100 transition-all flex items-center justify-center gap-3">
                    {[FiShoppingCart, FiEye].map((Icon, i) => (
                      <Link to={`/product/${product._id}`} key={i}>
                        <motion.button

                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-12 h-12 rounded-full bg-base-100 flex items-center justify-center text-secondary hover:bg-primary hover:text-base-100 transition-colors"
                        >
                          <Icon size={20} />
                        </motion.button>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <span className="text-xs font-medium text-primary uppercase tracking-wider">
                    {product.category}
                  </span>

                  <h3 className="font-semibold text-secondary mt-1 mb-2 line-clamp-1 hover:text-primary transition-colors">
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <FiStar className="text-primary" size={14} />
                    <span className="text-sm font-medium">
                      {product.rating}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-primary">
                      ${product.price}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Load More */}
        <Fade direction="up" delay={300} triggerOnce>
          <div className="text-center mt-12">
            <Link to={'/products'}>
              <button className="bg-primary text-base-100 px-8 py-4 rounded-full font-medium hover:bg-secondary transition-colors">
                View All Products
              </button>
            </Link>
          </div>
        </Fade>
      </div>
    </section>
  );
};

export default OurProductsSection;
