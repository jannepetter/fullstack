import { useSelector, useDispatch } from "react-redux";

const Notification = () => {
  const anecdoteNotification = useSelector((state) => state.notification);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  if (!anecdoteNotification) {
    return null;
  }
  return <div style={style}>{anecdoteNotification}</div>;
};

export default Notification;
