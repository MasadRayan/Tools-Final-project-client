import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import HomePage from "../Pages/Home/HomePage";
import Contact from "../Pages/Contact/Contact";
import About from "../Pages/About/About";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";

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
            }
        ]
    }
])