import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import MarkdownEditor from "../page-sections/create-article/MarkdownEditor";
import { useArticle } from "../../hooks/use-article";
import convertTitleIntoLink from "../../functions/convertTitleIntoLink";

export default function CreateArticlePage() {
	const { blogKey } = useParams();
	const { blogTitle } = useParams();

	const { addArticle } = useArticle();

	const [newArticleData, setNewArticleData] = useState({
		title: "",
		description: "",
		content: "",
	});

	function handleSubmit() {
		if (
			newArticleData.title.replace(/\s/g, "").length &&
			newArticleData.description.replace(/\s/g, "").length
		) {
			const articleLink = convertTitleIntoLink(newArticleData.title);
			const date = new Date();
			const day = date.getUTCDate();
			const month = date.getUTCMonth() + 1;
			const year = date.getUTCFullYear();
			const createdAt = year + "." + month + "." + day;
			const newArticleDataWithLink = {
				...newArticleData,
				link: articleLink,
				createdAt: createdAt,
			};
			addArticle(blogKey, blogTitle, newArticleDataWithLink);
		} else {
			alert(
				"You need to complete all input fields (not only white spaces...) to create new article... Try again!"
			);
		}
	}

	return (
		<div className="create-article-page container">
			<form className="create-article-form">
				<h1>Create new article!</h1>
				<hr />
				<div className="row">
					<div className="col-lg mb-2">
						<input
							type="text"
							className="form-control"
							placeholder="title"
							onChange={(e) =>
								setNewArticleData({ ...newArticleData, title: e.target.value })
							}
							required
						/>
					</div>
					<div className="col-lg mb-2">
						<textarea
							type="text"
							className="form-control"
							placeholder="description"
							onChange={(e) =>
								setNewArticleData({
									...newArticleData,
									description: e.target.value,
								})
							}
							required
						/>
					</div>
				</div>
			</form>
			<hr />
			<MarkdownEditor articleData={newArticleData} setArticleData={setNewArticleData} />
			<Link
				to="/dashboard/user-blogs"
				type="button"
				className="btn btn-primary mb-3"
				onClick={handleSubmit}
				//onClick={() => alert("I'm currently updating the app according to new database structure & security rules, so you can't create an article at the moment... Sorry, wait a few days!")}
			>
				Create new article
			</Link>
		</div>
	);
}
