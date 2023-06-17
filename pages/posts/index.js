import React, { Fragment } from "react";
import Head from "next/head";
import { getAllPosts } from "../../helpers/posts-util";
import AllPosts from "../../components/posts/AllPosts";

const AllPostsPage = (props) => {
	return (
		<Fragment>
			<Head>
				<title>All Posts</title>
				<meta name="description" content="A list of all programming-related posts" />
			</Head>
			<AllPosts posts={props.allPosts} />
		</Fragment>
	);
};

export const getStaticProps = () => {
	const allPosts = getAllPosts();

	return {
		props: {
			allPosts: allPosts,
		},
		revalidate: 21600,
	};
};

export default AllPostsPage;
