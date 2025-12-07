import { useEffect, useContext } from "react";
import UserContext from "./contexts/UserContext";
import Blogs from "./components/Blogs";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Users from "./components/Users";
import { Routes, Route, Link, useMatch } from "react-router-dom";
import Header from "./components/Header";

const App = () => {
  const { user, userDispatch } = useContext(UserContext);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      userDispatch({
        type: "login",
        payload: user,
      });
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogout = (event) => {
    event.preventDefault();
    userDispatch({
      type: "logout",
    });
  };

  if (user === null) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <Notification />
        <LoginForm />
      </div>
    );
  }
  return (
    <div>
      <Header />
      <div className="flex flex-col h-screen justify-center items-center">
        <h1 className="italic font-bold">Blog App</h1>
        <Notification />
        <Routes>
          <Route path="/*" element={<Blogs />}></Route>
          <Route path="/users/*" element={<Users />}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
