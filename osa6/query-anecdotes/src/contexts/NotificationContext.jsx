import { createContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    default:
      state = action.payload;
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ""
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;

export const setNotification = (message, dispatch) => {
  dispatch({ payload: message });
  setTimeout(() => {
    dispatch({ payload: "" });
  }, 5000);
};
