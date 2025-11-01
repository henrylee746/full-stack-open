const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const middleware = require("../utils/middleware");
require("dotenv").config();

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user");
  response.json(blogs);
});

blogsRouter.post("/", middleware.getUserFrom, async (request, response) => {
  const body = request.body;
  const { title, author, url, likes, userId } = body;

  const user = request.user;

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user._id, //_id is an ObjectId
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete(
  "/:id",
  middleware.getUserFrom,
  async (request, response) => {
    const blog = await Blog.findById(request.params.id);

    const user = request.user;

    if (blog.user.toString() === user._id.toString()) {
      await Blog.findOneAndDelete(blog);
      response.status(204).end();
    } else {
      return response
        .status(401)
        .json({ error: "not the user who made this blog" });
    }
  }
);

blogsRouter.put("/:id", async (request, response) => {
  const { title, author, url, likes } = request.body;
  const blog = await Blog.findById(request.params.id);
  if (!blog) {
    return response.status(404).end();
  }

  Object.assign(blog, { title, author, url, likes });
  //shorthand object syntax, really means:
  // {title: title, ... etc}

  const updatedBlog = await blog.save();
  response.status(201).json(updatedBlog);
});

module.exports = blogsRouter;
