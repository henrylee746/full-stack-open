import { useEffect } from "react";
import Blogs from "./components/Blogs";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import { getUser, userLogout } from "./reducers/userReducer";
import { useSelector, useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(userLogout());
  };

  return (
    <>
      {!user ? (
        <>
          <Notification />
          <LoginForm />
        </>
      ) : (
        <div>
          <h2>blogs</h2>
          <Notification />
          <p>{user?.username} logged in </p>
          <button onClick={handleLogout}>logout</button>
          <Togglable buttonLabel="create new blog">
            <BlogForm />
          </Togglable>
          <Blogs />
        </div>
      )}
    </>
  );
};

export default App;
