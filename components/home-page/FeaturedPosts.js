import React from "react";
import PostsGrid from "../posts/PostsGrid";

import classes from "./FeaturedPosts.module.css";

const FeaturedPosts = (props) => {
	return (
		<section className={classes.latest}>
			<h2>Featured Posts</h2>
			<PostsGrid posts={props.posts} />
		</section>
	);
};

export default FeaturedPosts;
