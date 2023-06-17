import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd() + "/content" + "/posts");

export const getPostsFiles = () => {
	const postFiles = fs.readdirSync(postsDirectory);
	return postFiles;
};

export const getPostData = (postIdentifier) => {
	//removes file extension if there is one//
	const postSlug = postIdentifier.replace(/\.md$/, "");
	//postSlug will never have a file extension, added one here so when retrieved can be used to load individual post//
	const filePath = path.join(postsDirectory, `${postSlug}.md`);
	//utf-8 makes usre we support unicode characters
	const fileContent = fs.readFileSync(filePath, "utf-8");
	//pulls out meta data and content from markdown file as these key value pairs//
	const { data, content } = matter(fileContent);

	const postData = {
		slug: postSlug,
		...data,
		content,
	};

	return postData;
};

export const getAllPosts = () => {
	const postFiles = getPostsFiles();

	const allPosts = postFiles.map((postFile) => {
		return getPostData(postFile);
	});

	//sort posts by date//
	const sortedPosts = allPosts.sort((postA, postB) => (postA.date > postB.date ? -1 : 1));

	return sortedPosts;
};

export const getFeaturedPosts = () => {
	const allPosts = getAllPosts();

	const featuredPosts = allPosts.filter((post) => post.isFeatured);

	return featuredPosts;
};
