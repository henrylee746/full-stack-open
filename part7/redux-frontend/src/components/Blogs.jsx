import { useEffect } from "react";
import Blog from "./Blog";
import { initializeBlogs } from "../reducers/blogReducer";
import { useSelector, useDispatch } from "react-redux";
import { updateBlog, removeBlog } from "../reducers/blogReducer";

const Blogs = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) =>
    state.blogs.toSorted((a, b) => b.likes - a.likes)
  );

  const user = useSelector((state) => state.user);

  const handleLikes = async (blog) => {
    dispatch(updateBlog(blog.id));
  };

  const handleRemove = async (blog) => {
    dispatch(removeBlog(blog.id));
  };

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  return (
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLikes={handleLikes}
          handleRemove={handleRemove}
          user={user}
        />
      ))}
    </div>
  );
};

export default Blogs;
