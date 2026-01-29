import { useQuery } from "@apollo/client/react";
import { ALL_BOOKS } from "../../queries";

const Books = () => {
  const books = useQuery(ALL_BOOKS);

  if (books.loading) {
    return <div>loading...</div>;
  }

  console.log("books", books.data.allBooks);

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.data.allBooks.map((a, i) => (
            <tr key={`${a.title}${i}`}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
