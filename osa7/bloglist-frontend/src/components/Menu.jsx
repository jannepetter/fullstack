import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutBtn from "./LogoutBtn";

const Menu = () => {
  const user = useSelector((state) => state.user);

  const style = {
    padding: "5px",
  };

  return (
    <div className="menubar">
      <Link style={style} to="/users">
        users
      </Link>
      <Link style={style} to="/">
        blogs
      </Link>
      <span>
        {user.user} logged in <LogoutBtn></LogoutBtn>
      </span>
    </div>
  );
};

export default Menu;
