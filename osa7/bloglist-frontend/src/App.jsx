import { useEffect } from "react";
import Login from "./components/Login";
import Notification from "./components/Notification";
import { useSelector, useDispatch } from "react-redux";
import {
  initializeBlogs,
  _clearBlogs,
  deleteBlog,
  likeBlog,
} from "./reducers/blogreducer";
import { readUser } from "./reducers/userReducer";
import { Routes, Route, useMatch, useNavigate } from "react-router-dom";
import BlogList from "./components/BlogList";
import Users from "./components/Users";
import { getBlogUsers } from "./reducers/blogUserReducer";
import UserDetail from "./components/UserDetail";
import Menu from "./components/Menu";
import BlogDetails from "./components/BlogDetails";

const App = () => {
  const user = useSelector((state) => state.user);
  const blogusers = useSelector((state) => state.blogusers);
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(readUser());
  }, []);

  useEffect(() => {
    if (user?.user) {
      dispatch(initializeBlogs());
      dispatch(getBlogUsers());
    }
  }, [user]);

  const userMatch = useMatch("/users/:id");
  const blogUser = userMatch
    ? blogusers.find((b) => b.id === userMatch.params.id)
    : null;

  const blogMatch = useMatch("/blogs/:id");
  const blog = blogMatch
    ? blogs.find((b) => b.id === blogMatch.params.id)
    : null;

  if (!user?.user) {
    return (
      <div className="container">
        <h1>Log in to application</h1>
        <Notification></Notification>
        <Login></Login>
      </div>
    );
  }

  const handleDelete = async (blogToDelete) => {
    const confirm = window.confirm(
      `Remove blog ${blogToDelete.title} by ${blogToDelete.author}`
    );
    if (confirm) {
      dispatch(deleteBlog(blogToDelete));
      navigate("/");
    }
  };

  const handleLike = async (blog) => {
    dispatch(likeBlog(blog));
  };

  return (
    <div className="container">
      <Menu></Menu>
      <h1>blogs</h1>
      <Notification></Notification>

      <br></br>
      <Routes>
        <Route path="/" element={<BlogList blogs={blogs}></BlogList>}></Route>
        <Route
          path="/users"
          element={<Users users={blogusers}></Users>}
        ></Route>
        <Route
          path="/users/:id"
          element={<UserDetail bloguser={blogUser}></UserDetail>}
        ></Route>
        <Route
          path="/blogs/:id"
          element={
            <BlogDetails
              blog={blog}
              onLike={handleLike}
              onDelete={handleDelete}
              user={user}
            ></BlogDetails>
          }
        ></Route>
      </Routes>
    </div>
  );
};

export default App;
