const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // this ensures the uniqueness of username
  },
  name: String,
  passwordHash: String,
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Note", //references the name of the model being referenced
    },
  ],
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash;
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
