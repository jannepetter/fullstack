import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { setNotification } from "./notificationReducer";
import { getBlogUsers } from "./blogUserReducer";
const blogsAtStart = [];

const initialState = blogsAtStart;

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    _createBlog(state, action) {
      const content = action.payload;
      state.push(content);
    },
    _likeBlog(state, action) {
      const blog = action.payload;
      state = state.filter((a) => a.id !== blog.id);
      state.push(blog);
      state = state.sort((a, b) => b.likes - a.likes);
      return state;
    },
    _updateBlog(state, action) {
      const blog = action.payload;
      state = state.filter((a) => a.id !== blog.id);
      state.push(blog);
      return state;
    },
    _setBlogs(state, action) {
      state = action.payload;
      return state.sort((a, b) => b.likes - a.likes);
    },
    _deleteBlog(state, action) {
      const blog = action.payload;
      state = state.filter((a) => a.id !== blog.id);
      return state;
    },
    _clearBlogs(state, action) {
      state = [];
      return state;
    },
  },
});

export const {
  _createBlog,
  _likeBlog,
  _setBlogs,
  _deleteBlog,
  _clearBlogs,
  _updateBlog,
} = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(_setBlogs(blogs));
  };
};

export const createNewBlog = (data) => {
  return async (dispatch) => {
    const blog = await blogService.postBlog(data);
    dispatch(_createBlog(blog));
    dispatch(getBlogUsers());
    dispatch(
      setNotification(
        {
          msg: `a new blog ${data.title} by ${data.author}`,
          type: "success",
        },
        5
      )
    );
    return blog;
  };
};

export const likeBlog = (blogObj) => {
  return async (dispatch) => {
    const blog = await blogService.likeBlog(blogObj.id);
    dispatch(_likeBlog(blog));
  };
};

export const commentBlog = (comment, blogId) => {
  return async (dispatch) => {
    const blog = await blogService.commentBlog(comment, blogId);
    dispatch(_updateBlog(blog));
  };
};
export const deleteBlog = (blogObj) => {
  return async (dispatch) => {
    const response = await blogService.deleteBlog(blogObj.id);
    if (response === 204) {
      dispatch(_deleteBlog(blogObj));
      dispatch(getBlogUsers());

      dispatch(
        setNotification(
          {
            msg: `Removed blog ${blogObj.title} by ${blogObj.author}`,
            type: "success",
          },
          5
        )
      );
    }
  };
};
export default blogSlice.reducer;
