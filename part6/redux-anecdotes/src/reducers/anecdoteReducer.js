import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";
import { setNotification } from "./notificationReducer";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      //type anecdotes/createAnecdote
      state.push(action.payload);
      //don't need to return bc state is being mutated
    },
    incrementVote(state, action) {
      const id = action.payload.id;
      return state.map((anecdote) =>
        anecdote.id === id ? action.payload : anecdote
      );
      //returning because state is being replaced w new arr
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

const { createAnecdote, setAnecdotes, incrementVote } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const makeAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.createNew(content);
    dispatch(createAnecdote(anecdote));
    dispatch(setNotification(`You created ${content}`, 5));
  };
};

export const updateVote = (id, votes) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.changeVote(id, votes);
    dispatch(incrementVote(updatedAnecdote));
    dispatch(setNotification(`You voted ${updatedAnecdote.content}`, 5));
  };
};

export default anecdoteSlice.reducer;
