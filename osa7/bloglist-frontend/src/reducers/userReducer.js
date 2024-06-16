import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { setNotification } from "./notificationReducer";
import localstorage from "../utils/localstorage";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    newUser(state, action) {
      const newUser = action.payload;
      return newUser;
    },
    clearUser(state, action) {
      state = null;
      return state;
    },
    readUser(state, action) {
      const user = localstorage.readForRedux();
      state = user;
      return state;
    },
  },
});

export const { newUser, clearUser, readUser } = userSlice.actions;

export const userLogin = (data) => {
  return async (dispatch) => {
    try {
      const response = await blogService.login(data);
      dispatch(newUser(response));
      localstorage.saveUser(response.token, response.user, response.id);
    } catch (error) {
      dispatch(
        setNotification(
          {
            msg: `wrong username or password`,
            type: "error",
          },
          5
        )
      );
    }
  };
};

export default userSlice.reducer;
