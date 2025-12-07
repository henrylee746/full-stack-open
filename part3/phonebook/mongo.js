const mongoose = require("mongoose");
require("dotenv").config();

const url = `mongodb+srv://fullstack:${process.env.MONGO_PW}@phonebook.xeeet4d.mongodb.net/?appName=phonebook
`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length > 2) {
  const name = process.argv[2];
  const number = process.argv[3];
  const person = new Person({
    name: name,
    number: number,
  });
  person.save().then((result) => {
    console.log(`Added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  Person.find({}).then((persons) => {
    console.log("phonebook:");
    persons.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
}
