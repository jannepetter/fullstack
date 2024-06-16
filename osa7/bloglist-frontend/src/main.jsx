import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import blogreducer from "./reducers/blogreducer";
import notificationReducer from "./reducers/notificationReducer";
import userReducer from "./reducers/userReducer";
import blogUserReducer from "./reducers/blogUserReducer";
import { BrowserRouter as Router } from "react-router-dom";
const store = configureStore({
  reducer: {
    blogs: blogreducer,
    notification: notificationReducer,
    user: userReducer,
    blogusers: blogUserReducer,
  },
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
