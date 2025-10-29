const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors"); //don't need cors if front and backend are under same directory

app.use(express.static("dist"));
app.use(cors());

app.use(express.json());
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :body :date[iso]"
  )
);

morgan.token("body", (req) => {
  return req.method === "POST" ? JSON.stringify(req.body) : "";
});

let people = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/info", (request, response) => {
  response.send(`
        <p>Phonebook has info for ${people.length} people</p>
        <p> ${new Date()}</p>
  `);
});

app.get("/api/persons", (request, response) => {
  response.json(people);
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = people.find((person) => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  people = people.filter((person) => person.id !== req.params.id);
  res.status(204).end();
});

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "either name or number missing",
    });
  }

  if (people.find((person) => person.name === body.name)) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  const person = {
    name: body.name,
    numer: body.number,
    id: getRandomInt(10000),
  };

  people.push(person);

  response.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
