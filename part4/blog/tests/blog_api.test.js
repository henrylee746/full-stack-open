const { test, after, it, beforeEach, describe } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const assert = require("node:assert");
const testHelper = require("./test_helper");
const Blog = require("../models/blog");

const api = supertest(app);

describe("initially 2 blogs saved", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(testHelper.initialBlogs);
  });

  describe("blog GET tests", () => {
    test("blogs are returned as json", async () => {
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
    test("blog is not created w/o token", async () => {
      const blog = {
        title: "New Blog through POST",
        author: "Henry",
        url: "/api/blogs",
        likes: 1,
        //userId: "1231223123",
      };

      await api.post("/api/blogs").send(blog).expect(401);

      const blogs = await testHelper.getAllBlogs();
      assert.strictEqual(blogs.length, testHelper.initialBlogs.length);
    });
    test("blog is successfully created", async () => {
      const blog = {
        title: "New Blog through POST",
        author: "Henry",
        url: "/api/blogs",
        likes: 1,
        //userId: "1231223123",
      };

      await api
        .post("/api/blogs")
        .set(
          "Authorization",
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhlbnJ5bGVlIiwiaWQiOiI2OTA1ODI5M2E1NzY5NGMwZDg2ODI0MWYiLCJpYXQiOjE3NjE5NzgxNjl9.ndIx_p_cuFmMApFe6j-rxWx6YsH4javIYKdJQlkYS1Y"
        )
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
        .set(
          "Authorization",
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhlbnJ5bGVlIiwiaWQiOiI2OTA1ODI5M2E1NzY5NGMwZDg2ODI0MWYiLCJpYXQiOjE3NjE5NzgxNjl9.ndIx_p_cuFmMApFe6j-rxWx6YsH4javIYKdJQlkYS1Y"
        )
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
      await api
        .post("/api/blogs")
        .set(
          "Authorization",
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhlbnJ5bGVlIiwiaWQiOiI2OTA1ODI5M2E1NzY5NGMwZDg2ODI0MWYiLCJpYXQiOjE3NjE5NzgxNjl9.ndIx_p_cuFmMApFe6j-rxWx6YsH4javIYKdJQlkYS1Y"
        )
        .send(blog)
        .expect(400);
      const blogs = await testHelper.getAllBlogs();
      assert.strictEqual(blogs.length, testHelper.initialBlogs.length);
    });

    test("fails with 400 if url is missing", async () => {
      const blog = { author: "Henry", title: "Test Blog" };
      await api
        .post("/api/blogs")
        .set(
          "Authorization",
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhlbnJ5bGVlIiwiaWQiOiI2OTA1ODI5M2E1NzY5NGMwZDg2ODI0MWYiLCJpYXQiOjE3NjE5NzgxNjl9.ndIx_p_cuFmMApFe6j-rxWx6YsH4javIYKdJQlkYS1Y"
        )
        .send(blog)
        .expect(400);
      const blogs = await testHelper.getAllBlogs();
      assert.strictEqual(blogs.length, testHelper.initialBlogs.length);
    });
  });

  describe("updating a blog", () => {
    test("succeeds with status code 204 if id is valid", async () => {
      const blogs = await testHelper.getAllBlogs();
      const blogToUpdate = blogs[0];

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(testHelper.blogUsedToUpdate)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const blogsAfterUpdating = await testHelper.getAllBlogs();
      const contents = blogsAfterUpdating.map((blog) => blog.title);
      assert(!contents.includes(blogToUpdate.title));
      assert(contents.includes(testHelper.blogUsedToUpdate.title));
    });
  });
});

describe("deleting a blog", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const blogs = await testHelper.getAllBlogs();
    const blogToDelete = blogs[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAfterDeleting = await testHelper.getAllBlogs();
    const contents = blogsAfterDeleting.map((blog) => blog.title);
    assert(!contents.includes(blogToDelete.title));

    assert.strictEqual(blogsAfterDeleting.length, blogs.length - 1);
  });
});

after(async () => {
  await mongoose.connection.close();
});
