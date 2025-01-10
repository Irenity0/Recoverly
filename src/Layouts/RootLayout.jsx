import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navabr";
import Footer from "../Components/Footer";
import DynamicTitle from "../utilities/DuynamicTitle";

const RootLayout = () => {
    return (
        <>
        <DynamicTitle />
        <Navbar/>
        <div className="w-11/12 mx-auto space-y-14">
            <br />
            <Outlet/>
            <Footer/>
        </div>
        </>
    );
};

export default RootLayout;