import Blog from "./Blog";
import blogService from "../services/blogs";
import { useQuery } from "@tanstack/react-query";
import { Routes, Route, Link, useMatch } from "react-router-dom";

const Blogs = () => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
  });
  const blogs = data;

  const match = useMatch("/blogs/:id");
  const blog =
    match && blogs ? blogs.find((blog) => blog.id === match.params.id) : null;
  if (isLoading) return "loading";
  if (error) return "an err has occured";

  return (
    <>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <div style={blogStyle} key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title}
              {", " + blog.author}
            </Link>
          </div>
        ))}
      <Routes>
        <Route path="/blogs/:id" element={<Blog blog={blog} />} />
      </Routes>
    </>
  );
};

export default Blogs;
