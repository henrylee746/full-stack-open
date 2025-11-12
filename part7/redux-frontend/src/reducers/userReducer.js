import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";

const userSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    handleLogin: (state, action) => {
      window.localStorage.setItem(
        "loggedNoteappUser",
        JSON.stringify(action.payload)
      );
      blogService.setToken(action.payload.token);
      return action.payload;
    },
    userLogout: (state, action) => {
      window.localStorage.removeItem("loggedNoteappUser");
      return null;
    },
    getUser: (state, action) => {
      const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON);
        blogService.setToken(user.token);
        return user;
      }
      return null;
    },
  },
});

const { handleLogin } = userSlice.actions;
export const { userLogout, getUser } = userSlice.actions;

export const login = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login({ username, password });
    dispatch(handleLogin(user));
  };
};

export default userSlice.reducer;
