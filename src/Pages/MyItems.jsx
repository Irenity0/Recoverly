import { useContext, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/UseAxiosSecure";
import AuthContext from "../context/AuthContext";

const MyPosts = () => {
  const { user } = useContext(AuthContext);
  const posts = useLoaderData();
  const [loadedPosts, setLoadedPosts] = useState(posts);
  const axiosSecure = useAxiosSecure();

  console.log(posts);

  // Filter posts based on the logged-in user's email
  const userPosts = loadedPosts.filter((post) => post.email === user?.email);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosSecure.delete(`/posts/${id}`);
          if (response.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Your post has been deleted.", "success");
            const remaining = loadedPosts.filter((post) => post._id !== id);
            setLoadedPosts(remaining);
          } else {
            Swal.fire("Error", "Failed to delete the post.", "error");
          }
        } catch (error) {
          Swal.fire("Error", "Something went wrong. Please try again later.", "error");
        }
      }
    });
  };

  return (
    <>
      <h1 className="text-5xl font-extrabold text-center text-primary">My Posts</h1>
      <br />
      <div className="overflow-x-auto">
        <table className="table">
          {/* Table Head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Category</th>
              <th>Date</th>
              <th>Email</th>
              <th>Author</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {userPosts.map((post, index) => (
              <tr key={post._id}>
                <td>{index + 1}</td>
                <td className="underline font-bold">
                  <Link to={`/posts/${post._id}`}>{post.title}</Link>
                </td>
                <td>{post.category}</td>
                <td>{post.date}</td>
                <td>{post.email}</td>
                <td>{post.author}</td>
                <td>
                  <button className="btn text-blue-500 rounded-xl">
                    <Link to={`/updatepost/${post._id}`}>Update</Link>
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="btn text-red-500 rounded-xl"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MyPosts;
