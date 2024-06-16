import { Link } from "react-router-dom";

const Users = ({ users }) => {
  return (
    <>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td className="padding5">
                <Link to={u.id}>{u.name}</Link>
              </td>
              <td className="textCenter">{u.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Users;
