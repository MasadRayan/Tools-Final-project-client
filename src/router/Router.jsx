import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import HomePage from "../Pages/Home/HomePage";
import Contact from "../Pages/Contact/Contact";
import About from "../Pages/About/About";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import ProductPage from "../Pages/ProductPage/ProductPage";
import ProductDetailsPage from "../Pages/ProductDetailsPage/ProductDetailsPage";
import PrivateRoute from "../Routes/PrivateRoute";
import DashBoardLayout from "../Layouts/DashBoardLayout";
import DashBoardHome from "../DashBoard/DashBoardHome/DashBoardHome";
import AdminRoute from "../Routes/AdminRoute";
import AddProducts from "../DashBoard/AdminDashBoard/AddProducts";
import Profile from "../DashBoard/Profile/Profile";
import AllUsers from "../DashBoard/AdminDashBoard/AllUsers";
import AllProducts from "../DashBoard/AdminDashBoard/AllProducts";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: HomePage,
            },
            {
                path: '/about',
                Component: About,
            },
            {
                path: '/contact',
                Component: Contact
            },
            {
                path: '/login',
                Component: Login
            },
            {
                path: "/register",
                Component: Register,
            },
            {
                path: '/products',
                Component: ProductPage,
            },
            {
                path: '/product/:id',
                element: <PrivateRoute>
                    <ProductDetailsPage></ProductDetailsPage>
                </PrivateRoute>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute>
            <DashBoardLayout></DashBoardLayout>
        </PrivateRoute>,
        children: [
            {
                index: true,
                Component: DashBoardHome,
            },
            {
                path: 'profile',
                Component: Profile,
            },
            // Admin Routes
            {
                path: 'addProducts',
                element: <AdminRoute>
                    <AddProducts></AddProducts>
                </AdminRoute>
            },
            {
                path: 'allUsers',
                element: <AdminRoute>
                    <AllUsers></AllUsers>
                </AdminRoute>
            },
            {
                path: 'allProducts',
                element: <AdminRoute>
                    <AllProducts></AllProducts>
                </AdminRoute>
            }
        ]

    },
    {
        path: '*',
        Component: RootLayout
    }
])