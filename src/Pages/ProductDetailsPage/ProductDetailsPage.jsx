import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Fade } from "react-awesome-reveal";
import {
  FiShoppingCart,
  FiHeart,
  FiShare2,
  FiMinus,
  FiPlus,
  FiChevronLeft,
  FiCheck,
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiStar,
} from "react-icons/fi";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";


/* Mock product data */
const mockProduct = {
  id: "1",
  name: "Premium Wireless Headphones Pro Max",
  images: [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
    "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800",
    "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=800",
    "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800",
  ],
  price: 299.99,
  discountedPrice: 199.99,
  description:
    "Experience audio like never before with our Premium Wireless Headphones Pro Max...",
  shortDescription:
    "Premium wireless headphones with active noise cancellation.",
  quantity: 15,
  category: "Electronics",
  rating: 4.8,
  colors: ["#1a1a1a", "#f5f5f5", "#2563eb"],
  specifications: [
    { label: "Battery Life", value: "40 hours" },
    { label: "Bluetooth", value: "5.3" },
    { label: "Driver Size", value: "40mm" },
    { label: "Weight", value: "250g" },
    { label: "Noise Cancellation", value: "Active" },
    { label: "Charging", value: "USB-C Fast Charge" },
  ],
};

const relatedProducts = [
  {
    id: "2",
    name: "Wireless Earbuds Pro",
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400",
    price: 149.99,
    discountedPrice: 99.99,
  },
  {
    id: "3",
    name: "Portable Speaker",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400",
    price: 79.99,
  },
];

