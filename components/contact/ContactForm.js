import { useRef, useContext } from "react";
import NotificationContext from "../../store/notification-context";

import classes from "./ContactForm.module.css";

const pendingNotification = {
	title: "Sending Comment",
	message: "Uploading your comment, please wait...",
	status: "pending",
};

const successNotification = {
	title: "Comment Sent",
	message: "Uploading comment was successful!",
	status: "success",
};

const errorNotification = {
	title: "Sending Failed",
	message: "Error uploading your comment, please try again",
	status: "error",
};

const ContactForm = () => {
	const notificationCtx = useContext(NotificationContext);
	const enteredEmail = useRef();
	const enteredName = useRef();
	const enteredMessage = useRef();

	const clearInputs = () => {
		enteredEmail.current.value = "";
		enteredName.current.value = "";
		enteredMessage.current.value = "";
	};

	const sendMessageHandler = async (event) => {
		event.preventDefault();

		notificationCtx.showNotification(pendingNotification);

		const email = enteredEmail.current.value;
		const name = enteredName.current.value;
		const message = enteredMessage.current.value;

		const requestBody = JSON.stringify({ email, name, message });

		const response = await fetch("/api/contact", { method: "POST", body: requestBody, headers: { "Content-Type": "application/json" } });

		if (response.ok) {
			clearInputs();
			notificationCtx.showNotification(successNotification);
		} else {
			notificationCtx.showNotification(errorNotification);
		}
	};

	return (
		<section className={classes.contact}>
			<h2></h2>
			<form className={classes.form} onSubmit={sendMessageHandler}>
				<div className={classes.controls}>
					<div className={classes.control}>
						<label htmlFor="email">Your Email</label>
						<input type="email" id="email" required ref={enteredEmail} />
					</div>
					<div className={classes.control}>
						<label htmlFor="name">Your Name</label>
						<input type="text" id="name" required ref={enteredName} />
					</div>
				</div>
				<div className={classes.control}>
					<label htmlFor="message">Your Message</label>
					<textarea id="message" rows="5" required ref={enteredMessage} />
				</div>
				<div className={classes.actions}>
					<button>Send Message</button>
				</div>
			</form>
		</section>
	);
};

export default ContactForm;
