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

  const handleLikes = async (blog) => {
    try {
      const updatedBlog = await blogService.update(blog.id, blog);
      const index = blogs.indexOf(
        blogs.find((blog) => blog.id == updatedBlog.id)
      );
      blogs[index] = updatedBlog;
      setBlogs([...blogs]);
    } catch (e) {
      console.error(e.response?.data?.error || e.message);
      setErrorMessage(e.response?.data?.error || e.message);
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  const handleRemove = async (blog) => {
    try {
      const id = blog.id;
      await blogService.remove(blog.id);
      const updatedBlogs = blogs.filter((blog) => blog.id !== id);
      setBlogs([...updatedBlogs]);
    } catch (e) {
      console.error(e.response?.data?.error || e.message);
      setErrorMessage(e.response?.data?.error || e.message);
      setTimeout(() => setErrorMessage(""), 3000);
    }
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
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLikes={handleLikes}
            handleRemove={handleRemove}
            user={user}
          />
        ))}
    </div>
  );
};

export default App;
