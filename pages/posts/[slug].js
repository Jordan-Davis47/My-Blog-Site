import React, { Fragment } from "react";
import Head from "next/head";
import { getPostData, getPostsFiles } from "../../helpers/posts-util";

import PostContent from "../../components/posts/post-detail/PostContent";

const PostDetailPage = (props) => {
	return (
		<Fragment>
			<Head>
				<title>{props.post.title}</title>
				<meta name="description" content={props.post.summary} />
			</Head>
			<PostContent post={props.post} />
		</Fragment>
	);
};

export const getStaticProps = (context) => {
	//params hold query parameters from url//
	const { params } = context;
	const { slug } = params;

	const postData = getPostData(slug);

	return {
		props: {
			post: postData,
		},
		revalidate: 21600,
	};
};

export const getStaticPaths = () => {
	const postFileNames = getPostsFiles();

	//maps filenames into just path strings//
	const slugs = postFileNames.map((fileName) => fileName.replace(/\.md$/, ""));
	const paths = slugs.map((slug) => ({ params: { slug: slug } }));

	return {
		paths: paths,
		fallback: false,
	};
};

export default PostDetailPage;
