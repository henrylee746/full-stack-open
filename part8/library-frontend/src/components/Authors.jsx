import { useQuery } from "@apollo/client/react";
import { useState } from "react";
import { ALL_AUTHORS } from "../../queries";

const Authors = () => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const authors = useQuery(ALL_AUTHORS);

  if (authors.loading) {
    return <div>loading...</div>;
  }

  const handleUpdate = () => {};

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a, i) => (
            <tr key={`${a.name}${i}`}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={handleUpdate}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button>update</button>
      </form>
    </div>
  );
};

export default Authors;
