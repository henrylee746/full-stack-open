require("dotenv").config();

let PORT = process.env.PORT;
let MONGO_PW = process.env.MONGO_PW;

module.exports = { MONGO_PW, PORT };
