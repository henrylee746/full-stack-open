import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { setNotification } from "./notificationReducer";

const blogListSlice = createSlice({
  //reducer
  name: "blogs",
  initialState: [],
  reducers: {
    //action handlers
    getAllBlogs(state, action) {
      return action.payload;
    },
    createNewBlog(state, action) {
      state.push(action.payload);
    },
    replaceBlog(state, action) {
      return state.map((blog) =>
        blog.id === action.payload.id ? action.payload : blog
      );
    },
    deleteBlog: (state, action) => {
      return state.filter((blog) => blog.id !== action.payload);
    },
  },
});

const { getAllBlogs, createNewBlog, replaceBlog, deleteBlog } =
  blogListSlice.actions;
export default blogListSlice.reducer;

export const initializeBlogs = () => {
  //redux thunks
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(getAllBlogs(blogs));
  };
};

export const makeBlog = (content) => {
  return async (dispatch) => {
    const blog = await blogService.create(content);
    dispatch(createNewBlog(blog));
    dispatch(setNotification(`a new blog ${blog.title} was created`));
  };
};

export const updateBlog = (id) => {
  return async (dispatch) => {
    const blog = await blogService.update(id);
    dispatch(replaceBlog(blog));
    dispatch(setNotification(`you liked ${blog.title}`));
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id);
    dispatch(deleteBlog(id));
  };
};
