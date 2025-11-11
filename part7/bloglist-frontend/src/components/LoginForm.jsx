import { useDispatch } from "react-redux";
import { login } from "../reducers/userReducer";

const LoginForm = () => {
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    const [username, password] = [
      event.target.username.value,
      event.target.password.value,
    ];
    event.preventDefault();
    dispatch(login(username, password));
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
