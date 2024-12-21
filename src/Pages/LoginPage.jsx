import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signInUser, handleGoogleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const result = await signInUser(email, password);
      console.log("Logged in user:", result.user);

      toast.success("Login Successful! Welcome back!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/"); // Redirect to homepage or another page
    } catch (error) {
      console.error("Login Error:", error.message);

      toast.error(`Invalid email or password: ${error.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const user = await handleGoogleSignIn();
      console.log("Google user:", user);

      toast.success("Google Login Successful! Welcome back!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/");
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);

      toast.error(`Google Login Failed: ${error.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit} className="card-body md:w-5/6 mx-auto my-12">
        <h1 className="text-5xl font-extrabold text-center text-primary">
          Login Page
        </h1>

        {/* email field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-accent font-semibold">Email</span>
          </label>
          <input
            name="email"
            type="email"
            placeholder="email"
            className="input input-bordered placeholder-accent border-accent"
            required
          />
        </div>

        {/* password field */}
        <div className="form-control relative">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="password"
            className="input input-bordered placeholder-accent border-accent"
            required
          />
          <button
            type="button"
            className="btn btn-sm absolute bg-accent/30 hover:bg-accent/30 border-none right-4 top-2/3 transform -translate-y-1/3"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "hide" : "show"}
          </button>
        </div>

        {/*register btn & google auth  */}
        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary text-accent">
            Login
          </button>
          <button
            onClick={handleGoogleLogin}
            type="button"
            className="btn btn-secondary text-accent mt-4"
          >
            Login with Google
          </button>
          <span className="text-xl font-semibold text-accent mt-4">
            Don't have an Account?{" "}
            <Link className="underline text-primary" to={"/auth/register"}>
              Register
            </Link>
          </span>
        </div>
      </form>
    </>
  );
};

export default LoginPage;
