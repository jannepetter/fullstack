import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogUserSlice = createSlice({
  name: "bloguser",
  initialState: [],
  reducers: {
    setBlogUsers(state, action) {
      state = action.payload;
      return state;
    },
    clearBlogUsers(state, action) {
      state = [];
      return state;
    },
  },
});

export const { setBlogUsers } = blogUserSlice.actions;

export const getBlogUsers = () => {
  return async (dispatch) => {
    const response = await blogService.getUsers();
    dispatch(setBlogUsers(response));
  };
};

export default blogUserSlice.reducer;
