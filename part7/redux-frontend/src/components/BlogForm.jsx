import { useState } from "react";
import { makeBlog } from "../reducers/blogReducer";
import { useDispatch } from "react-redux";

const BlogForm = () => {
  const dispatch = useDispatch();
  const [blogData, setBlogData] = useState({
    title: "",
    author: "",
    url: "",
  });

  const addBlog = (event) => {
    event.preventDefault();
    dispatch(makeBlog(blogData));
    setBlogData({
      title: "",
      author: "",
      url: "",
    });
  };

  const Input = ({ label }) => {
    return (
      <div>
        <label>
          {label}
          <input
            type="text"
            value={blogData[label]}
            placeholder={label}
            onChange={({ target }) =>
              setBlogData({ ...blogData, [label]: target.value })
            }
          />
        </label>
      </div>
    );
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <Input label="title" />
        <Input label="author" />
        <Input label="url" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
