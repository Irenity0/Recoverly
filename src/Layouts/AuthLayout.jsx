import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navabr";
import Footer from "../Components/Footer";
import DynamicTitle from "../utilities/DuynamicTitle";

const AuthLayout = () => {
    return (
        <>
        <DynamicTitle />
        <Navbar/>
       <section className="w-11/12 mx-auto">
       </section>
        <br />
        <Outlet/>
        <Footer/>
        </>
    );
};

export default AuthLayout;