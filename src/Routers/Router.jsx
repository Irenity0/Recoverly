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
import UpdatePost from "../Pages/UpdatePost";
import axios from "axios";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout/>,
        children: [
            {
                path: "/",
                element: <HomePage/>,
                loader: () => fetch('https://recoverly-server.vercel.app/posts/public')
            },
            {
                path: "/allItems",
                element: <LostAndFound/>
            }, 
            {
        
                path: "/items/:id",
                element: <PrivateRoute><DetailsPage/></PrivateRoute>
                
                  
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
                element: <PrivateRoute><RecoveriesPage/></PrivateRoute>            
            },
            {
                path: '/myitems',
                element: <PrivateRoute><MyPosts/></PrivateRoute>,
                loader: () => axios.get(`https://recoverly-server.vercel.app/posts`, { withCredentials: true })
                // loader: () => fetch(`https://recoverly-server.vercel.app/posts`)
            },
            {
                path: '/updateItem/:id',
                element: <PrivateRoute><UpdatePost/></PrivateRoute>,
                // loader: ({ params }) => fetch(`https://recoverly-server.vercel.app/posts/${params.id}`)
                loader: ({params}) => axios.get(`https://recoverly-server.vercel.app/posts/${params.id}`, { withCredentials: true })
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