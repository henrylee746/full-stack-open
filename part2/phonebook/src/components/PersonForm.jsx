import personService from "../../services/server.js";

const PersonForm = ({
  persons,
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  setPersons,
  setNewMessage,
  setError,
}) => {
  const handleNameChange = (e) => setNewName(e.target.value);
  const handleNumberChange = (e) => setNewNumber(e.target.value);

  const handleSubmit = async (e) => {
    if (newName === "" || newNumber === "") {
      alert("Please provide proper values");
      return;
    }
    e.preventDefault();
    let id = 0;
    const newPerson = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1),
    };
    const existingPersonArr = persons.filter(
      (person) => person.name == newPerson.name
    );
    if (existingPersonArr.length > 0) {
      id = existingPersonArr[0].id;
      if (
        window.confirm(
          `${newPerson.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update(id, newPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === returnedPerson.id ? returnedPerson : person
              )
            );
            setNewName("");
            setNewNumber("");
            setNewMessage(`Updated ${newPerson.name}'s phone number`);
          })
          .catch((error) => {
            console.log(error);
            setError(
              `Information of ${newPerson.name} has already been removed from the server`
            );
            setNewName("");
            setNewNumber("");
          });
      }
    } else {
      personService.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
      });
      setNewName("");
      setNewNumber("");
      setNewMessage(`Added ${newPerson.name}`);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <button type="submit">add</button>
    </form>
  );
};

export default PersonForm;
