import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch {
      setErrorMessage("wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedNoteappUser");
    setUsername("");
    setPassword("");
    setUser(null);
  };

  const handleBlogSubmit = async (blogData) => {
    const blog = await blogService.create(blogData);
    setBlogs(blogs.concat(blog));
    setNotification(`a new blog ${blog.title} by ${blog.author} added`);
    setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        {errorMessage ? errorMessage : ""}
        <form onSubmit={handleLogin}>
          <div>
            <label>
              username
              <input
                type="text"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              password
              <input
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </label>
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      <p>{user.username} logged in </p>
      <button onClick={handleLogout}>logout</button>
      <Togglable buttonLabel="create new blog">
        <BlogForm handleBlogSubmit={handleBlogSubmit} />
      </Togglable>
      {blogs
        .sort((a, b) => a.likes - b.likes)
        .map((blog) => (
          <Blog
            blogs={blogs}
            setBlogs={setBlogs}
            key={blog.id}
            blog={blog}
            setErrorMessage={setErrorMessage}
          />
        ))}
    </div>
  );
};

export default App;
