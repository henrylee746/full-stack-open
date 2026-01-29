import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router";
import LoginForm from "./components/LoginForm";
import { useState } from "react";

const App = () => {
  const [token, setToken] = useState(null);

  const style = {
    display: "flex",
    gap: "4px",
  };

  if (!token) {
    return (
      <div>
        <div style={style}>
          <Link to="/">authors</Link>
          <Link to="/books">books</Link>
          <Link to="/login">login</Link>
        </div>
        <Routes>
          <Route path="/" element={<Authors />} />
          <Route path="/books" element={<Books />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </div>
    );
  }

  return (
    <div>
      <div style={style}>
        <Link to="/">authors</Link>
        <Link to="/books">books</Link>
        <Link to="/add">add</Link>
        <Link to="/login">login</Link>
      </div>
      <Routes>
        <Route path="/" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </div>
  );
};

export default App;
