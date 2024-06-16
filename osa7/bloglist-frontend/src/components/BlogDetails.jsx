import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { commentBlog } from "../reducers/blogreducer";
import { useState } from "react";

const BlogDetails = ({ blog, onLike, onDelete, user }) => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  if (!blog) {
    return <>Not found</>;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(commentBlog(comment, blog.id));
    setComment("");
  };
  return (
    <>
      <Link to={blog.url}>{blog.url}</Link>
      <br />
      <span>{blog.likes} likes </span>
      <button className="btn btn-primary" onClick={() => onLike(blog)}>
        like
      </button>
      <br />
      <span>added by {blog.user.name}</span>
      <br />
      {user && user.id === blog.user.id && (
        <button className="btn btn-danger" onClick={() => onDelete(blog)}>
          remove
        </button>
      )}
      <h2>Comments</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="margin5"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></input>
        <button className="btn btn-primary margin5" type="submit">
          add comment
        </button>
      </form>
      <ul>
        {blog.comments.map((c, i) => (
          <li key={i}>{c.text}</li>
        ))}
      </ul>
    </>
  );
};

export default BlogDetails;
