import { createContext, useContext, useState } from "react";
import { database } from "../firebase";
import { useDatabase } from "./use-database";

import { ref, set, push, child, onValue, remove } from "firebase/database";

const BlogContext = createContext();

export const useBlog = () => useContext(BlogContext);

export function BlogProvider({ children }) {
	const { userPublicData, user } = useDatabase();

	const [blog, setBlog] = useState();
	const [blogKey, setBlogKey] = useState();

	const getBlogKeyByLink = (blogLink) => {
		const blogRef = ref(database, "blogs/listOrderedByLinks/" + blogLink);
		onValue(blogRef, (snapshot) => {
			const data = snapshot.val();
			if (data) {
				console.log("blog key:", data.key);
				setBlogKey(data.key);
			}
			console.log("DATA WAS FETCHED: BLOG KEY");
		});
	};

	const fetchBlog = (blogKey) => {
		const blogRef = ref(database, "blogs/" + blogKey);
		onValue(blogRef, (snapshot) => {
			const data = snapshot.val();
			console.log("blog object:", data);
			setBlog(data);
		});
		console.log("DATA WAS FETCHED: BLOG");
	};

	const addBlog = (blogData) => {
		// blogData consists title, description & link

		const newBlogKey = push(child(ref(database), "blogs")).key;

		if (newBlogKey && blogData) {
			// add blog to blogs in database:
			set(ref(database, "blogs/" + newBlogKey + "/metadata"), {
				author: userPublicData.firstName + " " + userPublicData.lastName,
				userName: userPublicData.userName,
				userId: user.uid,
				...blogData,
			}).catch((error) => {
				alert(error.message);
			});

			// add blog to user blogs list:
			set(ref(database, "users/" + user.uid + "/publicData/blogs/" + newBlogKey), {
				title: blogData.title,
				link: blogData.link,
			}).catch((error) => {
				alert(error.message);
			});

			// add blog to blogs list ordered by keys:
			set(ref(database, "blogs/listOrderedByKeys/" + newBlogKey), {
				author: userPublicData.firstName + " " + userPublicData.lastName,
				userName: userPublicData.userName,
				userId: user.uid, // remember about userId, because only then rules will allow the user add smth !!!
				...blogData,
			}).catch((error) => {
				alert(error.message);
			});

			// add blog to blogs list ordered by links:
			set(ref(database, "blogs/listOrderedByLinks/" + blogData.link), {
				userId: user.uid,
				title: blogData.title,
				key: newBlogKey,
			}).catch((error) => {
				alert(error.message);
			});
		} else {
			alert("Can't add article... No blog data passed or/and no key generated... Try again.");
		}
	};

	const updateBlog = (prevBlogData, updatedBlogData, blogKey) => {
		if (updatedBlogData && blogKey) {
			// update blog in blogs in database:
			set(ref(database, "blogs/" + blogKey + "/metadata"), {
				...prevBlogData,
				...updatedBlogData,
			}).catch((error) => {
				alert(error.message);
			});

			// update blog in user blogs list
			// only if title or/and link changed:
			if (
				prevBlogData.title !== updatedBlogData.title ||
				prevBlogData.link !== updatedBlogData.link
			) {
				set(ref(database, "users/" + user.uid + "/publicData/blogs/" + blogKey), {
					title: updatedBlogData.title,
					link: updatedBlogData.link,
				}).catch((error) => {
					alert(error.message);
				});
			}

			// update blog in blogs list ordered by keys:
			set(ref(database, "blogs/listOrderedByKeys/" + blogKey), {
				...prevBlogData,
				...updatedBlogData,
			}).catch((error) => {
				alert(error.message);
			});

			// update blog in blogs list ordered by links
			// only if link changed = title changed:
			if (prevBlogData.link !== updatedBlogData.link) {
				// add new object with new link:
				set(ref(database, "blogs/listOrderedByLinks/" + updatedBlogData.link), {
					userId: prevBlogData.userId,
					title: updatedBlogData.title,
					key: blogKey,
				})
					.then(() => {
						console.log(
							"blog with new link:" +
								updatedBlogData.link +
								" was added to blogs list ordered by links."
						);
					})
					.catch((error) => {
						alert(error.message);
					});
				// delete old object with old link:
				remove(ref(database, "blogs/listOrderedByLinks/" + prevBlogData.link))
					.then(() => {
						console.log(
							"blog with old link:" +
								prevBlogData.link +
								" was deleted from blogs list ordered by links."
						);
					})
					.catch((error) => {
						alert(error.message);
					});
			}
		} else {
			alert("Can't update blog... No blog data or/and no key passed... Try again.");
		}
	};

	const deleteBlog = (blogKey, blogLink) => {
		// NOTE: this method must run after looping blogs articles list with deleteArticle()

		// delete blog from blogs in database:
		remove(ref(database, "blogs/" + blogKey))
			.then(() => {
				console.log("Blog with", blogKey, " blogKey was deleted.");
			})
			.catch((error) => {
				alert(error.message);
			});

		// delete blog from user blogs list:
		remove(ref(database, "users/" + user.uid + "/publicData/blogs/" + blogKey))
			.then(() => {
				console.log("Blog with", blogKey, " blogKey was deleted from user blog list.");
			})
			.catch((error) => {
				alert(error.message);
			});

		// delete blog from blogs list ordered by keys:
		remove(ref(database, "blogs/listOrderedByKeys/" + blogKey))
			.then(() => {
				console.log(
					"Blog with",
					blogKey,
					" blogKey was deleted from blogs list ordered by keys."
				);
			})
			.catch((error) => {
				alert(error.message);
			});

		// delete blog from blogs list ordered by links:
		remove(ref(database, "blogs/listOrderedByLinks/" + blogLink))
			.then(() => {
				console.log(
					"Blog with",
					blogLink,
					" blogLink was deleted from blogs list ordered by keys.."
				);
			})
			.catch((error) => {
				alert(error.message);
			});
	};

	const value = {
		blog,
		blogKey,
		getBlogKeyByLink,
		fetchBlog,
		addBlog,
		updateBlog,
		deleteBlog,
	};

	return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
}
