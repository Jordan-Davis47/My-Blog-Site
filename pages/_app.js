import Head from "next/head";
import Layout from "../components/home-page/layout/Layout";
import { NotificationContextProvider } from "../store/notification-context";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
	return (
		<NotificationContextProvider>
			<Layout>
				<Head>
					<meta name="viewport" content="width=device-width, initial-scale=1" />
				</Head>
				<Component {...pageProps} />
			</Layout>
		</NotificationContextProvider>
	);
}

export default MyApp;
