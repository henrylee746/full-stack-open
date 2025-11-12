import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    displayNotification(state, action) {
      return action.payload;
    },
    hideNotification(state, action) {
      return "";
    },
  },
});

const { displayNotification, hideNotification } = notificationSlice.actions;

let timeoutId;
export const setNotification = (content) => {
  return (dispatch) => {
    dispatch(displayNotification(content));
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      dispatch(hideNotification());
    }, 3500);
  };
};

export default notificationSlice.reducer;
