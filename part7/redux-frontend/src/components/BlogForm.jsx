import { useState } from "react";
import { makeBlog } from "../reducers/blogReducer";
import { useDispatch } from "react-redux";
import Input from "./Input";

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

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <Input label="title" blogData={blogData} setBlogData={setBlogData} />
        <Input label="author" blogData={blogData} setBlogData={setBlogData} />
        <Input label="url" blogData={blogData} setBlogData={setBlogData} />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
