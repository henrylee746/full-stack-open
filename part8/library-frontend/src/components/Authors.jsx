import { useQuery, useMutation } from "@apollo/client/react";
import { useState } from "react";
import { ALL_AUTHORS, UPDATE_AUTHOR } from "../../queries";

const Authors = () => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");
  const [error, setError] = useState("");

  const authors = useQuery(ALL_AUTHORS);
  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      setTimeout(() => {
        setError(error.message);
      });
      setError(null);
    },
  });

  console.log(authors.data);

  const handleUpdate = (e) => {
    e.preventDefault();
    updateAuthor({ variables: { name, born: Number(born) } });
    setName("");
    setBorn("");
  };

  if (authors.loading) {
    return <div>loading...</div>;
  }

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
      {error ? error : ""}
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
        <button type="submit">update</button>
      </form>
    </div>
  );
};

export default Authors;
