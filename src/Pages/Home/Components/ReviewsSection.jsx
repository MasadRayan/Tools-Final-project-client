import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCoverflow } from "swiper/modules";
import { motion } from "framer-motion";
import { Fade } from "react-awesome-reveal";
import { FiStar } from "react-icons/fi";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

const reviews = [
  {
    __id: 1,
    name: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    role: "user",
    rating: 5,
    comment:
      "Absolutely love shopping at BuyNest! The quality of products is exceptional, and the delivery is always on time. Customer service is top-notch!",
  },
  {
    _id: 2,
    name: "Michael Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    role: "user",
    rating: 5,
    comment:
      "Best online shopping experience I've ever had. The product recommendations are spot-on, and the prices are unbeatable. Highly recommended!",
  },
  {
    _id: 3,
    name: "Emily Davis",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    role: "user",
    rating: 5,
    comment:
      "The attention to detail in packaging and product quality is amazing. Returns are hassle-free, which gives me confidence to try new products.",
  },
  {
    _id: 4,
    name: "David Wilson",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
    role: "user",
    rating: 4,
    comment:
      "Great selection of products at competitive prices. The loyalty program rewards are fantastic. Will definitely continue shopping here!",
  },
  {
    _id: 5,
    name: "Jessica Martinez",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80",
    role: "user",
    rating: 5,
    comment:
      "From browsing to checkout, everything is seamless. The mobile app is super convenient, and I love the personalized deals I receive!",
  },
];

const ReviewCard = ({ review }) => {
  return (
    <div className="relative pt-12">
      {/* Avatar */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
        <div className="w-20 h-20 rounded-full border-4 border-base-100 shadow-lg overflow-hidden bg-base-100">
          <img
            src={review.avatar}
            alt={review.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Card */}
      <div className="bg-primary rounded-2xl pt-14 pb-8 px-6 text-center h-full">
        <h4 className="text-xl font-bold text-base-100 mb-1">
          {review.name}
        </h4>

        <p className="text-base-100/70 text-sm uppercase tracking-wider mb-6">
          {review.role}
        </p>

        <p className="text-base-100/90 text-sm leading-relaxed mb-6">
          {review.comment}
        </p>

        <div className="flex justify-center gap-1">
          {[...Array(5)].map((_, i) => (
            <FiStar
              key={i}
              size={18}
              className={
                i < review.rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-base-100/40"
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const ReviewsSection = () => {
  return (
    <section className="py-20 bg-base-100 overflow-hidden">
      <div className="container mx-auto px-5 ">
        {/* Header */}
        <Fade direction="up" triggerOnce>
          <div className="text-center mb-16">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Happy Clients
            </span>

            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mt-2">
              Customer Reviews
            </h2>

            <p className="text-accent mt-4 max-w-2xl mx-auto">
              Don’t just take our word for it. Here’s what our customers say about their BuyNest experience.
            </p>
          </div>
        </Fade>

        {/* Slider */}
        <Fade direction="up" delay={200} triggerOnce>
          <div className="relative px-4">
            <Swiper
              modules={[Autoplay, Pagination, EffectCoverflow]}
              effect="coverflow"
              grabCursor
              centeredSlides
              loop
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 2,
                slideShadows: false,
              }}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              spaceBetween={20}
              slidesPerView={1.2}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 2 },
              }}
              className="pb-16"
            >
              {reviews.map((review) => (
                <SwiperSlide key={review._id}>
                  {({ isActive }) => (
                    <motion.div
                      animate={{
                        scale: isActive ? 1.05 : 0.85,
                        opacity: isActive ? 1 : 0.5,
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="mb-16"
                    >
                      <ReviewCard review={review} />
                    </motion.div>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </Fade>
      </div>

      {/* Pagination styling */}
      <style>{`
        .swiper-pagination-bullet {
          background: #4A70A9;
          opacity: 0.3;
          width: 10px;
          height: 10px;
        }
        .swiper-pagination-bullet-active {
          opacity: 1;
          background: #4A70A9;
        }
      `}</style>
    </section>
  );
};

export default ReviewsSection;
