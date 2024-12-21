import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddPostPage = () => {
  const { currentUser } = useContext(AuthContext); // Assuming AuthContext provides logged-in user details
  const [formData, setFormData] = useState({
    postType: "Lost",
    thumbnail: null,
    title: "",
    description: "",
    category: "",
    location: "",
    dateLost: new Date(),
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleThumbnailChange = (e) => {
    setFormData((prev) => ({ ...prev, thumbnail: e.target.files[0] }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, dateLost: date }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      ...formData,
      dateLost: formData.dateLost.toISOString(),
      contactInfo: {
        name: currentUser?.displayName || "Anonymous",
        email: currentUser?.email || "No email provided",
      },
    };

    const formDataToSend = new FormData();
    for (const key in postData) {
      if (key === "thumbnail") {
        formDataToSend.append(key, postData[key]);
      } else {
        formDataToSend.append(key, JSON.stringify(postData[key]));
      }
    }

    try {
      const response = await fetch("https://your-backend-endpoint/items", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        toast.success("Post added successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate("/"); // Redirect to another page after successful submission
      } else {
        throw new Error("Failed to add post");
      }
    } catch (error) {
      console.error(error);
      toast.error(`Error adding post: ${error.message}`, {
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
    <div className="max-w-3xl  mx-auto p-6 shadow-md rounded-lg">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-6 text-center">Add Lost/Found Post</h1>
      <form onSubmit={handleSubmit}>
        {/* Post Type */}
        <div className="mb-4">
          <label className="block font-bold mb-2">Post Type</label>
          <select
            name="postType"
            value={formData.postType}
            onChange={handleChange}
            className="input input-bordered w-full"
          >
            <option value="Lost">Lost</option>
            <option value="Found">Found</option>
          </select>
        </div>

        {/* Thumbnail */}
        <div className="mb-4">
          <label className="block font-bold mb-2">Thumbnail</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleThumbnailChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Title */}
        <div className="mb-4">
          <label className="block font-bold mb-2">Title</label>
          <input
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter a descriptive title"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block font-bold mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Provide detailed information about the item"
            className="textarea textarea-bordered w-full"
            required
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block font-bold mb-2">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          >
            <option value="">Select a category</option>
            <option value="Pets">Pets</option>
            <option value="Documents">Documents</option>
            <option value="Gadgets">Gadgets</option>
            <option value="Others">Others</option>
          </select>
        </div>

        {/* Location */}
        <div className="mb-4">
          <label className="block font-bold mb-2">Location</label>
          <input
            name="location"
            type="text"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter the location where the item was lost"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Date Lost */}
        <div className="mb-4">
          <label className="block font-bold mb-2">Date Lost</label>
          <DatePicker
            selected={formData.dateLost}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            className="input input-bordered w-full"
          />
        </div>

        {/* Contact Info (Read-Only) */}
        <div className="mb-4">
          <label className="block font-bold mb-2">Contact Information</label>
          <input
            type="text"
            value={currentUser?.displayName || "Anonymous"}
            className="input input-bordered w-full mb-2"
            readOnly
          />
          <input
            type="email"
            value={currentUser?.email || "No email provided"}
            className="input input-bordered w-full"
            readOnly
          />
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button type="submit" className="btn btn-primary w-full">
            Add Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPostPage;
