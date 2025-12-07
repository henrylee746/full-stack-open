import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router";

const App = () => {
  const style = {
    display: "flex",
    gap: "4px",
  };
  return (
    <div>
      <div style={style}>
        <Link to="/">authors</Link>
        <Link to="/books">books</Link>
        <Link to="/add">add</Link>
      </div>

      <Routes>
        <Route path="/" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook />} />
      </Routes>
    </div>
  );
};

export default App;
