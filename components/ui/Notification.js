import React, { useContext } from "react";
import ReactDOM from "react-dom";

import NotificationContext from "../../store/notification-context";
import classes from "./Notification.module.css";

function Notification(props) {
	const ctx = useContext(NotificationContext);
	const { title, message, status } = props;

	let statusClasses = "";

	if (status === "success") {
		statusClasses = classes.success;
	}

	if (status === "error") {
		statusClasses = classes.error;
	}

	if (status === "pending") {
		statusClasses = classes.pending;
	}

	const cssClasses = `${classes.notification} ${statusClasses}`;

	return ReactDOM.createPortal(
		<div className={cssClasses} onClick={ctx.hideNotification}>
			<h2>{title}</h2>
			<p>{message}</p>
		</div>,
		document.getElementById("notifications")
	);
}

export default Notification;
