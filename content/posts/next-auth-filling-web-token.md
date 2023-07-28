---
title: "Next-Auth, filling JSON web token with data"
date: "2023-06-20"
image: "next-auth-filling-web-token.png"
summary: "Next-Auth give you some really great features, including using callbacks to fill your authentication token with user data for easy access & use"
isFeatured: false
---

Next-Auth is a really great tool for handling authentication for your next.js applications, it can use jwt (json web tokens) for you to authenticate users even on repeat visits from users. It also handles a lot logic for you with its built in functions that you can import, some of the **really** useful tools it gives you are the getSession & getServerSession "hooks" as well as the CredentialsProvider.

The CredentialsProvider is a function that accepts an object, you initialize this function inside of the providers array (you can have more than one provider, for example you can have multiple providers for logging someone in with their google account and one for apple account sign in and so on) in this object you provide an async callback function named authorize which you can use to perfom your custom logic, in the example below I place my logic for logging in a user in.

```js
export const authOptions = {
	secret: process.env.NEXT_AUTH_SECRET,
	session: {
		strategy: "jwt",
	},
	providers: [
		CredentialsProvider({
			name: "credentials",
			authorize: async (credentials, req) => {

				let client;
				try {
					client = await connectDatabase();
					client.connect();
				} catch (err) {
					res.status(500).json({ message: "Could not connect to the database", errMessage: err });
					return;
				}

				const db = client.db();

				const exisitingUser = await db.collection("users").findOne({ email: credentials.email });

				if (!exisitingUser) {
					client.close();
					res.status(401).json({ message: "Could not find user for provided inputs, please try again" });
					return null;
				}

				const isValidPassword = await comparePasswords(credentials.password, exisitingUser.password);

				if (!isValidPassword) {
					client.close();
					res.status(401).json({ message: "Incorrect credentials provided, please try again" });
					return null;
				}

				client.close();

				const userId = exisitingUser._id.toString();

				const user = { email: exisitingUser.email, name: exisitingUser.username, id: userId };

				**return** user;
			},
		}),
	],

```

The object 'user' that I return is the user object that will be accessible on the token sent on each request to authenticate the user. A problem I was facing was that despite creating a user object with all the information I wanted to store and later gain access to, only the email field with the user email was being stored to the token, no matter how I structured the object and its keys.

Now just the user email might be enough for some cases but I needed access to the users username and ID aswell.

The solution to this?

This is where useSession and getServerSession come in.

These great tools give you access to the current session of your user including the token that is used to authenticate on each request, with useSession being a hook that you can use on the client side and getServerSession can be used to access the users session on the server side. One use I wanted from this tool was to have access to a users ID for loading certain pages containing content from only a specific user and also the username to be able to display to each user.

What you need to do is provide a callbacks object alongside the providers array in your authOptions object, here you can specify callback funtions for certain operations such as signIn, signOut and the two that we are interested in here... the session and jwt, which we call as async function inside the callbacks object.

Here you can get access to the session, token and user by destructuring them inside the arguments of the related functions, by inputting the code in the example below you can set the user object that will be in the token with the exact key value pairs you assign in the credentialsProvider.

```js
callbacks: {
		async session({ session, token }) {
			session.user = token.user;
			return session;
		},
		async jwt({ token, user }) {
			if (user) {
				console.log("JWT ACCOUNT CHECK");
				token.user = user;
			}
			return token;
		},
	},
```

The code is not the most intuitive in terms of readability which is why it took me a little bit of research to find the solution I was looking for, which in my opinion a great way to improve. But loving using and integrating Next-Auth into my projects.

**Happy Coding!**
