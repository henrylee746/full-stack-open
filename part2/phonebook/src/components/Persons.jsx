import Person from "./Person";

const Persons = ({ persons, filterName }) => {
  return (
    <>
      {persons.map((person) =>
        person.name.includes(filterName) ? (
          <Person name={person.name} number={person.number} key={person.name} />
        ) : (
          ""
        )
      )}
    </>
  );
};

export default Persons;
