const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { v1: uuid } = require("uuid");
const { GraphQLError } = require("graphql");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const Author = require("./models/author");
const Book = require("./models/book");
const user = require("../models/user");

require("dotenv").config();

const MONGODB_PW = process.env.MONGODB_PW;
const MONGODB_URI = `mongodb+srv://fullstack:${MONGODB_PW}@phonebook.xeeet4d.mongodb.net/?appName=phonebook`;

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
];

/*
  you can remove the placeholder query once your first one has been implemented 
*/

const typeDefs = `

  type Author{
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type Book{
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
        title: String!
        author: String!
        published: Int!
        genres: [String!]!
    ): Book
    editAuthor(
        name: String!, born: Int!
    ): Author
  }

`;

const resolvers = {
  Query: {
    bookCount: () => Book.countDocuments(),
    authorCount: () => Author.countDocuments(),
    allBooks: (root, args) => {
      if (!args.author && !args.genre) {
        return Book.find({});
      } else if (args.author && args.genre) {
        return Book.find({ author: args.author, genres: args.genre });
      }
      return !args.genre
        ? Book.find({ author: args.author })
        : Book.find({ genres: args.genre });
    },
    allAuthors: () => {
      return Author.find({});
    },
  },
  Mutation: {
    //start here
    addBook: async (root, args) => {
      if (!Author.find({ name: args.name })) {
        const author = new Author({
          title: args.name,
          bookCount: 1,
        });
        try {
          await author.save();
        } catch (e) {
          throw new GraphQLError("Saving author failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args,
              error,
            },
          });
        }
      }
      const book = new Book({ ...args });
      try {
        await book.save();
      } catch (e) {
        throw new GraphQLError("Saving book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }
    },
    editAuthor: (root, args) => {
      const author = authors.find((author) => author.name === args.name);
      if (!author) return null;
      const newAuthor = { ...author, born: args.born };

      authors = authors.map((author) =>
        author.name === args.name ? newAuthor : author
      );
      return newAuthor;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
