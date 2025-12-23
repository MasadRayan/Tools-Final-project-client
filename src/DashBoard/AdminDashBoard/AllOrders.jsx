import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner';


const AllOrders = () => {
    useEffect(() => {
        document.title = 'All Orders';
    }, [])

    const axiosSecure = useAxiosSecure();
    const [page, setPage] = useState(0);

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['allOrders', page],
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders/paginated-orders?page=${page}`);
            return res.data
        }
    })

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    if (isError) {
        return <div className='text-5xl text-center font-black text-red-500'>Can't load orders</div>
    }

    const orders = data?.data || [];
    const totalPages = Math.ceil((data?.total || 0) / (data?.limit || 1));

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
                                    <td>{order.totalAmount}</td>
                                    <td>{order.productCategory}</td>
                                    <td>
                                        {order.quantity}
                                    </td>
                                    <td className="flex gap-2 justify-center items-center">
                                        <button
                                            className='btn btn-sm btn-primary text-white mt-2'
                                        >Delivered</button>
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

export default AllOrders;