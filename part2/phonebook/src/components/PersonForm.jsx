const PersonForm = ({
  persons,
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  setPersons,
}) => {
  const handleNameChange = (e) => setNewName(e.target.value);
  const handleNumberChange = (e) => setNewNumber(e.target.value);

  const handleSubmit = (e) => {
    let counter = 0;
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    persons.forEach((person) => {
      if (person.name == newPerson.name) {
        counter++;
      }
    });
    if (counter !== 0) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    e.preventDefault();
    setPersons(persons.concat(newPerson));
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
