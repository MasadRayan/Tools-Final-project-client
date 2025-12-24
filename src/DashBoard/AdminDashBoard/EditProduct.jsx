import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import {
    FiPlus,
    FiTrash2,
    FiImage,
    FiSave,
    FiArrowLeft,
    FiPackage,
    FiDollarSign,
    FiFileText,
    FiSettings,
    FiDroplet
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const categories = ['Electronics', 'Fashion', 'Home & Living', 'Beauty', 'Sports', 'Books'];


const EditProduct = () => {
    useEffect(() => {
        document.title = 'Edit Product';
    }, [])
    const axiosSecure = useAxiosSecure();

    const {id} = useParams();

    const { data, isLoading, isError} = useQuery({
        queryKey: ['product', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/products/${id}`);
            return res.data;
        }
    })

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    if (isError) {
        return <div className='text-5xl text-center text-red-500 font-bold my-80'>Can't find the product</div>
    }

    const product = data || {};


    const onSubmit = async (data) => {
        const result = await Swal.fire({
            title: "Are you sure? ",
            text: "You are about to update this product.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4A70A9',
            cancelButtonColor: '#d33',
            confirmButtonText: "Yes, update it!"
        }).then(async (result) => {
        if (result.isConfirmed) {
            const res = await axiosSecure.patch(`/products/update/${id}`, data);
            if (res.data.modifiedCount > 0) {
                Swal.fire(
                    'Updated!',
                    'Your product has been updated.',
                    'success'
                );
                reset();
            }
        } else if (result.isDenied) {
            Swal.fire('Error', 'Failed to update product.', 'error');
        }
        });
    }





    return (
        <div className="min-h-screen bg-base-100">
            <main className="py-8">
                <div className="container mx-auto px-4 max-w-5xl">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <button
                            onClick={() => navigate(-1)}
                            className="mb-4 flex items-center gap-2 text-accent hover:text-primary transition-colors"
                        >
                            <FiArrowLeft /> Back
                        </button>

                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-primary to-secondary flex items-center justify-center">
                                <FiPackage className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-secondary">Update Product Information</h1>
                                <p className="text-accent mt-1">Edit and update product details</p>
                            </div>
                        </div>
                    </motion.div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        {/* Basic Information */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <div className="card bg-white shadow-lg">
                                <div className="card-body">
                                    <h2 className="card-title text-xl flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                            <FiFileText className="w-5 h-5 text-primary" />
                                        </div>
                                        Basic Information
                                    </h2>

                                    <div className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text font-medium">Product Name *</span>
                                                </label>
                                                <input
                                                    defaultValue={product.name}
                                                    disabled
                                                    type="text"
                                                    className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`}
                                                    
                                                />
                                            </div>

                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text font-medium">Category *</span>
                                                </label>
                                                <input
                                                    defaultValue={product.category}
                                                    disabled
                                                    type="text"
                                                    className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`}
                                                    
                                                />
                                                
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Pricing & Inventory */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="card bg-white shadow-lg">
                                <div className="card-body">
                                    <h2 className="card-title text-xl flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                                            <FiDollarSign className="w-5 h-5 text-green-500" />
                                        </div>
                                        Pricing & Inventory
                                    </h2>

                                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text font-medium">Price ($) *</span>
                                            </label>
                                            <input
                                                defaultValue={product.price}
                                                type="number"
                                                step="0.01"
                                                placeholder="0.00"
                                                className={`input input-bordered w-full ${errors.price ? 'input-error' : ''}`}
                                                {...register('price', {
                                                    required: 'Price is required',
                                                    min: { value: 0.01, message: 'Price must be greater than 0' }
                                                })}
                                            />
                                            {errors.price && (
                                                <label className="label">
                                                    <span className="label-text-alt text-error">{errors.price.message}</span>
                                                </label>
                                            )}
                                        </div>

                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text font-medium">Discounted Price ($)</span>
                                            </label>
                                            <input
                                                defaultValue={product.discountedPrice}
                                                type="number"
                                                step="0.01"
                                                placeholder="0.00"
                                                className={`input input-bordered w-full ${errors.discountedPrice ? 'input-error' : ''}`}
                                                {...register('discountedPrice', {
                                                    min: { value: 0, message: 'Discounted price cannot be negative' }
                                                })}
                                            />
                                            {errors.discountedPrice && (
                                                <label className="label">
                                                    <span className="label-text-alt text-error">{errors.discountedPrice.message}</span>
                                                </label>
                                            )}
                                        </div>

                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text font-medium">Quantity *</span>
                                            </label>
                                            <input
                                                defaultValue={product.quantity}
                                                type="number"
                                                placeholder="0"
                                                className={`input input-bordered w-full ${errors.quantity ? 'input-error' : ''}`}
                                                {...register('quantity', {
                                                    required: 'Quantity is required',
                                                    min: { value: 0, message: 'Quantity cannot be negative' }
                                                })}
                                            />
                                            {errors.quantity && (
                                                <label className="label">
                                                    <span className="label-text-alt text-error">{errors.quantity.message}</span>
                                                </label>
                                            )}
                                        </div>

                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text font-medium">Initial Rating (0-5)</span>
                                            </label>
                                            <input
                                                defaultValue={product.rating}
                                                type="number"
                                                step="0.1"
                                                min="0"
                                                max="5"
                                                placeholder="0.0"
                                                className={`input input-bordered w-full ${errors.rating ? 'input-error' : ''}`}
                                                {...register('rating', {
                                                    min: { value: 0, message: 'Rating cannot be negative' },
                                                    max: { value: 5, message: 'Rating must be between 0 and 5' }
                                                })}
                                            />
                                            {errors.rating && (
                                                <label className="label">
                                                    <span className="label-text-alt text-error">{errors.rating.message}</span>
                                                </label>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>



                        {/* Submit Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-col sm:flex-row gap-4 justify-end"
                        >
                            <button
                                type="button"
                                onClick={() => reset()}
                                className="btn btn-outline btn-lg"
                            >
                                Reset Form
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary btn-lg gap-3"
                            >
                                <FiSave className="w-5 h-5" />
                                Update Product

                            </button>
                        </motion.div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default EditProduct;