import NotificationContext from "../contexts/NotificationContext";
import { useContext } from "react";
import Alert from "@mui/material/Alert";

const Notification = () => {
  const { notification } = useContext(NotificationContext);
  return (
    <>{notification ? <Alert severity="error">{notification}</Alert> : ""}</>
  );
};

export default Notification;
