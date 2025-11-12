import loginService from "../services/login";
import { useContext, useRef } from "react";
import UserContext from "../contexts/UserContext";
import NotificationContext from "../contexts/NotificationContext";

const LoginForm = () => {
  const timeoutId = useRef(null);
  const { userDispatch } = useContext(UserContext);
  const { notificationDispatch } = useContext(NotificationContext);
  const handleLogin = async (event) => {
    event.preventDefault();
    const [username, password] = [
      event.target.username.value,
      event.target.password.value,
    ];
    try {
      const user = await loginService.login({ username, password });
      userDispatch({
        type: "login",
        payload: user,
      });
    } catch (e) {
      if (timeoutId.current) clearTimeout(timeoutId.current);
      notificationDispatch({
        type: "ERROR",
        payload: e.response?.data?.error,
      });
    }
    timeoutId.current = setTimeout(() => {
      notificationDispatch({
        type: "HIDE",
      });
    }, 3000);
  };

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            username
            <input type="text" name="username" />
          </label>
        </div>
        <div>
          <label>
            password
            <input type="password" name="password" />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
