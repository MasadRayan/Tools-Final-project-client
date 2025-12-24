import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner';
import { useQuery } from '@tanstack/react-query';
import { FiStar } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const AllProducts = () => {
    useEffect(() => {
        document.title = "All Products";
    }, []);

    const axiosSecure = useAxiosSecure();
    const [page, setPage] = useState(0);

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['allProducts', page],
        queryFn: async () => {
            const res = await axiosSecure.get(`/products/products-paginated?page=${page}`);
            return res.data
        }
    })

    const products = data?.data || []

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    const totalPages = Math.ceil((data?.total || 0) / (data?.limit || 1));

    const handleProductDelete = async (id) => {
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You are about to delete this product.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#4A70A9',
                cancelButtonColor: '#d33',
                confirmButtonText: "Yes, delete it!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const res = await axiosSecure.delete(`/products/delete/${id}`);
                    if (res.data.deletedCount > 0) {
                        Swal.fire(
                            'Deleted!',
                            'Your product has been deleted.',
                            'success'
                        );
                        refetch();
                    }
                } else if (result.isDenied) {
                    Swal.fire('Error', 'Failed to delete product.', 'error');
                }
            })
        } catch (error) {
            toast.error("Failed to delete product");
        }
    }

    return (
        <div className="overflow-x-auto p-4">
            <h2 className="text-2xl font-bold mb-6 text-center">All Products</h2>

            {products.length === 0 ? (
                <p className="text-center mt-6 text-lg font-semibold text-gray-500">
                    No products found.
                </p>
            ) : (
                <>
                    <table className="table w-full bg-base-200 rounded-xl">
                        <thead>
                            <tr className="text-center">
                                <th>Image</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Discounted Price</th>
                                <th>Quantity</th>
                                <th>Rating</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product._id} className="text-center hover:bg-base-300 transition">
                                    <td>
                                        <div className="flex justify-center">
                                            <img
                                                src={product.images[0]}
                                                alt={product.name}
                                                referrerPolicy='no-referrer'
                                                className="w-12 h-12 rounded-xl object-cover"
                                            />
                                        </div>
                                    </td>
                                    <td>{product.name}</td>
                                    <td>{product.category}</td>

                                    <td>
                                        ${product.price}
                                    </td>
                                    <td>
                                        ${product.discountedPrice}
                                    </td>
                                    <td>
                                        {product.quantity}
                                    </td>
                                    <td>
                                        <span className='flex justify-center items-center gap-2'>
                                            {product.rating}
                                            <FiStar className='text-yellow-400 fill-yellow-400' size={18} />
                                        </span>
                                    </td>
                                    <td className="flex gap-2 justify-center">
                                        <button className="btn btn-sm btn-primary">Edit</button>
                                        <button onClick={() => handleProductDelete(product._id)} className="btn btn-sm btn-error">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="flex justify-center mt-6 space-x-2">
                        {totalPages >= 1 &&
                            [...Array(totalPages).keys()].map(num => (
                                <button
                                    key={num}
                                    onClick={() => setPage(num)}
                                    className={`btn btn-sm ${page === num ? 'bg-primary text-white' : 'btn-outline'}`}
                                >
                                    {num + 1}
                                </button>
                            ))
                        }
                    </div>

                </>
            )}
        </div>
    );
};

export default AllProducts;