import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    handleChange(state, action) {
      return action.payload;
    },
  },
});

export const { handleChange } = filterSlice.actions;
export default filterSlice.reducer;
