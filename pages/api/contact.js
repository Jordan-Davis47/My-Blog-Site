import { MongoClient } from "mongodb";

const handler = async (req, res) => {
	if (req.method === "POST") {
		const { email, name, message } = req.body;

		if (!email || !email.includes("@") || !name || name.trim() === "" || !message || message.trim() === "") {
			res.status(422).json({ message: "Invalid inputs!" });
			return;
		}

		const newMessage = {
			email,
			name,
			message,
		};

		let client;
		let db;

		const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.ewhgum0.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;
		try {
			client = await MongoClient.connect(connectionString);
		} catch (err) {
			res.status(500).json({ message: "Could not connect to database" });
		}

		db = client.db();

		try {
			const result = await db.collection("messages").insertOne(newMessage);
			newMessage.id = result.insertedId;
		} catch (err) {
			res.status(500).json({ message: "Storing message failed, please try again" });
			client.close();

			return;
		}

		client.close();

		console.log(newMessage);

		res.status(201).json({ response: "Successfully stored message", message: newMessage });
	}
};

export default handler;
