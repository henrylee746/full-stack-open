const { test, after, it } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const assert = require("node:assert");
const testHelper = require("./test_helper")

const api = supertest(app);

describe("blog tests", () => {
  test("blogs are returned as json", async () => {
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

    test("blog is successfully created", async () => {
      const 
  });
});

after(async () => {
  await mongoose.connection.close();
});
