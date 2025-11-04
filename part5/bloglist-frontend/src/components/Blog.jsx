import { useEffect, useState } from "react";

const Blog = ({ blog, handleLikes, handleRemove, user }) => {
  const [details, setDetails] = useState(false);

  console.log(blog);
  console.log(user);

  const handleToggle = () => {
    setDetails(!details);
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
        <div style={blogStyle} className="blog">
          <span className="info">
            title: {blog.title} url: {blog.url} likes {blog.likes}
          </span>
          <button onClick={() => handleLikes(blog)}>like</button> author:{" "}
          {blog.author}
          <button onClick={handleToggle}>collapse</button>
          Username: {blog?.user?.username || "username"}
          {blog.user.username === user.username ? (
            <button onClick={() => handleRemove(blog)}>remove</button>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div style={blogStyle} className="blog">
          <div>
            {blog.title} {blog.author}
          </div>
          <button onClick={handleToggle}>expand</button>
        </div>
      )}
    </>
  );
};

export default Blog;
