import axios from 'axios';
import { useEffect } from 'react';
import useAuth from './useAuth';

const axiosSecure = axios.create({
  baseURL: 'http://localhost:5000'
});

const useAxiosSecure = () => {
  const { user, logOut, loading } = useAuth();

  useEffect(() => {
    if (!loading && user?.accessToken) {
      // ✅ set request interceptor
      const requestInterceptor = axiosSecure.interceptors.request.use(
        (config) => {
          config.headers.Authorization = `Bearer ${user.accessToken}`;
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );

      // ✅ set response interceptor for 401/403 auto logout
      const responseInterceptor = axiosSecure.interceptors.response.use(
        (response) => response,
        (error) => {
          if (error?.response?.status === 401 || error?.response?.status === 403) {
            logOut()
              .then(() => console.log("Logged out due to invalid token"))
              .catch(console.error);
          }
          return Promise.reject(error);
        }
      );

      // ✅ cleanup: remove interceptors on unmount or on user change
      return () => {
        axiosSecure.interceptors.request.eject(requestInterceptor);
        axiosSecure.interceptors.response.eject(responseInterceptor);
      };
    }
  }, [user, loading, logOut]);

  return axiosSecure;
};

export default useAxiosSecure;