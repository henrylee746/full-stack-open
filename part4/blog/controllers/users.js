const bcrypt = require("bcryptjs");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (password.length < 3) {
    return response
      .status(400)
      .json({ error: "Password Length must be at least 3 chars long" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs");
  /*We would like our API to work in such a way, 
  that when an HTTP GET request is made to the /api/users route, 
  the user objects would also contain the contents of the user's notes
and not just their id. In a relational database, 
this functionality would be implemented with a join query.*/
  response.json(users);
});

module.exports = usersRouter;
