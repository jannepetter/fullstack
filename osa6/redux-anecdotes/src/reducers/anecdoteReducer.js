import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdoteService";

const anecdotesAtStart = [];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    _createAnecdote(state, action) {
      const content = action.payload;
      state.push(content);
    },
    _voteAnecdote(state, action) {
      const anecdote = action.payload;
      state = state.filter((a) => a.id !== anecdote.id);
      state.push(anecdote);
      return state.sort((a, b) => b.votes - a.votes);
    },
    _setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { _createAnecdote, _voteAnecdote, _setAnecdotes } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAllAnecdotes();
    dispatch(_setAnecdotes(anecdotes));
  };
};

export const createNewAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.createAnecdote(content);
    dispatch(_createAnecdote(anecdote));
  };
};

export const voteAnecdote = (anecdoteObj) => {
  return async (dispatch) => {
    const votedAnecdote = { ...anecdoteObj, votes: anecdoteObj.votes + 1 };
    const anecdote = await anecdoteService.updateAnecdote(votedAnecdote);
    dispatch(_voteAnecdote(anecdote));
  };
};
export default anecdoteSlice.reducer;
