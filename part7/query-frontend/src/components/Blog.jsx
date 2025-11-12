import { useState } from "react";
import blogService from "../services/blogs";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

const Blog = ({ blog, user }) => {
  const queryClient = useQueryClient();

  const [details, setDetails] = useState(false);

  const handleToggle = () => {
    setDetails(!details);
  };

  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

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
          <button onClick={() => updateBlogMutation.mutate(blog.id, blog)}>
            like
          </button>{" "}
          author: {blog.author}
          <button onClick={handleToggle}>collapse</button>
          Username: {blog?.user?.username || "username"}
          {blog.user.username === user.username ? (
            <button onClick={() => deleteBlogMutation.mutate(blog.id)}>
              remove
            </button>
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
