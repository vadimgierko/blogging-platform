import { createContext, useContext, useState } from "react";
import { database } from "../firebase";

import { ref, onValue } from "firebase/database";

const BloggerContext = createContext();

export const useBlogger = () => useContext(BloggerContext);

export function BloggerProvider({ children }) {
	const [bloggerPublicData, setBloggerPublicData] = useState();
	const [bloggerBlogsList, setBloggerBlogsList] = useState();
	const [bloggerId, setBloggerId] = useState();

	const fetchBloggerPublicData = (userId) => {
		const bloggerPublicDataRef = ref(database, "users/" + userId + "/publicData/data");
		onValue(bloggerPublicDataRef, (snapshot) => {
			const data = snapshot.val();
			console.log("blogger public data object:", data);
			setBloggerPublicData(data);
		});
	};

	const fetchBloggerBlogsList = (userId) => {
		//================= ordered by keys
		const bloggerBlogsListRef = ref(database, "users/" + userId + "/publicData/blogs");
		onValue(bloggerBlogsListRef, (snapshot) => {
			const data = snapshot.val();
			console.log("blogger blogs list object:", data);
			setBloggerBlogsList(data);
		});
	};

	const getBloggerIdByUserName = (userName) => {
		const bloggerRef = ref(database, "users/listOrderedByUserName/" + userName);
		onValue(bloggerRef, (snapshot) => {
			const data = snapshot.val();
			if (data) {
				console.log("blogger id got by user name:", data.userId);
				setBloggerId(data.userId);
			} else {
				console.log("There is no user with user name:", userName);
			}
		});
	};

	const value = {
		bloggerPublicData,
		bloggerBlogsList,
		bloggerId,
		fetchBloggerPublicData,
		fetchBloggerBlogsList,
		getBloggerIdByUserName,
	};

	return <BloggerContext.Provider value={value}>{children}</BloggerContext.Provider>;
}
