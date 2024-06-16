const UserDetail = ({ bloguser }) => {
  if (!bloguser) {
    return (
      <>
        <p>not found</p>
      </>
    );
  }
  return (
    <>
      <h1>{bloguser.name}</h1>
      <b>added blogs</b>
      <br></br>
      <ul>
        {bloguser.blogs.map((b) => (
          <li key={b.id}>{b.title}</li>
        ))}
      </ul>
    </>
  );
};

export default UserDetail;
