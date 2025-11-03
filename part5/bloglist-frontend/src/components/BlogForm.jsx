import { useState } from "react";

const BlogForm = ({ handleBlogSubmit }) => {
  const [blogData, setBlogData] = useState({
    title: "",
    author: "",
    url: "",
  });

  const addBlog = (event) => {
    event.preventDefault();
    handleBlogSubmit(blogData);
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
        <div>
          <label>
            title:
            <input
              type="text"
              value={blogData.title}
              onChange={({ target }) =>
                setBlogData({ ...blogData, title: target.value })
              }
            />
          </label>
        </div>
        <div>
          <label>
            author:
            <input
              type="text"
              value={blogData.author}
              onChange={({ target }) =>
                setBlogData({ ...blogData, author: target.value })
              }
            />
          </label>
        </div>
        <div>
          <label>
            url:
            <input
              type="text"
              value={blogData.url}
              onChange={({ target }) =>
                setBlogData({ ...blogData, url: target.value })
              }
            />
          </label>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
