import { useSelector, useDispatch } from "react-redux";
import { hideNotification } from "../reducers/notificationReducer";

const Notification = () => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  };

  const dispatch = useDispatch();

  const message = useSelector((state) => state.notification);

  if (message)
    setTimeout(() => {
      dispatch(hideNotification(""));
    }, 5000);

  return <>{message ? <div style={style}>{message}</div> : message}</>;
};

export default Notification;
