import { Link, useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { useContext } from "react";

const Header = () => {
  const navigate = useNavigate();
  const style = {
    display: "flex",
    gap: "4px",
  };
  const { user, userDispatch } = useContext(UserContext);

  const handleLogout = (event) => {
    event.preventDefault();
    userDispatch({
      type: "logout",
    });
    navigate("/");
  };

  return (
    <>
      <div style={style}>
        <Link to="/">blogs</Link>
        <Link to="/users">users</Link>
        <i>{user.username} logged in</i>
        <button onClick={handleLogout}>logout</button>
      </div>
    </>
  );
};

export default Header;
