import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <>
        <h1 className="text-7xl font-extrabold text-primary">404 ERROR: PAGE NOT FOUND</h1>
        <br />
        <Link to={"/"} className="btn btn-outline border-2 border-primary text-primary font-semibold hover:bg-neutral hover:text-primary hover:border-primary">Return to Home</Link>
        </>
    );
};

export default ErrorPage;