import { useContext, useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import useAxiosSecure from "../hooks/UseAxiosSecure";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdatePost = () => {
  const loadedPost = useLoaderData();
  const post = loadedPost.data  // Get existing data to pre-fill fields
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  console.log(loadedPost.data);

  const [formData, setFormData] = useState({
    image: "",
    title: "",
    postType: "",
    description: "",
    category: "",
    location: "",
    date: "",
  });

  // Load post data into the form
  useEffect(() => {
    if (post) {
      setFormData({
        image: post.image || "",
        title: post.title || "",
        postType: post.postType || "",
        description: post.description || "",
        category: post.category || "",
        location: post.location || "",
        date: post.date || "",
      });
    }
  }, [post]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosSecure.put(`/posts/${post._id}`, formData); // Update the post in the database
      toast.success("Post updated successfully!");
    } catch (error) {
      console.error("Error updating post:", error);
      toast.error("Failed to update the post.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card-body md:w-5/6 mx-auto my-12">
      <h1 className="text-5xl font-extrabold text-center text-primary">Update Post</h1>

      {/* Image field */}
      <div className="form-control">
        <label className="label">
          <span className="label-text text-primary font-semibold">Image (URL)</span>
        </label>
        <input
          name="image"
          type="url"
          placeholder="Enter image"
          className="input input-bordered placeholder-primary border-accent"
          value={formData.image}
          onChange={handleChange}
          required
        />
      </div>

      {/* Post Title field */}
      <div className="form-control">
        <label className="label">
          <span className="label-text text-primary font-semibold">Post Title</span>
        </label>
        <input
          name="title"
          type="text"
          placeholder="Enter post title"
          className="input input-bordered placeholder-primary border-accent"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      {/* Post Type dropdown */}
      <div className="form-control">
        <label className="label">
          <span className="label-text text-primary font-semibold">Post Type</span>
        </label>
        <select
          name="postType"
          className="select select-bordered"
          value={formData.postType}
          onChange={handleChange}
          required
        >
          <option value="">Select type</option>
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>
      </div>

      {/* Description field */}
      <div className="form-control">
        <label className="label">
          <span className="label-text text-primary font-semibold">Description</span>
        </label>
        <textarea
          name="description"
          placeholder="Enter post description"
          className="textarea textarea-bordered placeholder-primary border-accent"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      {/* Category dropdown */}
      <div className="form-control">
        <label className="label">
          <span className="label-text text-primary font-semibold">Category</span>
        </label>
        <select
          name="category"
          className="select select-bordered"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select category</option>
          <option value="documents">Documents</option>
          <option value="gadgets">Gadgets</option>
          <option value="pet">Pet</option>
          <option value="book">Book</option>
          <option value="others">Others</option>
        </select>
      </div>

      {/* Location field */}
      <div className="form-control">
        <label className="label">
          <span className="label-text text-primary font-semibold">Location</span>
        </label>
        <input
          name="location"
          type="text"
          placeholder="Enter the location where it was lost/found"
          className="input input-bordered placeholder-primary border-accent"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </div>

      {/* Date field */}
      <div className="form-control">
        <label className="label">
          <span className="label-text text-primary font-semibold">Date Lost/Found</span>
        </label>
        <input
          name="date"
          type="date"
          className="input input-bordered placeholder-primary border-accent"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      {/* User email (read-only) */}
      <div className="form-control">
        <label className="label">
          <span className="label-text text-primary font-semibold">Your Email</span>
        </label>
        <input
          type="email"
          value={user?.email || ""}
          className="input input-bordered placeholder-primary border-accent"
          readOnly
        />
      </div>

      {/* User name (read-only) */}
      <div className="form-control">
        <label className="label">
          <span className="label-text text-primary font-semibold">Your Name</span>
        </label>
        <input
          type="text"
          value={user?.displayName || "User"}
          className="input input-bordered placeholder-primary border-accent"
          readOnly
        />
      </div>

      {/* Update button */}
      <div className="form-control mt-6">
        <button className="btn btn-primary text-[#FFDEB6]">Update Post</button>
      </div>

      <ToastContainer />
    </form>
  );
};

export default UpdatePost;
