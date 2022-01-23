import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useBlog } from "../../../hooks/use-blog";
import { useArticle } from "../../../hooks/use-article";
import convertTitleIntoLink from "../../../functions/convertTitleIntoLink";
import Form from "../../organisms/Form";
import { CREATE_BLOG } from "../../../initial-data/form-structure-templates";

export default function BlogEditionSection() {
	const { blogLink } = useParams();

	const { blog, fetchBlog, getBlogKeyByLink, blogKey, updateBlog, deleteBlog } = useBlog();

	const { deleteArticle } = useArticle();

	const [startDeletingBlog, setStartDeletingBlog] = useState(false);
	const [isBlogDeleted, setIsBlogDeleted] = useState(false);

	function handleBlogEditionFormSubmit(updatedBlogData) {
		if (
			updatedBlogData.title.replace(/\s/g, "").length &&
			updatedBlogData.description.replace(/\s/g, "").length
		) {
			const link = convertTitleIntoLink(updatedBlogData.title);
			const newBlogDataWithLink = {
				...updatedBlogData,
				link: link,
			};
			//updatedBlog(prevBlogData, updatedBlogData, blogKey)
			updateBlog(blog.metadata, newBlogDataWithLink, blogKey);
			//alert("At the moment you can not update blog. Check the note in about section.");
		} else {
			alert(
				"You need to complete all input fields (not only white spaces...) to update your blog data... Try again!"
			);
		}
	}

	//======================== fetch blog procedure:
	useEffect(() => {
		if (blogLink) {
			getBlogKeyByLink(blogLink);
		}
	}, [blogLink]);

	useEffect(() => {
		if (blogKey) {
			fetchBlog(blogKey);
		}
	}, [blogKey]);

	useEffect(() => {
		if (blog) {
			console.log("fetched blog:", blog);
		}
	}, [blog]);

	//======================== delete blog procedure:
	useEffect(() => {
		if (blog) {
			if (startDeletingBlog) {
				//================ 1. check if there are any articles in blog
				if (blog && blog.articlesListOrderedByKeys) {
					//============ 1. a) delete all articles in loop
					const articles = Object.entries(blog.articlesListOrderedByKeys);
					for (let i = 0; i < articles.length; i++) {
						const article = articles[i];
						const articleKey = article[0];
						const articleLink = article[1].link;
						const articleTitle = article[1].title;
						deleteArticle(articleKey, articleTitle, articleLink, blogKey);
					}
				} else {
					//============ 2. if articles are deleted or there are no articles, delete blog
					console.log("There are no articles to delete. Delete blog now.");
					deleteBlog(blogKey, blogLink);
				}
			} else {
				if (!isBlogDeleted) {
					console.log("User didn't start deleting blog procedure.");
				}
			}
		}
	}, [startDeletingBlog, blog]);

	//===================== 3. if blog is deleted:
	useEffect(() => {
		if (!blog) {
			if (startDeletingBlog) {
				if (!isBlogDeleted) {
					setIsBlogDeleted(true);
					console.log("BlogEditionSection confirms: Blog was deleted");
				} else {
					setStartDeletingBlog(false);
				}
			}
		}
	}, [startDeletingBlog, isBlogDeleted, blog]);

	//===================================== render() =====================================

	if (!blog && !startDeletingBlog && !isBlogDeleted)
		return <p>Downloading data or there is no data...</p>;

	if (startDeletingBlog)
		return <p className="text-danger text-center">Deleting Blog... please wait...</p>;

	if (isBlogDeleted && !startDeletingBlog && !blog)
		return (
			<div>
				<p className="text-success text-center">
					Your blog && all articles it contained were deleted successfully!
				</p>
				<Link
					to="/dashboard/user-blogs"
					type="button"
					className="btn btn-outline-info mb-3 mt-2 d-block"
				>
					Go back to your blogs list
				</Link>
			</div>
		);

	return (
		<div className="blog-edition-section row">
			<div className="col-lg">
				<Form
					structure={CREATE_BLOG}
					data={blog.metadata}
					onSubmit={handleBlogEditionFormSubmit}
					text="save changes"
					to="/dashboard/user-blogs"
					formClassname="blog-edition-form"
				/>
				<div className="d-grid">
					<button
						type="button"
						className="btn btn-outline-danger mb-3 mt-2"
						onClick={() => {
							// eslint-disable-next-line no-restricted-globals
							const wantToDeleteBlog = confirm(
								"Are you sure, you want to delete this blog & all articles this blog contains forever? There's no turning back... Delete blog?"
							);
							if (wantToDeleteBlog) {
								setStartDeletingBlog(true);
								//deleteBlog(blogKey, blogLink, blog.articlesListOrderedByKeys);
								//alert("At the moment you can not delete blog. Check the note in about section.");
							}
						}}
					>
						Delete blog
					</button>
				</div>
			</div>
			<div className="col-lg">
				<h4 className="text-center">Articles</h4>
				<hr />
				{blog && blog.articlesListOrderedByKeys ? (
					Object.entries(blog.articlesListOrderedByKeys).map((article) => (
						<div key={article[0]}>
							<div className="row">
								<div className="col-md">
									<h5>{article[1].title}</h5>
								</div>
								<div className="col-md text-end">
									<Link
										to={"/edit-article/" + blogKey + "/" + article[0]}
										className="btn btn-secondary d-inline"
									>
										<i className="bi bi-pencil" />
									</Link>
									<Link
										to={"/blogs/" + blogLink + "/" + article[1].link}
										className="btn btn-secondary d-inline"
									>
										<i className="bi bi-eye" />
									</Link>
									<button
										className="btn btn-danger d-inline"
										onClick={() => {
											const wantToDeleteArticle =
												// eslint-disable-next-line no-restricted-globals
												confirm(
													"Are you sure, you want to delete this article from this blog forever? There's no turning back... Delete article?"
												);
											if (wantToDeleteArticle) {
												//articleKey, title, link, blogKey
												deleteArticle(
													article[0],
													article[1].title,
													article[1].link,
													blogKey
												);
												//alert("At the moment you can not delete article. Check the note in about section.");
											}
										}}
									>
										<i className="bi bi-trash" />
									</button>
								</div>
							</div>
							<hr />
						</div>
					))
				) : (
					<div>There are no articles in the blog...</div>
				)}
			</div>
		</div>
	);
}
