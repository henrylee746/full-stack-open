import { createContext, useReducer } from "react";
import blogService from "../services/blogs";

const userReducer = (state, action) => {
  switch (action.type) {
    case "login":
      window.localStorage.setItem(
        "loggedNoteappUser",
        JSON.stringify(action.payload)
      );
      blogService.setToken(action.payload.token);
      return action.payload;
    case "logout":
      window.localStorage.removeItem("loggedNoteappUser");
      return null;
    default:
      return state;
  }
};

const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, null);

  return (
    <UserContext.Provider value={{ user, userDispatch }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
