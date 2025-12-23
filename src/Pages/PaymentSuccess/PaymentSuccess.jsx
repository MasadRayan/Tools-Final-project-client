import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const trxid = searchParams.get("trxid");
    const axiosSeecure = useAxiosSecure();
    const { user } = useAuth();

    const { data, isLoading, refetch, isError } = useQuery({
        queryKey: ['paymentSuccess', trxid],
        queryFn: async () => {
            const res = await axiosSeecure.get(`/products/transaction/${trxid}`)
            return res.data;
        },
        enabled: !!trxid && !!user?.email
    })

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    if (isError) {
        return <div className='text-5xl text-center font-bold text-red-500'>Error loading payment details.</div>;
    }

    const {paymentInfo, productInfo, updateProductQuantity} = data;

    console.log(productInfo._id);

    return (
        <div>
            <h1>Payment Success </h1>
        </div>
    );
};

export default PaymentSuccess;