import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Loading from "../Components/Loading";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();  
 
    if (loading) {
        return <Loading />; 
    }

    if (user && user?.email) {
        return children;
    }

    return <Navigate to="/auth/login" state={{ from: location }} />;
};

export default PrivateRoute;