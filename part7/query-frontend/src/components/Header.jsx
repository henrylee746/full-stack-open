import { Link, useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";

const Header = () => {
  const navigate = useNavigate();
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
      <div>
        <AppBar position="static">
          <Toolbar>
            <Button
              sx={{ my: 2, mx: 1, color: "black", display: "block" }}
              component={Link}
              to="/blogs"
              color="inherit"
              variant="contained"
            >
              Blogs
            </Button>
            <Button
              sx={{ my: 2, mx: 1, color: "black", display: "block" }}
              component={Link}
              to="/users"
              color="inherit"
              variant="contained"
            >
              Users
            </Button>
            <Button
              sx={{ my: 2, mx: 1, color: "black", display: "block" }}
              onClick={handleLogout}
              color="inherit"
              variant="contained"
            >
              Logout
            </Button>
            <i>{user.username} logged in</i>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
};

export default Header;
