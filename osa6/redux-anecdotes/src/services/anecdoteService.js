import axios from "axios";

let baseUrl = "http://localhost:3001/anecdotes";

const getAllAnecdotes = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createAnecdote = async (anecdote) => {
  const anecdoteObj = {
    content: anecdote,
    votes: 0,
  };
  const response = await axios.post(baseUrl, anecdoteObj);
  return response.data;
};

const updateAnecdote = async (anecdoteObj) => {
  const response = await axios.put(baseUrl + "/" + anecdoteObj.id, anecdoteObj);
  return response.data;
};

export default {
  getAllAnecdotes,
  createAnecdote,
  updateAnecdote,
};
