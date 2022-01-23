import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import MarkdownEditor from "../page-sections/create-article/MarkdownEditor";
import { useArticle } from "../../hooks/use-article";
import convertTitleIntoLink from "../../functions/convertTitleIntoLink";

export default function UpdateArticle() {
	//const { blogKey } = useParams();
	const { articleKey } = useParams();

	const { article, fetchArticle, updateArticle } = useArticle();

	const [updatedArticleData, setUpdatedArticleData] = useState();

	function handleSubmit() {
		if (
			updatedArticleData.title.replace(/\s/g, "").length &&
			updatedArticleData.description.replace(/\s/g, "").length
		) {
			// set date of update:
			const date = new Date();
			const day = date.getUTCDate();
			const month = date.getUTCMonth() + 1;
			const year = date.getUTCFullYear();
			const updatedAt = year + "." + month + "." + day;
			// update updatedData with new link & updateAt date:
			let updatedArticleDataWithLink;
			let isLinkChanged = false;
			// update article link in the case if title changed:
			if (
				article &&
				article.metadata &&
				article.metadata.title !== updatedArticleData.title
			) {
				isLinkChanged = true;
				const articleLink = convertTitleIntoLink(updatedArticleData.title);
				updatedArticleDataWithLink = {
					...updatedArticleData,
					link: articleLink,
					updatedAt: updatedAt,
				};
			} else {
				updatedArticleDataWithLink = {
					...updatedArticleData,
					updatedAt: updatedAt,
				};
			}
			updateArticle(
				updatedArticleDataWithLink,
				articleKey,
				isLinkChanged,
				isLinkChanged && article.metadata.link
			);
			setUpdatedArticleData(null);
		} else {
			alert(
				"You need to complete all input fields (not only white spaces...) to create new article... Try again!"
			);
		}
	}

	useEffect(() => {
		if (articleKey) {
			fetchArticle(articleKey);
		}
	}, [articleKey]);

	useEffect(() => {
		if (article) {
			console.log("prev article metadata:", article.metadata);
			/*
            author: "Test User"
            blogKey: "-MtYRswcLW0tm4F2dcRL"
            blogTitle: "New Test Blog"
            content: "...article,\n          author: userPublicData.firstName + \" \" + userPublicData.lastName,\n          userName: userPublicData.userName,\n          userId: user.uid,\n          blogKey: blogKey,\n          blogTitle: blogTitle"
            createdAt: "2022.1.16"
            description: "I hope it would work finally!"
            link: "new-test-article"
            title: "New Test Article"
            userId: "7M5XFfl36vSfhmyAkShjHDFuQnA3"
            userName: "testuser"
            */
			setUpdatedArticleData(article.metadata);
		}
	}, [article]);

	if (!updatedArticleData) return <p>Downloading article data...</p>;

	return (
		<div className="update-article-page container">
			<form className="update-article-form">
				<h1>Update article!</h1>
				<hr />
				<div className="row">
					<div className="col-lg mb-2">
						<input
							type="text"
							className="form-control"
							defaultValue={updatedArticleData.title}
							onChange={(e) =>
								setUpdatedArticleData({
									...updatedArticleData,
									title: e.target.value,
								})
							}
							required
						/>
					</div>
					<div className="col-lg mb-2">
						<textarea
							type="text"
							className="form-control"
							defaultValue={updatedArticleData.description}
							onChange={(e) =>
								setUpdatedArticleData({
									...updatedArticleData,
									description: e.target.value,
								})
							}
							required
						/>
					</div>
				</div>
			</form>
			<hr />
			<MarkdownEditor
				articleData={updatedArticleData}
				setArticleData={setUpdatedArticleData}
			/>
			<Link
				to="/dashboard/user-blogs"
				type="button"
				className="btn btn-primary mb-3"
				onClick={handleSubmit}
				//onClick={() => alert("I'm currently updating the app according to new database structure & security rules, so you can't update an article at the moment... Sorry, wait a few days!")}
			>
				Update article
			</Link>
		</div>
	);
}
