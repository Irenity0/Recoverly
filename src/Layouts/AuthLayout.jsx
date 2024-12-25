import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navabr";
import Footer from "../Components/Footer";
import DynamicTitle from "../utilities/DuynamicTitle";

const AuthLayout = () => {
    return (
        <>
        <DynamicTitle />
        <Navbar/>
        <Outlet/>
        <Footer/>
        </>
    );
};

export default AuthLayout;