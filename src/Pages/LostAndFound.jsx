import React, { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/UseAxiosSecure";
import { Link } from "react-router-dom";
import Loading from "../Components/Loading";

const LostAndFound = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTitle, setSearchTitle] = useState(""); // State for title filter
  const [searchLocation, setSearchLocation] = useState(""); // State for location filter
  const axiosSecure = useAxiosSecure();

  // Fetch posts data when the component is mounted
  useEffect(() => {
    axiosSecure
      .get("/posts/public")
      .then((res) => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  // Filter posts based on search inputs
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTitle.toLowerCase()) &&
    post.location.toLowerCase().includes(searchLocation.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-2xl text-center font-extrabold my-4">All Lost and Found Items</h2>

      {/* Search Inputs */}
      <div className="search-bar mb-6">
        <input
          type="text"
          placeholder="Search by Title"
          className="input input-bordered w-full mb-2"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by Location"
          className="input input-bordered w-full"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div key={post._id} className="card bg-secondary/50 shadow-xl">
              <figure>
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title text-2xl font-bold font-lato">
                  {post.title}
                </h3>
                <h3 className="card-title text-md font-bold font-lato">
                  {post.postType}
                </h3>
                <p>{post.description}</p>
                <p>
                  <span className="font-semibold">Category</span> {post.category}
                </p>
                <p>
                  <span className="font-semibold">Date found/lost:</span>{" "}
                  {post.date}
                </p>
                <p>Location: {post.location}</p>
                <Link to={`/items/${post._id}`} className="btn btn-primary">
                  Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No posts found matching your search.</p>
        )}
      </div>
    </div>
  );
};

export default LostAndFound;
