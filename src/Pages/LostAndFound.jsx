import React, { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/UseAxiosSecure";
import { Link } from "react-router-dom";
import Loading from "../Components/Loading";

const LostAndFound = () => {
  const [posts, setPosts] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const axiosSecure = useAxiosSecure();

  // Fetch posts data when the component is mounted
  useEffect(() => {
    
    axiosSecure.get("/posts") 
      .then((res) => { setPosts(res.data); 
        setLoading(false); 
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setLoading(false); 
      });
  }, []);

  if (loading) {
    return <Loading/>; 
  }

  return (
    <div>
      <h2>All Lost and Found Items</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {posts.map((post) => (
          <div key={post._id} className="card bg-secondary/50 shadow-xl">
            <figure>
              <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
            </figure>
            <div className="card-body">
              <h3 className="card-title text-2xl font-bold font-lato">{post.title}</h3>
              <h3 className="card-title text-md font-bold font-lato">{post.postType}</h3>
              <p>{post.description}</p>              
              <p><span className="font-semibold">Category</span> {post.category}</p>              
              <p><span className="font-semibold">Date found/lost:</span> {post.date}</p>
              <p>Location: {post.location}</p>
              <Link to={`/items/${post._id}`} className="btn btn-primary">Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LostAndFound;