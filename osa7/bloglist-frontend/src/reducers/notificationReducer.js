import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    newNotification(state, action) {
      const newMsg = action.payload;
      return newMsg;
    },
  },
});

export const { newNotification } = notificationSlice.actions;

export const setNotification = (notification, timeoutInSeconds) => {
  return async (dispatch) => {
    dispatch(newNotification(notification));
    setTimeout(() => {
      dispatch(newNotification(null));
    }, timeoutInSeconds * 1000);
  };
};

export default notificationSlice.reducer;
