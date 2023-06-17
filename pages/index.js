import Head from "next/head";
import React, { Fragment } from "react";
import Hero from "../components/home-page/Hero";
import FeaturedPosts from "../components/home-page/FeaturedPosts";

import { getFeaturedPosts } from "../helpers/posts-util";

const HomePage = (props) => {
	return (
		<Fragment>
			<Head>
				<title>Jordan's Blog</title>
				<meta name="description" content="I post about my full stack web development journey and related software content" />
			</Head>
			<Hero />
			<FeaturedPosts posts={props.featuredPosts} />
		</Fragment>
	);
};

export const getStaticProps = () => {
	const featuredPosts = getFeaturedPosts();

	return {
		props: { featuredPosts: featuredPosts },
		revalidate: 21600,
	};
};

export default HomePage;
