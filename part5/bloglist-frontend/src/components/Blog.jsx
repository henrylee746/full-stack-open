import { useEffect, useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blogs, setBlogs, blog, setErrorMessage }) => {
  const [details, setDetails] = useState(false);

  const handleToggle = () => {
    setDetails(!details);
  };

  const handleLikes = async () => {
    try {
      const updatedBlog = await blogService.update(blog.id, blog);
      const index = blogs.indexOf(
        blogs.find((blog) => blog.id == updatedBlog.id)
      );
      blogs[index] = updatedBlog;
      setBlogs([...blogs]);
    } catch (e) {
      console.error(e.response?.data?.error || e.message);
      setErrorMessage(e.response?.data?.error || e.message);
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  const handleRemove = async () => {
    try {
      const id = blog.id;
      await blogService.remove(blog.id);
      const updatedBlogs = blogs.filter((blog) => blog.id !== id);
      setBlogs([...updatedBlogs]);
    } catch (e) {
      console.error(e.response?.data?.error || e.message);
      setErrorMessage(e.response?.data?.error || e.message);
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <>
      {details ? (
        <div style={blogStyle}>
          title: {blog.title} url: {blog.url} likes {blog.likes}
          <button onClick={handleLikes}>like</button> author: {blog.author}
          <button onClick={handleToggle}>collapse</button>
          Username: {blog.user.username}
          <button onClick={handleRemove}>remove</button>
        </div>
      ) : (
        <div style={blogStyle}>
          <div>
            {blog.title} {blog.author}
            <button onClick={handleToggle}>expand</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Blog;
