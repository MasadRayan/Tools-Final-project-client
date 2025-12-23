import React, { useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner';

const AllPayments = () => {
    const axiosSecure = useAxiosSecure();
    const [page, setPage] = useState(0);

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['allPayments', page],
        queryFn: async () => {
            const res = await axiosSecure.get(`/ssl-payment/allPayment?page=${page}`);
            return res.data;
        }
    });

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    if (isError) {
        return <div className='text-5xl text-center font-black text-red-500'>Error loading all payments</div>
    }

    const payments = data?.data || [];
    const totalPages = Math.ceil((data.total || 0) / (data.limit || 1));

    return (
        <div className="overflow-x-auto p-4">
            <h2 className="text-2xl font-bold mb-6 text-center">All Payments</h2>

            {payments.length === 0 ? (
                <p className="text-center mt-6 text-lg font-semibold text-gray-500">
                    No payments found.
                </p>
            ) : (
                <>
                    <table className="table w-full bg-base-200 rounded-xl">
                        <thead>
                            <tr className="text-center">
                                <th>Name</th>
                                <th>Customer Name</th>
                                <th>Transaction ID</th>
                                <th>Status</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map(payment => (
                                <tr key={payment._id} className="text-center hover:bg-base-300 transition">
                                    <td>{payment.productName}</td>
                                    <td>{payment.userName}</td>
                                    <td>{payment.transactionID}</td>
                                    <td>
                                        <span className={'badge capitalize text-white bg-green-500'}>
                                            {payment.status}
                                        </span>
                                    </td>
                                    <td>{payment.totalAmount}</td>
                                    <td>{payment.productCategory}</td>
                                    <td>
                                        {payment.quantity}
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

export default AllPayments;