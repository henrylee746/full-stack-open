const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "VS code rest client is pretty handy tool",
    author: "henry lee",
    url: "url/api/blog",
    likes: 2,
    id: "690388c3b797890675903a44",
  },
  {
    title: "VS code rest client is pretty handy tool",
    author: "henry lee",
    url: "url/api/blog",
    likes: 2,
    id: "69038e91949dc3d48c2fa897",
  },
];

const createBlog = async () => {
  const blog = new Blog({
    title: "New Blog through POST",
    author: "Henry",
    url: "/api/blogs",
    likes: 1,
  });
  await blog.save();
};

module.exports = {
  createBlog,
};
