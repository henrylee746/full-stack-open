import personService from "../../services/server.js";

const Person = ({ name, number, id, persons, setPersons }) => {
  const handleClick = async (name, id) => {
    if (window.confirm(`Delete ${name}?`)) {
      const deletedPerson = await personService.remove(id);
      setPersons(persons.filter((person) => person.id !== deletedPerson.id));
    }
  };
  return (
    <div>
      <p>
        {name} {number}
      </p>
      <button onClick={() => handleClick(name, id)}>delete</button>
    </div>
  );
};

export default Person;
