import loginService from "../services/login";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";

const LoginForm = () => {
  const { userDispatch } = useContext(UserContext);
  const handleLogin = async (event) => {
    event.preventDefault();
    const [username, password] = [
      event.target.username.value,
      event.target.password.value,
    ];
    const user = await loginService.login({ username, password });
    userDispatch({
      type: "login",
      payload: user,
    });
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
