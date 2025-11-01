const bcrypt = require("bcryptjs");
const User = require("../models/user");
const mongoose = require("mongoose");
const helper = require("./test_helper");
const app = require("../app");
const assert = require("node:assert");
const { test, after, it, beforeEach, describe } = require("node:test");
const supertest = require("supertest");

const api = supertest(app);

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert(result.body.error.includes("expected `username` to be unique"));

    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });

  test("creation fails with invalid user", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      //missing name
      name: "Superuser",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert(result.body.error.includes("ValidationError"));

    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });

  test("If password is too short", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "pw too short",
      name: "Superuser",
      password: "sa",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert(
      result.body.error.includes(
        "Password Length must be at least 3 chars long"
      )
    );

    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "henrylee",
      name: "Henry Lee",
      password: "password",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    assert(usernames.includes(newUser.username));
  });
});

after(async () => {
  await mongoose.connection.close();
});
