import { useEffect, useContext } from "react";
import UserContext from "./contexts/UserContext";
import Blogs from "./components/Blogs";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Users from "./components/Users";

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
      <>
        <Notification />
        <LoginForm />
      </>
    );
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>{user.username} logged in </p>
      <button onClick={handleLogout}>logout</button>
      <Togglable buttonLabel="create new blog">
        <BlogForm />
      </Togglable>
      <Blogs />
      <Users />
    </div>
  );
};

export default App;
