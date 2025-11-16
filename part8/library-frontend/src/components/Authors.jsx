import { useQuery, useMutation } from "@apollo/client/react";
import { useState } from "react";
import { ALL_AUTHORS, UPDATE_AUTHOR } from "../../queries";

const Authors = () => {
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

  const handleUpdate = (e) => {
    e.preventDefault();
    updateAuthor({
      variables: { name: e.target.selectedAuthor.value, born: Number(born) },
    });
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
          <label>name</label>
          <select name="selectedAuthor">
            {authors.data.allAuthors.map((a, i) => (
              <option key={`${a.name}${i}`} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
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
