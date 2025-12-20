import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFilter, FiX, FiStar, FiHeart, FiEye } from 'react-icons/fi';
import { HiViewGridAdd } from "react-icons/hi";
import { Fade } from 'react-awesome-reveal';
import { Link, ScrollRestoration, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../Hooks/useAxios';
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner';

const categories = ['All', 'Electronics', 'Fashion', 'Home & Living', 'Beauty', 'Sports', 'Books'];

const ProductPage = () => {
    useEffect(() => {
        document.title = 'All Product Page';
    }, [])
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [priceRange, setPriceRange] = useState([0, 500]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [inStockOnly, setInStockOnly] = useState(false);
    const [sortBy, setSortBy] = useState('featured');
    const [page, setPage] = useState(0);

    const axiosInstance = useAxios();
    const navigate = useNavigate();

    const {
        data: productsResponse = {},
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['products', page],
        queryFn: async () => {
            const res = await axiosInstance.get(`/products/products-paginated?page=${page}`);
            return res.data
        }
    })

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>;
    }

    if (isError) {
        return (<p className="text-center text-red-500">Failed to load products</p>);
    }

    const productsData = productsResponse.data || [];
    const totalPages = Math.ceil(
        (productsResponse.total || 0) / (productsResponse.limit || 1)
    );

    const filteredProducts = productsData.filter((product) => {
        return (
            product.price >= priceRange[0] &&
            product.price <= priceRange[1] &&
            (selectedCategory === 'All' || product.category === selectedCategory) &&
            (!inStockOnly || product.quantity > 0)
        );
    });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'rating':
                return b.rating - a.rating;
            default:
                return 0;
        }
    });

    const clearFilters = () => {
        setPriceRange([0, 500]);
        setSelectedCategory('All');
        setInStockOnly(false);
    };

    const gotoDetailsPage = (id) => {
        navigate(`/product/${id}`);
    };

    const FilterSidebar = () => (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-foreground">Filters</h3>
                <button
                    onClick={clearFilters}
                    className="text-sm text-primary hover:underline"
                >
                    Clear All
                </button>
            </div>

            {/* Price Range */}
            <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Price Range</h4>
                <div className="space-y-3">
                    <input
                        type="range"
                        min="0"
                        max="500"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        className="w-full h-2 bg-primary rounded-lg appearance-none cursor-pointer "
                    />
                    <div className="flex items-center gap-3">
                        <div className="flex-1">
                            <label className="text-xs text-muted-foreground">Min</label>
                            <input
                                type="number"
                                value={priceRange[0]}
                                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                                className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                        <span className="text-muted-foreground mt-4">-</span>
                        <div className="flex-1">
                            <label className="text-xs text-muted-foreground">Max</label>
                            <input
                                type="number"
                                value={priceRange[1]}
                                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Categories */}
            <div className="space-y-3">
                <h4 className="font-semibold text-foreground">Categories</h4>
                <div className="space-y-2">
                    {categories.map((category) => (
                        <label
                            key={category}
                            className="flex items-center gap-3 cursor-pointer group"
                        >
                            <input
                                type="radio"
                                name="category"
                                checked={selectedCategory === category}
                                onChange={() => setSelectedCategory(category)}
                                className="w-4 h-4 accent-primary"
                            />
                            <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                                {category}
                            </span>
                            <span className="ml-auto text-xs text-muted-foreground">
                                ({category === 'All' ? productsData.length : productsData.filter(p => p.category === category).length})
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Availability */}
            <div className="space-y-3">
                <h4 className="font-semibold text-foreground">Availability</h4>
                <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                        type="checkbox"
                        checked={inStockOnly}
                        onChange={(e) => setInStockOnly(e.target.checked)}
                        className="w-4 h-4 accent-primary rounded"
                    />
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                        In Stock Only
                    </span>
                </label>
            </div>

            {/* Rating Filter */}
            <div className="space-y-3">
                <h4 className="font-semibold text-foreground">Rating</h4>
                <div className="space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                        <label key={rating} className="flex items-center gap-2 cursor-pointer group">
                            <input type="checkbox" className="w-4 h-4 accent-primary rounded" />
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <FiStar
                                        key={i}
                                        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`}
                                    />
                                ))}
                            </div>
                            <span className="text-sm text-muted-foreground">& Up</span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-background">
            {/* Page Header */}
            <div className="bg-linear-to-r from-primary/10 via-accent/10 to-primary/10 py-12">
                <div className="container mx-auto px-4">
                    <Fade direction="up" triggerOnce>
                        <h1 className="text-3xl md:text-4xl font-bold text-primary text-center">
                            Our Products
                        </h1>
                        <p className="text-secondary text-center mt-2">
                            Discover amazing products at great prices
                        </p>
                    </Fade>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="flex gap-8 relative">
                    {/* Desktop Sidebar */}
                    <aside className="hidden lg:block w-1/4 shrink-0 sticky top-24 ">
                        <div className="bg-base-100 border border-border rounded-2xl p-6 shadow-sm">
                            <FilterSidebar />
                        </div>
                    </aside>

                    {/* Mobile Filter Button */}
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden fixed bottom-6 left-6 z-5 bg-primary text-primary-foreground p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow"
                    >
                        <FiFilter className="w-6 h-6" />
                    </button>

                    {/* Mobile Sidebar Overlay */}
                    <AnimatePresence>
                        {sidebarOpen && (
                            <>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={() => setSidebarOpen(false)}
                                    className="lg:hidden fixed inset-0 bg-base-100 z-20"
                                />
                                <motion.aside
                                    initial={{ x: '-100%' }}
                                    animate={{ x: 0 }}
                                    exit={{ x: '-100%' }}
                                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                    className="lg:hidden fixed left-0 top-0 h-full w-80 max-w-[85vw] bg-card z-50 p-6 overflow-y-auto shadow-2xl pt-14"
                                >
                                    <button
                                        onClick={() => setSidebarOpen(false)}
                                        className="absolute top-4 right-4 p-2 hover:bg-muted rounded-full transition-colors"
                                    >
                                        <FiX className="w-6 h-6 text-foreground" />
                                    </button>
                                    <FilterSidebar />
                                </motion.aside>
                            </>
                        )}
                    </AnimatePresence>

                    {/* Products Section */}
                    <div className="flex-1">
                        {/* Sort & Results Bar */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                            <p className="text-muted-foreground">
                                Showing <span className="font-semibold text-foreground">{sortedProducts.length}</span> products
                            </p>
                            <div className="flex items-center gap-3">
                                <label className="text-sm text-muted-foreground">Sort by:</label>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="px-6 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                >
                                    <option value="featured">Featured</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="rating">Top Rated</option>
                                </select>
                            </div>
                        </div>

                        {/* Products Grid */}

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {sortedProducts.map((product, index) => (
                                <Fade key={product._id} direction="up" delay={index * 50} triggerOnce>
                                    <motion.div
                                        whileHover={{ y: -5 }}
                                        className="group bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                                    >
                                        {/* Image Container */}
                                        <div className="relative aspect-square overflow-hidden bg-muted">
                                            <img
                                                src={product.images[0]}
                                                alt={product.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />

                                            {/* Badges */}
                                            <div className="absolute top-3 left-3 gap-2 flex justify-center items-center">
                                                {product.price > product.discountedPrice && (
                                                    <span className="bg-secondary text-white text-xs font-bold px-2 py-1 rounded-full w-fit">
                                                        -{Math.round((1 - product.discountedPrice / product.price) * 100)}%
                                                    </span>
                                                )}
                                                {!product.quantity && (
                                                    <span className="badge bg-red-500 text-white border-none text-xs font-bold px-2 py-1 rounded-full">
                                                        Out of Stock
                                                    </span>
                                                )}
                                            </div>

                                            {/* Add to Cart Button */}
                                            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                                                <button
                                                    onClick={() => gotoDetailsPage(product._id)}
                                                    disabled={!product.quantity}
                                                    className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors cursor-pointer disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed"
                                                >
                                                    <HiViewGridAdd className="w-5 h-5" />
                                                    {product.quantity ? 'Details' : 'Out of Stock'}
                                                </button>
                                            </div>
                                        </div>

                                        {/* Product Info */}
                                        <div className="p-4">
                                            <span className="text-xs text-primary font-medium uppercase tracking-wider">
                                                {product.category}
                                            </span>
                                            <h3 className="font-semibold text-foreground mt-1 group-hover:text-primary transition-colors">
                                                {product.name}
                                            </h3>

                                            {/* Rating */}
                                            <div className="flex items-center gap-2 mt-2">
                                                <div className="flex items-center gap-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <FiStar
                                                            key={i}
                                                            className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`}
                                                        />
                                                    ))}
                                                </div>

                                            </div>

                                            {/* Price */}
                                            <div className="flex items-center gap-2 mt-3">
                                                <span className="text-xl font-bold text-foreground">
                                                    ${product.discountedPrice.toFixed(2)}
                                                </span>
                                                {product.price > product.discountedPrice && (
                                                    <span className="text-sm text-muted-foreground line-through">
                                                        ${product.price.toFixed(2)}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                </Fade>
                            ))}
                        </div>
                        <div>
                            {totalPages >= 1 && (
                                <div className="flex justify-center mt-10 gap-2">
                                    {Array.from({ length: totalPages }, (_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setPage(i)}
                                            className={`btn btn-sm ${page === i ? 'bg-primary text-white' : 'btn-outline'}`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Empty State */}
                        {sortedProducts.length === 0 && (
                            <div className="text-center py-16">
                                <div className="text-6xl mb-4">🔍</div>
                                <h3 className="text-xl font-semibold text-foreground mb-2">No products found</h3>
                                <p className="text-muted-foreground mb-4">Try adjusting your filters</p>
                                <button
                                    onClick={clearFilters}
                                    className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <ScrollRestoration></ScrollRestoration>
        </div>
    );
};

export default ProductPage;
