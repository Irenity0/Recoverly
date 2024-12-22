import { useState, useEffect, useContext } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Tooltip } from 'react-tooltip';
import useAxiosSecure from '../hooks/UseAxiosSecure';
import AuthContext from '../context/AuthContext';

const Addpost = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    image: '',
    title: '',
    postType: '',
    description: '',
    category: '',
    location: '',
    date: ''
  });

  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
  });

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user && (!user.displayName || !user.email)) {
      axiosSecure
        .get(`/users/${user.email}`)
        .then((res) =>
          setUserInfo({
            name: res.data.name || 'Guest',
            email: res.data.email,
          })
        )
        .catch((error) =>
          toast.error("Error fetching MongoDB user!", {
            position: 'top-right',
          })
        );
    } else if (user) {
      setUserInfo({
        name: user.displayName || 'Guest',
        email: user.email,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.image ||
      !formData.title ||
      !formData.postType ||
      !formData.description ||
      !formData.category ||
      !formData.location ||
      !formData.date
    ) {
      toast.error('Please fill all fields before submitting.', {
        position: 'top-right',
      });
      return;
    }

    const postData = {
      ...formData,
      email: userInfo.email,
      name: userInfo.name,
    };

    axiosSecure
      .post('/posts', postData)
      .then((res) => {
        if (res.data.insertedId) {
          toast.success('Post Added Successfully!', {
            position: 'top-right',
          });
          setFormData({
            image: '',
            title: '',
            postType: '',
            description: '',
            category: '',
            location: '',
            date: '',
          });
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error('Something went wrong. Please try again.', {
          position: 'top-right',
        });
      });
  };


  return (
    <form onSubmit={handleSubmit} className="card-body md:w-5/6 mx-auto my-12">
      <h1 className="text-5xl font-extrabold text-center text-primary">Add post</h1>

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

      {/* post title field */}
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

      {/* post type dropdown */}
      <div className="form-control">
        <label className="label">
          <span className="label-text text-primary font-semibold">post Type</span>
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

      {/* Category field */}
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
          <option value="bosuok">Book</option>
          <option value="book">Others</option>
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

      {/* Date lost/found field */}
      <div className="form-control">
        <label className="label">
          <span
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Please choose the correct date for accuracy."
            className="label-text text-primary font-semibold underline"
          >
            Date Lost/Found
          </span>
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
          value={userInfo.email}
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
          value={userInfo.name}
          className="input input-bordered placeholder-primary border-accent"
          readOnly
        />
      </div>

      {/* Add button */}
      <div className="form-control mt-6">
        <button className="btn btn-primary text-[#FFDEB6]">Add post</button>
      </div>
      <Tooltip id="my-tooltip" />
      <ToastContainer />
    </form>
  );
};

export default Addpost;
