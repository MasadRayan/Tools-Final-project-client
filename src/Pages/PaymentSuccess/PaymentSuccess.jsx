import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner';
import { motion } from 'framer-motion';
import {
    FiCheckCircle,
    FiPackage,
    FiCreditCard,
    FiCalendar,
    FiMail,
    FiUser,
    FiHome,
    FiShoppingBag,
    FiDownload,
    FiShare2,
    FiCopy
} from 'react-icons/fi';

import jsPDF from 'jspdf';
import toast from 'react-hot-toast';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const trxid = searchParams.get("trxid");
    const axiosSeecure = useAxiosSecure();
    const { user } = useAuth();
    const [copied, setCopied] = useState("");


    const { data, isLoading, refetch, isError } = useQuery({
        queryKey: ['paymentSuccess', trxid],
        queryFn: async () => {
            const res = await axiosSeecure.get(`/products/transaction/${trxid}`);
            console.log("hitting the route", res);
            return res.data;
        },
        enabled: !!trxid && !!user?.email
    })

    useEffect(() => {
        if (!data || !user?.email) {
            return;
        }
        // create order in database
        const createIOrder = async () => {
            const orderData = {
                productId: productInfo._id,
                productName: productInfo.name,
                productImage: productInfo.images[0],
                productCategory: productInfo.category,
                quantity: paymentInfo.quantity,
                totalAmount: paymentInfo.totalAmount,
                color: paymentInfo.color,
                transactionID: paymentInfo.transactionID,
                status: paymentInfo.status,
                date: paymentInfo.date,
                email: user?.email,
                name: user?.displayName,
            }

            try {
                const res = await axiosSeecure.post("/orders", orderData);
                if (res.data.insertedId) {
                    // console.log("Order created successfully");
                }
            } catch (error) {

            }
        }
        createIOrder()
    }, [trxid, data])


    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    if (isError) {
        return <div className='text-5xl text-center font-bold text-red-500'>Error loading payment details.</div>;
    }

    const { paymentInfo, productInfo, updateProductQuantity } = data;

    const formatDate = (dateString) =>
        new Date(dateString).toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(text);
        setTimeout(() => setCopied(""), 2000);
    };


    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const pulseVariants = {
        animate: {
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.2, 0.4],
            transition: { duration: 2, repeat: Infinity }
        }
    };

    const handleDownloadReceipt = () => {
        // 🔧 FIX 1: Data safety guard (prevents runtime crash)
        if (!paymentInfo || !productInfo) return;

        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        // Color palette
        const primaryColor = [99, 102, 241];
        const secondaryColor = [139, 92, 246];
        const successColor = [34, 197, 94];
        const darkColor = [15, 23, 42];
        const mutedColor = [100, 116, 139];
        const lightBg = [248, 250, 252];

        /* ---------------- HEADER ---------------- */

        doc.setFillColor(...primaryColor);
        doc.rect(0, 0, pageWidth, 85, "F");

        doc.setFillColor(...secondaryColor);
        doc.setGState(doc.GState({ opacity: 0.3 }));
        doc.circle(pageWidth - 20, 20, 40, "F");
        doc.circle(-10, 70, 30, "F");
        doc.setGState(doc.GState({ opacity: 1 }));

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(28);
        doc.setFont("helvetica", "bold");
        doc.text("BUYNEST", pageWidth / 2, 25, { align: "center" });

        doc.setFontSize(9);
        doc.setFont("helvetica", "normal");
        doc.text("Premium Shopping Experience", pageWidth / 2, 33, { align: "center" });

        doc.setFontSize(22);
        doc.setFont("helvetica", "bold");
        doc.text("PAYMENT RECEIPT", pageWidth / 2, 52, { align: "center" });

        doc.setFontSize(9);
        doc.text(
            `Receipt #: ${paymentInfo.transactionID.slice(-8).toUpperCase()}`,
            pageWidth / 2,
            68,
            { align: "center" }
        );

        doc.text(
            `Date: ${new Date(paymentInfo.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            })}`,
            pageWidth / 2,
            75,
            { align: "center" }
        );

        /* ---------------- CARD ---------------- */

        const cardY = 95;
        const cardMargin = 15;
        const cardWidth = pageWidth - cardMargin * 2;
        let yPos = cardY + 15;

        // Card background (height calculated later)
        doc.setFillColor(255, 255, 255);
        doc.roundedRect(cardMargin, cardY, cardWidth, 170, 5, 5, "F");

        /* ---------------- SUCCESS BADGE ---------------- */

        const badgeWidth = 90;
        doc.setFillColor(...successColor);
        doc.setGState(doc.GState({ opacity: 0.1 }));
        doc.roundedRect((pageWidth - badgeWidth) / 2, yPos - 6, badgeWidth, 14, 7, 7, "F");
        doc.setGState(doc.GState({ opacity: 1 }));

        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(...successColor);
        doc.text("PAYMENT SUCCESSFUL", (pageWidth / 2) , yPos + 3, { align: "center" });

        yPos += 25;

        /* ---------------- CUSTOMER INFO ---------------- */

        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(...darkColor);
        doc.text("CUSTOMER INFORMATION", cardMargin + 12, yPos);

        yPos += 8;
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(...mutedColor);
        doc.text("Name:", cardMargin + 12, yPos);

        doc.setTextColor(...darkColor);
        doc.setFont("helvetica", "bold");
        doc.text(paymentInfo.userName, cardMargin + 35, yPos);

        yPos += 8;
        doc.setFont("helvetica", "normal");
        doc.setTextColor(...mutedColor);
        doc.text("Email:", cardMargin + 12, yPos);

        // 🔧 FIX 2: Email wrapping (prevents overflow)
        const emailLines = doc.splitTextToSize(paymentInfo.email, cardWidth - 60);
        doc.setTextColor(...darkColor);
        doc.text(emailLines, cardMargin + 35, yPos);

        yPos += emailLines.length * 6 + 8;

        /* ---------------- ORDER DETAILS ---------------- */

        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.text("ORDER DETAILS", cardMargin + 12, yPos);

        yPos += 10;

        // 🔧 FIX 3: Product name wrapping
        const productNameLines = doc.splitTextToSize(productInfo.name, cardWidth - 24);
        doc.setFontSize(12);
        doc.text(productNameLines, cardMargin + 12, yPos);

        yPos += productNameLines.length * 7 + 5;

        doc.setFontSize(9);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(...mutedColor);
        doc.text(`Category: ${productInfo.category}`, cardMargin + 12, yPos);

        yPos += 12;

        /* ---------------- PRICE TABLE ---------------- */

        const tableX = cardMargin + 12;
        const tableWidth = cardWidth - 24;

        doc.setFillColor(...lightBg);
        doc.roundedRect(tableX, yPos - 5, tableWidth, 12, 2, 2, "F");

        doc.setFontSize(9);
        doc.setFont("helvetica", "bold");
        doc.text("ITEM", tableX + 5, yPos + 2);
        doc.text("QTY", tableX + tableWidth - 60, yPos + 2);
        doc.text("PRICE", tableX + tableWidth - 5, yPos + 2, { align: "right" });

        yPos += 15;

        doc.setFont("helvetica", "normal");
        doc.setTextColor(...darkColor);
        doc.text(productNameLines[0], tableX + 5, yPos);
        doc.text(String(paymentInfo.quantity), tableX + tableWidth - 60, yPos);
        doc.text(`$${paymentInfo.unitPrice.toFixed(2)}`, tableX + tableWidth - 5, yPos, {
            align: "right",
        });

        yPos += 18;

        /* ---------------- TOTAL ---------------- */

        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.text("TOTAL PAID:", tableX + tableWidth - 70, yPos);
        doc.setFontSize(14);
        doc.setTextColor(...primaryColor);
        doc.text(`$${paymentInfo.totalAmount.toFixed(2)}`, tableX + tableWidth - 5, yPos, {
            align: "right",
        });

        /* ---------------- TRANSACTION ID ---------------- */

        yPos += 12;

        // 🔧 FIX 4: Transaction ID wrapping
        const txnLines = doc.splitTextToSize(
            `Transaction ID: ${paymentInfo.transactionID}`,
            cardWidth - 24
        );

        doc.setFontSize(8);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(...mutedColor);
        doc.text(txnLines, pageWidth / 2, yPos, { align: "center" });

        /* ---------------- FOOTER ---------------- */

        const footerY = pageHeight - 40;
        doc.setDrawColor(226, 232, 240);
        doc.line(20, footerY - 10, pageWidth - 20, footerY - 10);

        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(...darkColor);
        doc.text("Thank you for shopping with us!", pageWidth / 2, footerY, {
            align: "center",
        });

        doc.setFontSize(9);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(...mutedColor);
        doc.text(
            "For any questions, contact support@shopnest.com",
            pageWidth / 2,
            footerY + 8,
            { align: "center" }
        );

        doc.setFontSize(7);
        doc.text(
            "This is a computer-generated receipt and does not require a signature.",
            pageWidth / 2,
            footerY + 18,
            { align: "center" }
        );

        doc.setFillColor(...primaryColor);
        doc.rect(0, pageHeight - 8, pageWidth, 8, "F");

        /* ---------------- SAVE ---------------- */

        doc.save(
            `ShopNest-Receipt-${paymentInfo.transactionID.slice(-8).toUpperCase()}.pdf`
        );

        toast.success("Your payment receipt has been saved.");
    };


    return (
        <div className=" py-10 px-4">
            <motion.div
                className="container mx-auto"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Header */}
                <motion.div className="text-center mb-10" variants={itemVariants}>
                    <div className="relative inline-flex mb-6">
                        <motion.div
                            className="absolute inset-0 w-32 h-32 rounded-full bg-primary/20"
                            variants={pulseVariants}
                            animate="animate"
                        />
                        <div className="relative w-24 h-24 rounded-full bg-primary flex items-center justify-center shadow-xl">
                            <FiCheckCircle className="w-14 h-14 text-primary-foreground" />
                        </div>
                    </div>

                    <h1 className="text-4xl font-bold text-foreground mb-2">
                        Payment Successful
                    </h1>
                    <p className="text-muted-foreground">
                        Your order has been placed successfully.
                    </p>
                </motion.div>

                <div className='grid grid-cols-1 md:grid-cols-2'>
                    {/* Product Card */}
                    <div className="mb-6 border rounded-lg shadow md:max-w-10/12 mx-auto bg-white">
                        <div className="flex flex-col lg:flex-row gap-1 p-5">
                            <img
                                src={productInfo.images[0]}
                                alt={productInfo.name}
                                className="lg:w-70  rounded-lg object-cover"
                            />
                            <div className="flex-1">
                                <span className="badge bg-primary/40 text-secondary mb-2">{productInfo.category}</span>
                                <h3 className="text-xl font-semibold">{productInfo.name}</h3>
                                <p className="text-sm text-muted-foreground mt-1 max-w-10/2">
                                    {productInfo.shortDescription}
                                </p>

                                <div className="flex items-center gap-3 mt-3 mb-3">
                                    <span className="text-sm">Color:</span>
                                    <span
                                        className="w-5 h-5 rounded-full border"
                                        style={{ backgroundColor: paymentInfo.color }}
                                    />
                                </div>
                                <hr className='border border-gray-500 ' />

                                <div className="flex justify-between mt-4 font-medium">
                                    <span>Qty: {paymentInfo.quantity}</span>
                                    <span className="text-primary">
                                        ${paymentInfo.totalAmount}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Transaction */}
                    <div className="mb-6 border rounded-lg shadow md:max-w-10/12  bg-white">
                        <div className="p-5 space-y-4">
                            <h3 className="font-semibold flex items-center text-primary text-2xl gap-2">
                                <FiCreditCard /> Transaction Details
                            </h3>

                            <div className="flex flex-col justify-between items-start gap-2 bg-base-100 p-3 rounded-3xl border-2 border-primary w-fit">
                                <span className="font-medium">Transaction ID:</span>
                                <div className='flex justify-center items-center gap-5'>
                                    <code className="text-sm font-bold">{paymentInfo.transactionID}</code>
                                    <button
                                        onClick={() => handleCopy(`${paymentInfo.transactionID}`)}
                                        className='text-neutral-400 hover:text-primary transition-colors relative cursor-pointer'
                                        title='Copy to clipboard'
                                    >
                                        <FiCopy size={18} />
                                        {copied === `${paymentInfo.transactionID}` && (
                                            <span className='absolute -top-2.5 left-18 -translate-x-1/2 text-base text-primary whitespace-nowrap bg-primary/70 px-2 py-1 rounded'>
                                                Copied!
                                            </span>
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className='divider'></div>

                            <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                        <FiUser className="w-4 h-4 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">Customer</p>
                                        <p className="font-medium text-foreground">{paymentInfo.userName}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                        <FiMail className="w-4 h-4 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">Email</p>
                                        <p className="font-medium text-foreground text-sm break-all">{paymentInfo.email}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                        <FiCalendar className="w-4 h-4 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">Date & Time</p>
                                        <p className="font-medium text-foreground text-sm">{formatDate(paymentInfo.date)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* delivary status */}
                    <div className="border border-primary rounded-lg shadow md:max-w-10/12 max-h-fit bg-white md:ml-16 backdrop-blur-sm">
                        <div className="p-5 md:p-6">
                            <h3 className="font-semibold mb-10 flex text-primary text-2xl items-center gap-2">
                                <FiPackage size={26} />
                                Order Status
                            </h3>

                            <div className="relative">
                                {/* Timeline line */}
                                <div className="absolute left-2.75 top-6 bottom-6 w-0.5 bg-linear-to-b from-green-500 via-primary to-muted" />

                                {/* Timeline items */}
                                <div className="space-y-6">
                                    {[
                                        { label: "Order Placed", status: "complete", time: "Just now" },
                                        { label: "Payment Confirmed", status: "complete", time: "Just now" },
                                        { label: "Processing", status: "current", time: "In progress" },
                                        { label: "Shipped", status: "pending", time: "Estimated 2-3 days" },
                                        { label: "Delivered", status: "pending", time: "Estimated 5-7 days" }
                                    ].map((step, index) => (
                                        <div key={index} className="flex items-start gap-4">
                                            <div className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center ${step.status === 'complete'
                                                ? 'bg-green-500 text-white'
                                                : step.status === 'current'
                                                    ? 'bg-primary text-primary-foreground animate-pulse'
                                                    : 'bg-muted border-2 border-border'
                                                }`}>
                                                {step.status === 'complete' && (
                                                    <FiCheckCircle className="w-3.5 h-3.5" />
                                                )}
                                                {step.status === 'current' && (
                                                    <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                                                )}
                                            </div>
                                            <div className="flex-1 pb-0">
                                                <p className={`font-medium ${step.status === 'pending' ? 'text-muted-foreground' : 'text-foreground'
                                                    }`}>
                                                    {step.label}
                                                </p>
                                                <p className="text-sm text-muted-foreground">{step.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Summary */}
                    <div className="  md:max-w-10/12 mt-10 md:mt-0  h-fit backdrop-blur-sm">
                        <div className="p-5 md:p-6 bg-white border border-primary rounded-lg shadow mb-6">
                            <h3 className="text-primary text-2xl font-semibold  mb-5">
                                Payment Summary
                            </h3>

                            <div className="space-y-3">
                                <div className="flex justify-between text-base">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span className="text-foreground">${productInfo.price.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-base">
                                    <span className="text-muted-foreground">Discount</span>
                                    <span className="text-green-500">-${(productInfo.price - productInfo.discountedPrice).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-base">
                                    <span className="text-muted-foreground">Shipping</span>
                                    <span className="text-green-500">Free</span>
                                </div>
                                <div className="flex justify-between text-base">
                                    <span className="text-muted-foreground">Tax</span>
                                    <span className="text-foreground">$0.00</span>
                                </div>

                                <div className="flex justify-between items-center pt-2">
                                    <span className="text-2xl font-semibold text-foreground">Total Paid</span>
                                    <span className="text-2xl font-bold text-primary">${paymentInfo.totalAmount.toFixed(2)}</span>
                                </div>

                                <div className="flex items-center justify-center gap-2 pt-2">
                                    <span className="badge bg-green-500/10 text-green-500 border-green-500/20 uppercase">
                                        <FiCheckCircle className="w-3 h-3 mr-1" />
                                        {paymentInfo.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                        {/* buttons */}
                        <div className="space-y-3 text-lg">
                            <button className="w-full gap-2 py-4 bg-primary text-white rounded-2xl hover:bg-primary/90">
                                <Link to="/products" className='flex justify-center items-center gap-3'>
                                    <FiShoppingBag className="w-4 h-4" />
                                    Continue Shopping
                                </Link>
                            </button>

                            <button
                                onClick={handleDownloadReceipt}
                                className="flex w-full justify-center items-center bg-white rounded-2xl py-4 gap-2">
                                <FiDownload className="w-4 h-4" />
                                Receipt
                            </button>



                            <button className="w-full gap-2 py-4 rounded-2xl  hover:bg-primary hover:text-white">
                                <Link to="/" className='flex justify-center items-center gap-3'>
                                    <FiHome className="w-4 h-4" />
                                    Back to Home
                                </Link>
                            </button>
                        </div>
                    </div>

                </div>
            </motion.div>
        </div>
    );
};

export default PaymentSuccess;