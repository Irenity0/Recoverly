import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import useAxiosSecure from "../hooks/UseAxiosSecure";

const UserPostsTable = () => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user?.email) {
      // Fetch posts from the server
      axiosSecure
        .get("/recoveries")
        .then((res) => {
          // Filter posts added by the logged-in user
          const userPosts = res.data.filter(
            (post) => post.recoveredBy?.email === user.email
          );
          setPosts(userPosts);
        })
        .catch((error) => console.error("Error fetching posts:", error))
        .finally(() => setLoading(false));
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
    <h2 className="text-2xl font-bold my-4">Your Recovered Items</h2>
    {posts.length > 0 ? (
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* Table Head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Category</th>
              <th>Date</th>
              <th>Details</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {posts.map((post, index) => (
              <tr key={post._id}>
                <th>{index + 1}</th>
                <td>{post.post.title}</td>
                <td>{post.post.category}</td>
                <td>{post.post.date}</td>
                <td>
                  <Link
                    to={`/items/${post._id}`}
                    className="btn btn-primary btn-sm"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <div className="text-center text-7xl font-extrabold text-primary">
        No recovered items found. Start contributing by adding new posts!
      </div>
    )}
  </div>
  );
};

export default UserPostsTable;
