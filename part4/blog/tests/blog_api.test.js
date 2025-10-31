const { test, after, it, beforeEach, describe } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const assert = require("node:assert");
const testHelper = require("./test_helper");
const Blog = require("../models/blog");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(testHelper.initialBlogs);
});

describe("blog GET tests", () => {
  it("blogs are returned as json", async () => {
    //it and test are essentially the same
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("unique id property is named 'id' ", async () => {
    const response = await api.get("/api/blogs");
    const blogs = response.body;
    blogs.forEach((blog) => {
      it(`blog "${blog.title}" has an id`, () => {
        assert.ok(blog.id);
      });
    });
  });
});

describe("blog POST tests", () => {
  test("blog is successfully created", async () => {
    const blog = {
      title: "New Blog through POST",
      author: "Henry",
      url: "/api/blogs",
      likes: 1,
    };

    await api
      .post("/api/blogs")
      .send(blog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogs = await testHelper.getAllBlogs();
    assert.strictEqual(blogs.length, testHelper.initialBlogs.length + 1);

    const createdBlog = blogs.find((b) => b.title === blog.title);
    assert.ok(createdBlog, "Created blog was not found in the database");

    assert.deepStrictEqual(
      {
        title: createdBlog.title,
        author: createdBlog.author,
        url: createdBlog.url,
        likes: createdBlog.likes,
      },
      blog
    );
  });

  test("likes value defaults to 0 if no value for it found", async () => {
    const blog = {
      title: "New Blog through POST w/o value",
      author: "Henry",
      url: "/api/blogs",
    };

    await api
      .post("/api/blogs")
      .send(blog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogs = await testHelper.getAllBlogs();

    const createdBlog = blogs.find((b) => b.title === blog.title);
    assert.ok(createdBlog, "Created blog was not found in the database");

    assert.strictEqual(createdBlog.likes, 0);
  });

  test("fails with 400 if title is missing", async () => {
    const blog = { author: "Henry", url: "example.com" };
    await api.post("/api/blogs").send(blog).expect(400);
    const blogs = await testHelper.getAllBlogs();
    assert.strictEqual(blogs.length, testHelper.initialBlogs.length);
  });

  test("fails with 400 if url is missing", async () => {
    const blog = { author: "Henry", title: "Test Blog" };
    await api.post("/api/blogs").send(blog).expect(400);
    const blogs = await testHelper.getAllBlogs();
    assert.strictEqual(blogs.length, testHelper.initialBlogs.length);
  });
});

after(async () => {
  await mongoose.connection.close();
});
