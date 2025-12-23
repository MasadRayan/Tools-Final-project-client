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
import PaymentSuccess from "../Pages/PaymentSuccess/PaymentSuccess";
import AllOrders from "../DashBoard/AdminDashBoard/AllOrders";
import UserRoute from "../Routes/UserRoute";
import MyOrders from "../DashBoard/UserDashBoard/MyOrders";
import PaymentHistory from "../DashBoard/UserDashBoard/PaymentHistory";
import AllPayments from "../DashBoard/AdminDashBoard/AllPayments";

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
            },
            {
                path: '/success',
                element: <PrivateRoute>
                    <PaymentSuccess></PaymentSuccess>
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
            },
            {
                path: 'allOrders',
                element: <AdminRoute>
                    <AllOrders></AllOrders>
                </AdminRoute>
            },
            {
                path: 'allPayments',
                element: <AdminRoute>
                    <AllPayments></AllPayments>
                </AdminRoute>
            },

            // user routers 
            {
                path: 'myOrders',
                element: <UserRoute>
                    <MyOrders></MyOrders>
                </UserRoute>
            },
            {
                path: 'paymentHistory',
                element: <UserRoute>
                    <PaymentHistory></PaymentHistory>
                </UserRoute>
            }
        ]

    },
    {
        path: '*',
        Component: RootLayout
    }
])