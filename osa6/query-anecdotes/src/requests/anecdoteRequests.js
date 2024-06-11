import axios from "axios";

const anecdoteUrl = "http://localhost:3001/anecdotes";

export const getAnecdotes = async () => {
  const response = await axios.get(anecdoteUrl);
  return response.data;
};

export const addAnecdote = async (content) => {
  const data = {
    content: content,
    votes: 0,
  };
  const response = await axios.post(anecdoteUrl, data);
  return response.data;
};

export const voteAnecdote = async (anecdote) => {
  const votedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
  const updateUrl = anecdoteUrl + "/" + votedAnecdote.id;
  const response = await axios.put(updateUrl, votedAnecdote);
  return response.data;
};
