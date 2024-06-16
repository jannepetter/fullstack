import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const msg = notification?.msg;
  const type = notification?.type;

  if (!msg) {
    return null;
  }

  return (
    <>
      <div className={type}>{msg}</div>
    </>
  );
};

export default Notification;
