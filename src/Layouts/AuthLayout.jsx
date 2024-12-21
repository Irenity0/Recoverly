import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navabr";
import Footer from "../Components/Footer";

const AuthLayout = () => {
    return (
        <>
        <Navbar/>
        <Outlet/>
        <Footer/>
        </>
    );
};

export default AuthLayout;