const ProductDetailsPage = () => {
  useEffect(() => {
    document.title = 'Product Details';
  }, [])
  const navigate = useNavigate();
  const { id } = useParams();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const axiosSecure = useAxiosSecure();

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${id}`);
      return res.data
    }
  })

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>
  }

  if (isError) {
    return (<p className="text-center text-red-500">Failed to load product</p>);
  }


  console.log(product);



  const discountPercentage = product.discountedPrice
    ? Math.round(
      ((product.price - product.discountedPrice) / product.price) * 100
    )
    : 0;

  const handleQuantityChange = (action) => {
    if (action === "increase" && quantity < product.quantity) {
      setQuantity((prev) => prev + 1);
    }
    if (action === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <Fade triggerOnce>
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
              <button
                onClick={() => navigate("/")}
                className="hover:text-primary transition-colors"
              >
                Home
              </button>
              <span>/</span>
              <button
                onClick={() => navigate("/products")}
                className="hover:text-primary transition-colors"
              >
                Products
              </button>
              <span>/</span>
              <span className="text-foreground">{product.category}</span>
            </nav>
          </Fade>

          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <FiChevronLeft />
            <span>Back</span>
          </button>

          {/* Product Section */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Image Gallery */}
            <Fade triggerOnce direction="left">
              <div className="space-y-4">
                {/* Main Image */}
                <motion.div
                  className="relative  rounded-2xl overflow-hidden bg-muted"
                  layoutId="product-image"
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={selectedImage}
                      src={product.images[selectedImage]}
                      alt={product.name}
                      className="w-full h-150 object-cover rounded-2xl"
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    />
                  </AnimatePresence>

                  {/* Discount Badge */}
                  {discountPercentage > 0 && (
                    <div className="absolute top-4 left-4 bg-secondary text-white px-3 py-1 rounded-full text-sm font-semibold">
                      -{discountPercentage}% OFF
                    </div>
                  )}


                </motion.div>

                {/* Thumbnails */}
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {product.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative shrink-0 w-20 h-20  rounded-lg overflow-hidden border-2 transition-all ${selectedImage === index
                        ? "border-primary ring-2 ring-primary/20"
                        : "border-transparent hover:border-muted-foreground/30"
                        }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </Fade>

            {/* Product Info */}
            <Fade triggerOnce direction="right">
              <div className="space-y-6">
                {/* Category & Rating */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(product.rating)
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-muted-foreground"
                            }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {product.rating}
                    </span>
                  </div>
                </div>

                {/* Product Name */}
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight">
                  {product.name}
                </h1>

                {/* Short Description */}
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {product.shortDescription}
                </p>

                {/* Price */}
                <div className="flex items-end gap-4">
                  <span className="text-4xl font-bold text-foreground">
                    ${product.discountedPrice || product.price}
                  </span>
                  {product.discountedPrice && (
                    <span className="text-xl text-muted-foreground line-through">
                      ${product.price}
                    </span>
                  )}
                </div>

                {/* Color Selection */}
                {/* <div className="space-y-3">
                  <span className="text-sm font-medium text-foreground">Color</span>
                  <div className="flex gap-3">
                    {product.colors.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedColor(index)}
                        className={`w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center ${selectedColor === index
                          ? "border-primary ring-2 ring-primary/20"
                          : "border-muted hover:border-muted-foreground"
                          }`}
                        style={{ backgroundColor: color }}
                      >
                        {selectedColor === index && (
                          <FiCheck
                            className={`w-5 h-5 ${color === "#1a1a1a" ? "text-white" : "text-foreground"
                              }`}
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </div> */}

                {/* Quantity Selector */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">Quantity</span>
                    <span className="text-sm text-muted-foreground">
                      {product.quantity > 0 ? (
                        <span className="flex items-center gap-1 text-green-600">
                          <FiCheck size={14} />
                          In Stock ({product.quantity} available)
                        </span>
                      ) : (
                        <span className="text-destructive">Out of Stock</span>
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-border rounded-lg">
                      <button
                        onClick={() => handleQuantityChange("decrease")}
                        disabled={quantity <= 1}
                        className="p-3 hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <FiMinus size={18} />
                      </button>
                      <span className="w-16 text-center font-semibold text-lg">
                        {quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange("increase")}
                        disabled={quantity >= product.quantity}
                        className="p-3 hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <FiPlus size={18} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 flex items-center justify-center gap-3 bg-primary text-primary-foreground py-4 px-8 rounded-xl font-semibold text-lg transition-colors hover:bg-primary/90"
                  >
                    <FiShoppingCart size={22} />
                    Procede to Checkout
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-2 border border-border py-4 px-6 rounded-xl font-medium hover:bg-muted transition-colors"
                  >
                    <FiShare2 size={20} />
                    Share
                  </motion.button>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <FiTruck className="text-primary" size={22} />
                    </div>
                    <span className="text-xs text-muted-foreground">Free Shipping</span>
                  </div>
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <FiShield className="text-primary" size={22} />
                    </div>
                    <span className="text-xs text-muted-foreground">2 Year Warranty</span>
                  </div>
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <FiRefreshCw className="text-primary" size={22} />
                    </div>
                    <span className="text-xs text-muted-foreground">30-Day Returns</span>
                  </div>
                </div>
              </div>
            </Fade>
          </div>

          {/* Tabs Section */}
          <div className="mt-16">
            <Fade triggerOnce>
              {/* Tab Headers */}
              <div className="flex border-b border-border">
                {(["description", "specifications", "reviews"]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-4 font-medium capitalize transition-colors relative ${activeTab === tab
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                      }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="py-8"
                >
                  {activeTab === "description" && (
                    <div className="prose prose-lg max-w-none text-muted-foreground">
                      <p className="leading-relaxed">{product.description}</p>
                    </div>
                  )}

                  {activeTab === "specifications" && (
                    <div className="grid md:grid-cols-2 gap-4">
                      {product.specifications.map((spec, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center py-3 px-4 bg-primary/50 rounded-lg"
                        >
                          <span className="text-muted-foreground">{spec.label}</span>
                          <span className="font-medium text-foreground">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === "reviews" && (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">
                        Reviews will be loaded from the backend.
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </Fade>
          </div>

          {/* Related Products */}
          <div className="mt-16">
            <Fade triggerOnce>
              <h2 className="text-2xl font-bold text-foreground mb-8">
                You May Also Like
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
                {relatedProducts.map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ y: -8 }}
                    className="group bg-card rounded-xl overflow-hidden border border-border hover:shadow-xl transition-all cursor-pointer"
                    onClick={() => navigate(`/product/${item.id}`)}
                  >
                    <div className="aspect-square overflow-hidden bg-muted">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-foreground line-clamp-2 mb-2">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-foreground">
                          ${item.discountedPrice || item.price}
                        </span>
                        {item.discountedPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${item.price}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Fade>
          </div>
        </div>
      </main>

    </div>
  );
};

export default ProductDetailsPage;
