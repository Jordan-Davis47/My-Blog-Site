import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head />
				<body>
					<Main />
					<NextScript />
					<div id="notifications"></div>
					<div id="drawer-hook"></div>
				</body>
			</Html>
		);
	}
}

export default MyDocument;
