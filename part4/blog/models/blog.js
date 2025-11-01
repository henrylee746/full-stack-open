const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: String,
  url: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

/*It's important to understand that the database
 does not know that the ids stored in the user field of the notes 
 collection reference documents in the user collection.

The functionality of the populate method of Mongoose is 
based on the fact that we have defined "types" to the 
references in the Mongoose schema with the ref option:*/

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Blog", blogSchema);
