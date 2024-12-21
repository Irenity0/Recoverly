import React, { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/UseAxiosSecure";

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
    return <p>Loading posts...</p>; 
  }

  return (
    <div>
      <h2>All Lost and Found Items</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {posts.map((post) => (
          <div key={post.id} className="card bg-secondary/50 shadow-xl">
            <figure>
              <img src={post.thumbnail} alt={post.title} className="w-full h-48 object-cover" />
            </figure>
            <div className="card-body">
              <h3 className="card-title text-primary font-bold font-lato">{post.title}</h3>
              <p>{post.description}</p>              
                <p className="">{post.date_lost_found}</p>
                <p className="">Location: {post.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LostAndFound;
