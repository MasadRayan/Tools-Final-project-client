import { motion } from "framer-motion";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

const faqData = [
  {
    q: "How do I place an order on the platform?",
    a: "Simply browse products or services, view details, select quantity, and proceed to checkout. Your information is auto-filled after login for a seamless experience.",
  },
  {
    q: "Is my payment information secure?",
    a: "Yes. We use secure authentication and trusted payment gateways. Your data is encrypted and never stored without authorization.",
  },
  {
    q: "Can I track or cancel my order?",
    a: "You can track, update, or cancel your orders directly from your user dashboard before the order is processed.",
  },
  {
    q: "Do you offer refunds or returns?",
    a: "Yes. Eligible products and services can be returned or refunded based on our return policy. Visit the dashboard or support page for details.",
  },
  {
    q: "How does the admin dashboard work?",
    a: "Admins can manage products, services, orders, and users through a role-based dashboard with real-time updates.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section
      className="py-20"
    >
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm uppercase tracking-[0.3em]">
            Support
          </span>

          <h2 className="text-3xl md:text-5xl font-bold text-secondary mt-4 mb-6">
            Frequently Asked Questions
          </h2>

          <p className="max-w-2xl mx-auto text-accent">
            Clear answers to common questions about orders, security, and platform
            features.
          </p>
        </motion.div>

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="border border-secondary/10 rounded-2xl p-6 bg-white/40 backdrop-blur-md hover:shadow-md transition-all"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between text-left"
              >
                <span className="text-lg font-semibold text-secondary">
                  {item.q}
                </span>

                <FaAngleDown 
                  className={`text-primary transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-40 mt-3" : "max-h-0"
                }`}
              >
                <p className="text-accent leading-relaxed">
                  {item.a}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;