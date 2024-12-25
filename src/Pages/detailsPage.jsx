import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import useAxiosSecure from "../hooks/UseAxiosSecure";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DetailsPage = () => {
  const { id } = useParams(); // Get the route parameter
  const { user } = useContext(AuthContext);
  const [mongoUser, setMongoUser] = useState(null);
  const [post, setPost] = useState(null); // Initialize as null until data is fetched
  const [loading, setLoading] = useState(true); // Add a loading state
  const [error, setError] = useState(null); // Add an error state
  const [showModal, setShowModal] = useState(false);
  const [recoveredLocation, setRecoveredLocation] = useState("");
  const [recoveredDate, setRecoveredDate] = useState(new Date());
  const avatarURL = user?.photoURL || mongoUser?.photo || "https://via.placeholder.com/150";
  const axiosSecure = useAxiosSecure();

  // Fetch the post details based on the `id` parameter
  useEffect(() => {
    axiosSecure
      .get(`/posts/${id}`, { withCredentials: true })
      .then((res) => {
        setPost(res.data); // Set the post data
        setLoading(false);
      })
      .catch((err) => {
        setError("Error loading post details.");
        setLoading(false);
      });
  }, [id, axiosSecure]);

  // Fetch user details from MongoDB
  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users/${user.email}`, { withCredentials: true })
        .then((res) => setMongoUser(res.data))
        .catch((error) => console.error("Error fetching MongoDB user:", error));
    }
  }, [user, axiosSecure]);

  // Handle form submission
  const handleSubmit = () => {
    if (!post) return;

    const formattedDate = recoveredDate.toISOString().split("T")[0];
    const recoveryDetails = {
      recoveredLocation,
      recoveredDate: formattedDate,
      recoveredBy: {
        name: user?.displayName || mongoUser?.name,
        email: user?.email || mongoUser?.email,
        image: avatarURL,
      },
      post: {
        ...post,
        status: "recovered",
      },
    };

    axiosSecure
      .post("/recoveries", recoveryDetails)
      .then((res) => {
        console.log("Recovery details submitted successfully:", res.data);
        setShowModal(false);

        // Update the post status locally
        setPost((prevPost) => ({
          ...prevPost,
          status: "recovered",
        }));
      })
      .catch((error) => console.error("Error submitting recovery details:", error));

    axiosSecure
      .patch(`/posts/${post._id}`, { status: "recovered" })
      .then((res) => {
        console.log("Post status updated to 'recovered' successfully:", res.data);

        setPost((prevPost) => ({
          ...prevPost,
          status: "recovered",
        }));
      })
      .catch((error) => {
        console.error("Error updating post status:", error);
      });
  };

  if (loading) return <p>Loading...</p>; // Show loading spinner or text
  if (error) return <p>{error}</p>; // Show error message

  return (
    <>
      <div className="post-details space-y-3">
        <h1 className="text-4xl font-bold text-primary">{post.title}</h1>
        <img
          src={post.image}
          alt={post.title}
          className="post-image w-full max-h-[400px] object-cover my-4 rounded-lg"
        />
        <p>
          <strong>Type:</strong> {post.postType}
        </p>
        <p className="text-lg">
          <strong>Description: </strong>
          {post.description}
        </p>
        <p className="text-lg">
          <strong>By:</strong> {post.name}
        </p>
        <p>
          <strong>Contact: </strong>
          {post.email}
        </p>
        {post.postType === "lost" ? (
          <button className="btn btn-primary" disabled={post.status === "recovered"} onClick={() => setShowModal(true)}>Found This!</button>
        ) : post.postType === "found" ? (
          <button className="btn btn-secondary" disabled={post.status === "recovered"} onClick={() => setShowModal(true)}>This is Mine!</button>
        ) : null}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center" onClick={() => setShowModal(false)}>
          <div className="bg-black/80 p-6 rounded-md w-[400px] relative" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4">Recovery Details</h2>
            <div className="mb-3">
              <label className="block font-medium mb-1">Recovered Location:</label>
              <input
                type="text"
                value={recoveredLocation}
                onChange={(e) => setRecoveredLocation(e.target.value)}
                className="w-full border rounded px-3 py-2"
                placeholder="Enter location"
              />
            </div>
            <div className="mb-3">
              <label className="block font-medium mb-1">Date:</label>
              <DatePicker
                selected={recoveredDate}
                onChange={(date) => setRecoveredDate(date)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div className="mb-3">
              <label className="block font-medium mb-1">Recovered By:</label>
              <div className="flex items-center gap-3">
                <img src={avatarURL} alt="User" className="w-10 h-10 rounded-full" />
                <div>
                  <p>{user?.displayName || mongoUser?.name}</p>
                  <p className="text-sm">{user?.email || mongoUser?.email}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailsPage;
