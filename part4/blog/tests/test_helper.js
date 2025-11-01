const Blog = require("../models/blog");
const User = require("../models/user");

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

const blogUsedToUpdate = {
  title: "Updated Blog",
  author: "asdjkasds",
  url: "/updated",
  likes: 10,
};

const getAllBlogs = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  initialBlogs,
  blogUsedToUpdate,
  getAllBlogs,
  usersInDb,
};
