import React, { Fragment, useContext } from "react";
import MainNavigation from "./MainNavigation";
import Notification from "../../ui/Notification";
import NotificationContext from "../../../store/notification-context";

const Layout = (props) => {
	const notificationCtx = useContext(NotificationContext);

	const notification = notificationCtx.notification;

	return (
		<Fragment>
			<MainNavigation />
			<main>{props.children}</main>
			{notification && <Notification title={notification.title} message={notification.message} status={notification.status} />}
		</Fragment>
	);
};

export default Layout;
