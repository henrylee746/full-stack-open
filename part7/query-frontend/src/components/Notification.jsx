import NotificationContext from "../contexts/NotificationContext";
import { useContext } from "react";

const Notification = () => {
  const { notification } = useContext(NotificationContext);
  return <h3>{notification}</h3>;
};

export default Notification;
