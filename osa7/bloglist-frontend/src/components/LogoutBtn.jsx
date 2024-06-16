import localstorage from "../utils/localstorage";
import { useDispatch } from "react-redux";
import { _clearBlogs } from "../reducers/blogreducer";
import { clearUser } from "../reducers/userReducer";
import { useNavigate } from "react-router-dom";

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localstorage.clearStorage();
    dispatch(clearUser());
    dispatch(_clearBlogs());
    navigate("/");
  };
  return (
    <>
      <button
        data-testid="logout-button"
        onClick={handleLogout}
        className="btn btn-light btn-sm"
      >
        logout
      </button>
    </>
  );
};

export default LogoutBtn;
