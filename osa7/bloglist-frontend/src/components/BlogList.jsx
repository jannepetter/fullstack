import Blog from "./Blog";
import NewBlog from "./NewBlog";
import Togglable from "./Togglable";
import { _clearBlogs } from "../reducers/blogreducer";

const BlogList = ({ blogs }) => {
  return (
    <div className="container">
      <Togglable buttonLabel="new blog">
        <NewBlog></NewBlog>
      </Togglable>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
