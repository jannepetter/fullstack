import { useState } from "react";
import { useDispatch } from "react-redux";
import { userLogin } from "../reducers/userReducer";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      userLogin({
        username: username,
        password: password,
      })
    );
    setPassword("");
    setUsername("");
  };
  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <div>
          username:
          <input
            data-testid="login-username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <div>
          password:
          <input
            data-testid="login-password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
          />
        </div>
        <div>
          <button
            className="btn btn-primary"
            data-testid="login-submit-btn"
            type="submit"
            variant="primary"
          >
            login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
