import loginService from "../services/login";
import { useContext, useRef } from "react";
import UserContext from "../contexts/UserContext";
import NotificationContext from "../contexts/NotificationContext";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

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
    <div className="flex flex-col gap-4 p-2 justify-center items-center">
      <h2 className="font-bold">Log in to application</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-2">
        <TextField label="username" name="username" />
        <TextField label="password" type="password" name="password" />
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};

export default LoginForm;
