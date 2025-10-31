const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "VS code rest client is pretty handy tool",
    author: "henry lee",
    url: "url/api/blog",
    likes: 2,
  },
  {
    title: "Testing",
    author: "henry lee",
    url: "url/api/blog",
    likes: 2,
  },
];

const getAllBlogs = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  getAllBlogs,
};
