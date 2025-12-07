import { useState } from "react";
import Button from "@mui/material/Button";

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "block" };
  const showWhenVisible = { display: visible ? "flex" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button
          sx={{ my: 2, color: "white", display: "block" }}
          variant="contained"
          onClick={toggleVisibility}
        >
          {props.buttonLabel}
        </Button>
      </div>
      <div style={{ ...showWhenVisible, flexDirection: "column" }}>
        {props.children}
        <Button
          sx={{
            mb: 2,
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          variant="contained"
          onClick={toggleVisibility}
        >
          cancel
        </Button>
      </div>
    </div>
  );
};

export default Togglable;
