import { useContext } from "react";
import Notification from "../ui/notification";
import MainHeader from "./main-header";
import NotificationContext from "../../store/notification-context";

const Layout = (props) => {
  const notificationCtx = useContext(NotificationContext);
  const { notification } = notificationCtx;
  const { title, message, status } = notification;

  return (
    <>
      <MainHeader />
      <main>{props.children}</main>
      {notification && (
        <Notification title={title} message={message} status={status} />
      )}
    </>
  );
};

export default Layout;
