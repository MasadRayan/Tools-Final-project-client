import { useLocation, Link } from "react-router";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { FiHome, FiShoppingBag, FiArrowLeft } from "react-icons/fi";

const Error = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const quickLinks = [
    { icon: FiHome, label: "Back to Home", path: "/" },
    { icon: FiShoppingBag, label: "Browse Products", path: "/products" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-xl mx-auto text-center">
          {/* 404 Number */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-[140px] sm:text-[180px] font-bold leading-none tracking-tight">
              <span className="text-primary">4</span>
              <motion.span 
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="inline-block text-secondary"
              >
                0
              </motion.span>
              <span className="text-primary">4</span>
            </h1>
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="space-y-4 mb-10"
          >
            <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">
              Page Not Found
            </h2>
            <p className="text-muted-foreground text-lg max-w-md mx-auto">
              Sorry, the page you're looking for doesn't exist or has been moved.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            {quickLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all duration-300"
              >
                <link.icon className="w-5 h-5" />
                <span>{link.label}</span>
              </Link>
            ))}
          </motion.div>

          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300 group"
            >
              <FiArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Go back to previous page</span>
            </button>
          </motion.div>
        </div>
      </main>

    </div>
  );
};

export default Error;
