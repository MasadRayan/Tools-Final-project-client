import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Star, Send, ArrowLeft, CheckCircle, ArrowRight } from "lucide-react";
import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import Swal from "sweetalert2";




const ReviewPage = () => {
    useEffect(() => {
        document.title = 'Product Review';
    })
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [hoveredStar, setHoveredStar] = useState(0);
    const [selectedRating, setSelectedRating] = useState(0);
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['order', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders/singleOrder/${id}`);
            return res.data;
        }
    })


    const onSubmit = async (data) => {
        const result = await Swal.fire({
            title: "Are you sure? ",
            text: "You are about to submit this review.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4A70A9',
            cancelButtonColor: '#d33',
            confirmButtonText: "Yes, submit it!"
        }).then(async (result) => {
            const submittingData = { ...data, photo: user.photoURL, date: new Date().toString(), rating: selectedRating };
            if (result.isConfirmed) {
                const res = await axiosSecure.post(`/review`, submittingData);
                if (res.data.modifiedCount > 0) {
                    setIsSubmitted(true);
                }
            }
        })
            .catch((error) => {
                toast.error("Failed to submit review");
            }
            )
        setIsSubmitted(true);
    };

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    if (isError) {
        return <div className='text-5xl text-center font-black text-red-500'>Error loading order</div>
    }

    const order = data || {};

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-base-100">
                <div className="flex items-center justify-center px-4 pt-32 pb-16">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-center"
                    >
                        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="w-10 h-10 text-green-600" />
                        </div>

                        <h2 className="text-3xl font-bold text-secondary mb-4">
                            Thank You!
                        </h2>

                        <p className="text-accent mb-8">
                            Your review has been submitted successfully and will be published
                            after moderation.
                        </p>

                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 bg-primary text-base-100 px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Home
                        </Link>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-100">

            <main className="pt-24 pb-16 px-4">
                <div className="max-w-2xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 text-accent hover:text-secondary transition-colors mb-8"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Home
                        </Link>

                        <div className="bg-base-100 border border-secondary/20 rounded-2xl p-6 md:p-8 shadow-lg">
                            <div className="text-center mb-8">
                                <h1 className="text-3xl font-bold text-secondary mb-2">
                                    Share Your Experience
                                </h1>
                                <p className="text-accent">
                                    Your feedback helps other customers make informed decisions
                                </p>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                {/* Name & Email */}
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-secondary mb-2">
                                            Your Name *
                                        </label>
                                        <input
                                            defaultValue={user.displayName}
                                            {...register("name", { required: "Name is required" })}
                                            className="w-full px-4 py-3 rounded-lg bg-base-100 border border-secondary/20 text-secondary placeholder:text-accent focus:outline-none focus:ring-2 focus:ring-primary"
                                        />
                                        {errors.name && (
                                            <p className="mt-1 text-sm text-red-500">
                                                {errors.name.message}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-secondary mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            defaultValue={user.email}
                                            disabled
                                            {...register("email", { required: "Email is required" })}
                                            className="w-full px-4 py-3 rounded-lg bg-base-100 border border-secondary/20 text-secondary placeholder:text-accent focus:outline-none focus:ring-2 focus:ring-primary"
                                        />
                                        {errors.email && (
                                            <p className="mt-1 text-sm text-red-500">
                                                {errors.email.message}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Product */}
                                <div>
                                    <label className="block text-sm font-medium text-secondary mb-2">
                                        Product Name *
                                    </label>
                                    <input
                                        defaultValue={order.productName}
                                        disabled
                                        {...register("productName", {
                                            required: "Product name is required",
                                        })}
                                        className="w-full px-4 py-3 rounded-lg bg-base-100 border border-secondary/20 text-secondary placeholder:text-accent focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>

                                {/* Rating */}
                                <div>
                                    <label className="block text-sm font-medium text-secondary mb-2">
                                        Your Rating *
                                    </label>
                                    <div className="flex items-center gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onMouseEnter={() => setHoveredStar(star)}
                                                onMouseLeave={() => setHoveredStar(0)}
                                                onClick={() => setSelectedRating(star)}
                                            >
                                                <Star
                                                    className={`w-8 h-8 ${star <= (hoveredStar || selectedRating)
                                                        ? "fill-yellow-400 text-yellow-400"
                                                        : "text-accent/40"
                                                        }`}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Review */}
                                <div>
                                    <label className="block text-sm font-medium text-secondary mb-2">
                                        Your Review *
                                    </label>
                                    <textarea
                                        rows={5}
                                        {...register("review", {
                                            required: "Review is required",
                                        })}
                                        className="w-full px-4 py-3 rounded-lg bg-base-100 border border-secondary/20 text-secondary placeholder:text-accent focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                                    />
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    className="w-full bg-primary text-base-100 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 disabled:opacity-50"
                                >
                                    <span>Submit Review</span>
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </form>
                        </div>

                        <div className="mt-8 text-center text-sm text-accent">
                            By submitting a review, you agree to our{" "}
                            <Link to="/about" className="text-primary hover:underline">
                                terms and conditions
                            </Link>
                            .
                        </div>
                    </motion.div>
                </div>
            </main>

        </div>
    );
};

export default ReviewPage;
