import axios from "axios";
import localstorage from "../utils/localstorage";

const baseUrl = "http://localhost:3003/api/";
const getHeaders = () => {
  const token = localstorage.readUser();
  let config = {};
  if (token) {
    config = {
      headers: { authorization: "Bearer " + token },
    };
  }
  return config;
};

const getAll = async () => {
  const response = await axios.get(baseUrl + "blogs", getHeaders());
  return response.data;
};

const postBlog = async (data) => {
  const response = await axios.post(baseUrl + "blogs", data, getHeaders());
  return response.data;
};

const updateBlog = async (data) => {
  const response = await axios.put(
    baseUrl + "blogs/" + data.id,
    data,
    getHeaders()
  );
  return response.data;
};

const deleteBlog = async (id) => {
  const response = await axios.delete(baseUrl + "blogs/" + id, getHeaders());
  return response.status;
};

const likeBlog = async (blogId) => {
  const response = await axios.put(
    baseUrl + "blogs/" + blogId + "/like",
    {},
    getHeaders()
  );
  return response.data;
};

const commentBlog = async (comment, blogId) => {
  const response = await axios.post(
    baseUrl + "blogs/" + blogId + "/comments",
    {
      text: comment,
    },
    getHeaders()
  );
  return response.data;
};

const login = async (data) => {
  const response = await axios.post(baseUrl + "login", data);
  return response.data;
};

const getUsers = async () => {
  const response = await axios.get(baseUrl + "users");
  return response.data;
};

export default {
  getAll,
  login,
  postBlog,
  updateBlog,
  likeBlog,
  deleteBlog,
  getUsers,
  commentBlog,
};
