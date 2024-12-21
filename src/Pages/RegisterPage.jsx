import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "../context/AuthContext";

const RegisterPage = () => {
  const { createUser, handleGoogleSignIn } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.elements.name.value;
    const photo = form.elements.photo.value;
    const email = form.elements.email.value;
    const password = form.elements.password.value;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be at least 6 characters long, contain one uppercase letter, and one lowercase letter."
      );
    } else {
      createUser(email, password)
        .then((result) => {
          console.log("User created:", result.user);

          toast.success("Registered Successfully! 🎉");

        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error("An error occurred during registration. Please try again.");
        });

      form.reset();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card-body md:w-5/6 mx-auto my-12">
      <h1 className="text-5xl font-extrabold text-center text-primary">
        Register Page
      </h1>

      {/* Name Field */}
      <div className="form-control">
        <label className="label">
          <span className="label-text text-accent font-semibold">Name</span>
        </label>
        <input
          name="name"
          type="text"
          placeholder="name"
          className="input input-bordered border-accent placeholder-accent"
          required
        />
      </div>

      {/* Photo URL Field */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Photo URL</span>
        </label>
        <input
          name="photo"
          type="text"
          placeholder="pfp url"
          className="input input-bordered border-accent placeholder-accent"
          required
        />
      </div>

      {/* Email Field */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          name="email"
          type="email"
          placeholder="email"
          className="input input-bordered border-accent placeholder-accent"
          required
        />
      </div>

      {/* Password Field */}
      <div className="form-control relative">
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="password"
          className="input input-bordered border-accent placeholder-accent"
          required
        />
        <button
          type="button"
          className="btn btn-sm absolute bg-accent/30 hover:bg-accent/30 border-none right-4 top-1/2 transform -translate-y-1/2"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "hide" : "show"}
        </button>
        <label className="label">
          <a href="#" className="label-text-alt link link-hover">
            Forgot password?
          </a>
        </label>
      </div>

      {/* Register & Google Auth Buttons */}
      <div className="form-control mt-6">
        <button className="btn btn-primary text-accent">Register</button>
        <button
          onClick={handleGoogleSignIn}
          type="button"
          className="btn text-accent btn-secondary mt-4"
        >
          Login with Google
        </button>
        <span className="text-xl font-semibold text-accent mt-4">
          Already have an Account?{" "}
          <Link className="underline text-primary" to={"/auth/login"}>
            Login
          </Link>
        </span>
      </div>
    </form>
  );
};

export default RegisterPage;
