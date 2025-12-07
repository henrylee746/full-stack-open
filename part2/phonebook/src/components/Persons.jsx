import Person from "./Person";

const Persons = ({ persons, filterName, setPersons }) => {
  return (
    <>
      {persons.map((person) =>
        person.name.includes(filterName) ? (
          <Person
            name={person.name}
            number={person.number}
            id={person.id}
            persons={persons}
            setPersons={setPersons}
            key={person.id}
          />
        ) : (
          ""
        )
      )}
    </>
  );
};

export default Persons;
