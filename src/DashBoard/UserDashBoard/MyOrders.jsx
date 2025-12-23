import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../Hooks/useAuth';
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

const MyOrders = () => {
    useEffect(() => {
        document.title = "My Orders";
    }, [])
    const axiosSecure = useAxiosSecure();
    const [page, setPage] = useState(0);
    const { user } = useAuth()

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['my-orders', page],
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders/user-orders/${user.email}?page=${page}`);
            return res.data;
        }
    })

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    if (isError) {
        return <div className='text-5xl text-center font-black text-red-500'>Error loading orders</div>
    }
    const orders = data?.data || [];
    const totalPages = Math.ceil((data.total || 0) / (data.limit || 1));

    // Check if the order is older than 24 hours
    const isOlderThan24Hours = (isoDate) => {
        const orderTime = new Date(isoDate).getTime();
        const now = Date.now();

        const diffInMs = now - orderTime;
        const hours24 = 24 * 60 * 60 * 1000;

        return diffInMs >= hours24;
    };


    const handleOrderDelete = async (id) => {
        if (isOlderThan24Hours(orders.date)) {
            Swal.fire({
                icon: 'error',
                title: 'Cannot Delete',
                text: 'This order is older than 24 hours and cannot be deleted.',
            });
            return;
        }

        try {
            const res = await Swal.fire({
                title: "Are you sure?",
                text: 'You are about to delete this order.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#4A70A9',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const res = await axiosSecure.delete(`/orders/delete/${id}`);
                    if (res.data.deletedCount > 0) {
                        Swal.fire(
                            'Deleted!',
                            'Your order has been deleted.',
                            'success'
                        );
                        refetch();
                    }
                }
            })
        } catch (error) {
            toast.error("Failed to delete order");
        }


    }

    return (
        <div className="overflow-x-auto p-4">
            <h2 className="text-2xl font-bold mb-6 text-center">All Orders</h2>

            {orders.length === 0 ? (
                <p className="text-center mt-6 text-lg font-semibold text-gray-500">
                    No orders found.
                </p>
            ) : (
                <>
                    <table className="table w-full bg-base-200 rounded-xl">
                        <thead>
                            <tr className="text-center">
                                <th>Image</th>
                                <th>Name</th>
                                <th>Customer Name</th>
                                <th>Transaction ID</th>
                                <th>Status</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Quantity</th>
                                <th>Delivary Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id} className="text-center hover:bg-base-300 transition">
                                    <td>
                                        <div className="flex justify-center">
                                            <img
                                                src={order.productImage}
                                                alt={order.productName}
                                                referrerPolicy='no-referrer'
                                                className="w-14 h-14 object-cover"
                                            />
                                        </div>
                                    </td>
                                    <td>{order.productName}</td>
                                    <td>{order.name}</td>
                                    <td>{order.transactionID}</td>
                                    <td>
                                        <span className={`badge capitalize text-white ${order.status === 'pending' ? 'bg-yellow-500' : order.status === 'success' ? 'bg-orange-500' : 'bg-green-500'}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td>{order.totalAmount}</td>
                                    <td>{order.productCategory}</td>
                                    <td>
                                        {order.quantity}
                                    </td>
                                    <td className="flex gap-2 justify-center items-center">

                                        {
                                            order.status === 'delivered' ? (<>
                                                <button
                                                    disabled
                                                    className='btn btn-sm bg-green-500 text-white mt-2 cursor-pointer'
                                                >
                                                    Delivered
                                                </button>
                                            </>) : (<>
                                                <button
                                                    onClick={() => { handleOrderDelete(order._id) }}
                                                    className='btn btn-sm bg-red-500 text-white mt-2 cursor-pointer'
                                                >
                                                    Delete
                                                </button>
                                            </>)
                                        }

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

export default MyOrders;