import { Fragment } from "react";

import classes from "./Layout.module.css";
import MainNavigation from "./MainNavigation";
import { useSelector } from "react-redux";
import Notification from "../UI/Notification";

const Layout = (props) => {
  const notification = useSelector((state) => state.ui.notification);

  return (
    <Fragment>
      <MainNavigation />
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        ></Notification>
      )}
      <main className={classes.main}>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
