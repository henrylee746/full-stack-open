import { useSelector } from "react-redux";

//needed if we want to truly reset the timer every time a vote
//or new anecdote is created while an existing timer is running

const Notification = () => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  };
  const message = useSelector((state) => state.notification);

  return <>{message ? <div style={style}>{message}</div> : message}</>;
};

export default Notification;
