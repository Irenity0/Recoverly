import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import useAxiosSecure from "../hooks/UseAxiosSecure";

const UserPostsTable = () => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isTableLayout, setIsTableLayout] = useState(true); // State for layout toggle
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get("/recoveries")
        .then((res) => {
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
      <h2 className="text-2xl font-extrabold my-4">Your Recovered Items</h2>
      <button
        onClick={() => setIsTableLayout(!isTableLayout)}
        className="btn btn-secondary mb-4"
      >
        Change Layout
      </button>

      {posts.length > 0 ? (
        <div className="overflow-x-auto">
          {isTableLayout ? (
            // Table Layout
            <table className="table w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Details</th>
                </tr>
              </thead>
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
          ) : (
            // Card Layout
            <div className="grid grid-cols-3 gap-4">
              {posts.map((post) => (
                <div
                  key={post._id}
                  className="card bg-white/40 shadow-lg p-4 border rounded"
                >
                  <h3 className="text-xl font-bold">{post.post.title}</h3>
                  <p className="text-gray-700">Category: {post.post.category}</p>
                  <p className="text-gray-500">Date: {post.post.date}</p>
                  <Link
                    to={`/items/${post._id}`}
                    className="btn btn-primary btn-sm mt-2"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          )}
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
