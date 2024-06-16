import { useState } from "react";
import { createNewBlog } from "../reducers/blogreducer";
import { useDispatch } from "react-redux";

const NewBlog = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title,
      author,
      url,
    };

    dispatch(createNewBlog(data));
    setTitle("");
    setAuthor("");
    setUrl("");
  };
  const labelStyle = {
    width: "60px",
    margin: "5px",
  };
  return (
    <>
      <h1>Create new</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label style={labelStyle}>title:</label>
          <input
            id="blog-title-input"
            data-testid="blog-title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <div>
          <label style={labelStyle}>author:</label>
          <input
            id="blog-author-input"
            data-testid="blog-author"
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
          />
        </div>
        <div>
          <label style={labelStyle}>url:</label>
          <input
            id="blog-url-input"
            data-testid="blog-url"
            onChange={(e) => setUrl(e.target.value)}
            value={url}
          />
        </div>
        <div>
          <button className="btn btn-primary" type="submit">
            create
          </button>
        </div>
      </form>
      <br></br>
    </>
  );
};

export default NewBlog;
