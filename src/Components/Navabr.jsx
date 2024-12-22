import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Tooltip } from 'react-tooltip';
import { FaMagnifyingGlass } from "react-icons/fa6";
import ThemeToggle from "./ThemeToggle";
import AuthContext from "../context/AuthContext";
import useAxiosSecure from "../hooks/UseAxiosSecure";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [mongoUser, setMongoUser] = useState(null);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
      if (user?.email) {
        axiosSecure
          .get(`/users/${user.email}`)
          .then((res) => setMongoUser(res.data))
          .catch((error) => console.error("Error fetching MongoDB user:", error));
      }
    }, [user]);
    

    const avatarURL = user?.photoURL || mongoUser?.photo || "https://via.placeholder.com/150";
    const displayname = user?.displayName || mongoUser?.name || "User";

    const handleLogout = () => {
        logOut()
            .then(() => console.log("Logged out successfully"))
            .catch((error) => console.error("Error logging out:", error));
    };

    return (
        <div className="navbar bg-base font-raleway text-primary w-11/12 mx-auto mt-4">
            <div className="navbar-start">
                <div className="dropdown">
                    <button tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </button>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content z-10 bg-base-100 rounded-box mt-3 w-52 p-2 shadow">
                        <li><NavLink to={"/"}>Home</NavLink></li>
                        <li><NavLink to={"/allItems"}>Lost and Found Items</NavLink></li>
                        <li><NavLink to={"/blogs"}>Blogs</NavLink></li>
                        <li><NavLink to={"/aboutus"}>About Us</NavLink></li>
                        <li className="md:hidden"><ThemeToggle /></li>
                    </ul>
                </div>
                <div className="flex justify-between items-center flex-row">
                    <FaMagnifyingGlass />
                    <Link to={"/"} className="btn btn-ghost text-2xl font-bold text-primary hover:bg-neutral">Recoverly</Link>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu space-x-2 menu-horizontal px-1">
                    <li><NavLink to={"/"}>Home</NavLink></li>
                    <li><NavLink to={"/allItems"}>Lost and Found Items</NavLink></li>
                    <li><NavLink to={"/blogs"}>Blogs</NavLink></li>
                    <li><NavLink to={"/aboutus"}>About Us</NavLink></li>
                </ul>
            </div>
            <div className="navbar-end hidden md:flex space-x-4 items-center">
                {!user ? (
                    <>
                        <Link to={"/auth/login"} className="btn border-2 border-primary text-primary hover:bg-neutral hover:border-primary mr-4">Login</Link>
                        <Link to={"/auth/register"} className="btn border-2 border-primary text-primary hover:bg-neutral hover:border-primary mr-4">Register</Link>
                    </>
                ) : (
                    <>
                        {/* Avatar dropdown */}
                        <div className="avatar dropdown">
                            <button tabIndex={0} className="w-14 h-14 rounded-full">
                                <img className="rounded-full" src={avatarURL} alt={displayname} />
                            </button>
                            {/* Dropdown content */}
                            <ul className="menu dropdown-content bg-base-100 rounded-box z-[99] w-52 p-2 shadow">
                                <li><Link to="/additem">Add Lost & Found Item</Link></li>
                                <li><Link to="/recovereditems">Recovered Items</Link></li>
                                <li><Link to="/myitems">Manage My Items</Link></li>
                            </ul>
                        </div>
                        <button className="mr-4 btn border-2 border-primary text-primary hover:bg-neutral hover:border-primary" onClick={handleLogout}>Log out</button>
                    </>
                )}
                <ThemeToggle />
                <Tooltip id="my-tooltip" />
            </div>
        </div>
    );
};

export default Navbar;
