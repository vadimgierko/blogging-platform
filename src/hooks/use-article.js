import { createContext, useContext, useState } from "react";
import { database } from "../firebase";
import { useDatabase } from "./use-database";

import {
	ref,
	set,
	push,
	child,
	//update,
	onValue,
	remove,
	//query,
	//limitToFirst
} from "firebase/database";

const ArticleContext = createContext();

export const useArticle = () => useContext(ArticleContext);

export function ArticleProvider({ children }) {
	const { userPublicData, user } = useDatabase();

	const [article, setArticle] = useState();
	const [articleKey, setArticleKey] = useState();

	const getArticleKeyByLink = (articleLink) => {
		const articleRef = ref(database, "articles/listOrderedByLinks/" + articleLink);
		onValue(articleRef, (snapshot) => {
			const data = snapshot.val();
			if (data) {
				console.log("article key:", data.key);
				setArticleKey(data.key);
			}
		});
		console.log("DATA WAS FETCHED: ARTICLE KEY");
	};

	const fetchArticle = (articleKey) => {
		const articleRef = ref(database, "articles/" + articleKey);
		onValue(articleRef, (snapshot) => {
			const data = snapshot.val();
			console.log("article object:", data);
			setArticle(data);
		});
		console.log("DATA WAS FETCHED: ARTICLE");
	};

	const addArticle = (blogKey, blogTitle, article) => {
		// article: {title, description, content, link, createdAt}

		const newArticleKey = push(child(ref(database), "articles")).key;

		if (newArticleKey) {
			// add article to articles in database:
			set(ref(database, "articles/" + newArticleKey + "/metadata"), {
				...article,
				author: userPublicData.firstName + " " + userPublicData.lastName,
				userName: userPublicData.userName,
				userId: user.uid,
				blogKey: blogKey,
				blogTitle: blogTitle,
			}).catch((error) => {
				alert(error.message);
			});

			// add article to articles list ordered by links
			set(ref(database, "articles/listOrderedByLinks/" + article.link), {
				title: article.title,
				key: newArticleKey,
				userId: user.uid,
			}).catch((error) => {
				alert(error.message);
			});

			// add article to its blog's list ordered by keys
			set(ref(database, "blogs/" + blogKey + "/articlesListOrderedByKeys/" + newArticleKey), {
				link: article.link,
				title: article.title,
				userId: user.uid,
			}).catch((error) => {
				alert(error.message);
			});

			// add article to its blog's list ordered by links
			set(ref(database, "blogs/" + blogKey + "/articlesListOrderedByLinks/" + article.link), {
				title: article.title,
				key: newArticleKey,
				userId: user.uid,
			}).catch((error) => {
				alert(error.message);
			});
		}
	};

	const updateArticle = (updatedArticleData, articleKey, isLinkChanged, oldLink) => {
		if (articleKey && updatedArticleData) {
			// update article in articles in database:
			set(ref(database, "articles/" + articleKey + "/metadata"), {
				...updatedArticleData,
			})
				.then(() => {
					console.log("Article", updatedArticleData.title, "was updated.");
				})
				.catch((error) => {
					alert(error.message);
				});

			// update article in articles lists
			// only if link changed
			if (isLinkChanged) {
				//set new object in articles list ordered by links:
				set(ref(database, "articles/listOrderedByLinks/" + updatedArticleData.link), {
					title: updatedArticleData.title,
					key: articleKey,
					userId: updatedArticleData.userId,
				})
					.then(() => {
						console.log(
							"article with new link:" +
								updatedArticleData.link +
								" was added to articles list ordered by links."
						);
					})
					.catch((error) => {
						alert(error.message);
					});
				// delete old object in articles list ordered by links:
				if (oldLink) {
					remove(ref(database, "articles/listOrderedByLinks/" + oldLink))
						.then(() => {
							console.log(
								"article with old link:" +
									oldLink +
									" was deleted from articles list ordered by links."
							);
						})
						.catch((error) => {
							alert(error.message);
						});
				} else {
					console.log("No old link passed...");
				}

				// update article to its blog's list ordered by keys
				set(
					ref(
						database,
						"blogs/" +
							updatedArticleData.blogKey +
							"/articlesListOrderedByKeys/" +
							articleKey
					),
					{
						link: updatedArticleData.link,
						title: updatedArticleData.title,
						userId: updatedArticleData.userId,
					}
				).catch((error) => {
					alert(error.message);
				});

				//set new object in blog's articles list ordered by links:
				set(
					ref(
						database,
						"blogs/" +
							updatedArticleData.blogKey +
							"/articlesListOrderedByLinks/" +
							updatedArticleData.link
					),
					{
						title: updatedArticleData.title,
						key: articleKey,
						userId: updatedArticleData.userId,
					}
				)
					.then(() => {
						console.log(
							"article with new link:" +
								updatedArticleData.link +
								" was added to blog's articles list ordered by links."
						);
					})
					.catch((error) => {
						alert(error.message);
					});
				// delete old object in blog's articles list ordered by links:
				if (oldLink) {
					remove(
						ref(
							database,
							"blogs/" +
								updatedArticleData.blogKey +
								"/articlesListOrderedByLinks/" +
								oldLink
						)
					)
						.then(() => {
							console.log(
								"article with old link:" +
									oldLink +
									" was deleted from blog's articles list ordered by links."
							);
						})
						.catch((error) => {
							alert(error.message);
						});
				} else {
					console.log("No old link passed...");
				}
			} else {
				console.log(
					"Updated article link is the same, so articles list ordered by link didn't change."
				);
			}
		} else {
			alert("Can't update article... No article data or/and no key passed... Try again.");
		}
	};

	const deleteArticle = (articleKey, title, link, blogKey) => {
		// delete article from articles in database:
		remove(ref(database, "articles/" + articleKey))
			.then(() => {
				console.log("Article", title, "was deleted.");
			})
			.catch((error) => {
				alert(error.message);
			});

		// delete article from articles list ordered by links:
		remove(ref(database, "articles/listOrderedByLinks/" + link))
			.then(() => {
				console.log(
					"article with the link:" +
						link +
						" was deleted from articles list ordered by links."
				);
			})
			.catch((error) => {
				alert(error.message);
			});

		// delete article from its blog's list ordered by keys:
		remove(ref(database, "blogs/" + blogKey + "/articlesListOrderedByKeys/" + articleKey))
			.then(() => {
				console.log(
					"article with the key " +
						articleKey +
						" was deleted from its blog " +
						blogKey +
						" articles list ordered by keys."
				);
			})
			.catch((error) => {
				alert(error.message);
			});

		// delete article from its blog's list ordered by links:
		remove(ref(database, "blogs/" + blogKey + "/articlesListOrderedByLinks/" + link))
			.then(() => {
				console.log(
					"article with the link " +
						link +
						" was deleted from its blog " +
						blogKey +
						" articles list ordered by links."
				);
			})
			.catch((error) => {
				alert(error.message);
			});
	};

	const value = {
		article,
		articleKey,
		getArticleKeyByLink,
		fetchArticle,
		addArticle,
		deleteArticle,
		updateArticle,
	};

	return <ArticleContext.Provider value={value}>{children}</ArticleContext.Provider>;
}
