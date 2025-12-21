import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';

const AllUsers = () => {
    useEffect(() => {
        document.title = 'All Users';
    }, [])

    const axiosSecure = useAxiosSecure();
    const [page, setPage] = useState(0);

    const {
        data, isLoading, error, refetch
    } = useQuery({
        queryKey: ['allUsers', page],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?page=${page}`);
            return res.data
        }
    })

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    const users = data?.data || [];
    const totalPages = Math.ceil((data?.total || 0) / (data?.limit || 1));

    const updateRole = async (email, newRole) => {
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: `You are about to set this user's role to ${newRole}.`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#4A70A9',
                cancelButtonColor: '#d33',
                confirmButtonText: `Yes, set as ${newRole}`
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const res = await axiosSecure.patch(`/users/role/${email}`, { role: newRole });
                    if (res.data.modifiedCount > 0) {
                        Swal.fire(
                            'Success!',
                            `User role has been updated to ${newRole}.`,
                            'success'
                        );
                        refetch();
                    }
                } else if (result.isDenied) {
                    Swal.fire('Error', 'Failed to update role.', 'error');
                }
            });
        } catch (error) {

        }
    }

    return (
        <div className="overflow-x-auto p-4">
            <h2 className="text-2xl font-bold mb-6 text-center">All Users</h2>

            {users.length === 0 ? (
                <p className="text-center mt-6 text-lg font-semibold text-gray-500">
                    No users found.
                </p>
            ) : (
                <>
                    <table className="table w-full bg-base-200 rounded-xl">
                        <thead>
                            <tr className="text-center">
                                <th>Name</th>
                                <th>Email</th>
                                <th>Image</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id} className="text-center hover:bg-base-300 transition">
                                    <td>{user.displayName}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <div className="flex justify-center">
                                            <img
                                                src={user.photoURL}
                                                alt={user.displayName}
                                                referrerPolicy='no-referrer'
                                                className="w-10 h-10 rounded-full object-cover"
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`badge capitalize text-white ${user.role === 'admin' ? 'bg-primary' : 'bg-gray-500'}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="flex gap-2 justify-center">
                                        {user.role !== 'admin' && (
                                            <button
                                                onClick={() => updateRole(user.email, 'admin')}
                                                className="btn btn-sm bg-primary hover:bg-secondary text-white px-5"
                                            >
                                                Make Admin
                                            </button>
                                        )}
                                        {user.role === 'admin' && (
                                            <button
                                                onClick={() => updateRole(user.email, 'user')}
                                                className="btn btn-sm btn-error text-white"
                                            >
                                                Remove Admin
                                            </button>
                                        )}
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

export default AllUsers;