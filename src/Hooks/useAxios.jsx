import axios from 'axios';
import React from 'react';

const axiosInstance = axios.create({
    baseURL: 'https://byu-nest-server.vercel.app/api',
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;