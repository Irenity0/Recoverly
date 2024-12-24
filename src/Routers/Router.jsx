import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../Layouts/RootLayout";
import HomePage from "../Pages/HomePage";
import AuthLayout from "../Layouts/AuthLayout";
import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";
import ErrorPage from "../Pages/ErrorPage";
import LostAndFound from "../Pages/LostAndFound";
import BlogsPage from "../Pages/Blogs";
import AboutUs from "../Pages/AboutUs";
import AddPostPage from "../Pages/AddPostPage";
import PrivateRoute from "./PrivateRoute";
import DetailsPage from "../Pages/detailsPage";
import RecoveriesPage from "../Pages/RecoveriesPage";
import MyPosts from "../Pages/MyItems";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout/>,
        children: [
            {
                path: "/",
                element: <HomePage/>,
            },
            {
                path: "/allItems",
                element: <LostAndFound/>
            }, 
            {
                path: "/items/:id",
                element: <PrivateRoute><DetailsPage/></PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/posts/${params.id}`)
            },
            {
                path: "/blogs",
                element: <BlogsPage/>
            },
            {
                path: "/aboutus",
                element: <AboutUs/>
            },
            {
                path: "/additem",
                element: <PrivateRoute><AddPostPage/></PrivateRoute>
            }, 
            {
                path: '/recoveredItems',
                element: <RecoveriesPage/>,
                loader: () => fetch(`http://localhost:5000/recoveries`)
            },
            {
                path: '/myitems',
                element: <MyPosts/>,
                loader: () => fetch(`http://localhost:5000/posts`)
            }
        ]
    },
    {
        path: "/auth",
        element: <AuthLayout/>,
        children: [
            {
                path: "/auth/login",
                element: <LoginPage/>
            },
            {
                path: "/auth/register",
                element: <RegisterPage/>
            }
        ]
    },
    {
        path: "*",
        element: <ErrorPage/>
    }
]);

export default router;