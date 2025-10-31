require("dotenv").config();

const PORT = process.env.PORT;
const MONGO_PW =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGO_PW
    : process.env.MONGO_PW;

/*example: using separate test db when running tests

could create a separate test db in mongoAtlas, but runs into 
risks when many people are developing and testing the same thing 
(tests running concurrently)

better to use a db that is installed and 
running on the developer's local machine (
    every test execution uses a separate db instance
)

can be done using Mongo in-memory or Docker
*/

module.exports = { MONGO_PW, PORT };
