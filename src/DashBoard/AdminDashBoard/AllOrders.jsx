import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const AllOrders = () => {
    useEffect(() => {
        document.title = 'All Orders';
    },[])

    const axiosSecure = useAxiosSecure();
    const [page, setPage] = useState(0);

    

    return (
        <div>
            
        </div>
    );
};

export default AllOrders;