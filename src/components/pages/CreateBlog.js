import { useBlog } from "../../hooks/use-blog";
import convertTitleIntoLink from "../../functions/convertTitleIntoLink";
import Form from "../organisms/Form";
import { CREATE_BLOG } from "../../initial-data/form-structure-templates";

export default function CreateBlog() {
	const { addBlog } = useBlog();

	function handleSubmit(blog) {
		if (blog.title.replace(/\s/g, "").length && blog.description.replace(/\s/g, "").length) {
			const link = convertTitleIntoLink(blog.title);
			const newBlogDataWithLink = {
				...blog,
				link: link,
			};
			addBlog(newBlogDataWithLink);
		} else {
			alert(
				"You need to complete all input fields (not only white spaces...) to create new blog... Try again!"
			);
		}
	}

	return (
		<div className="create-blog-section container">
			<h1>Create new blog!</h1>
			<hr />
			<Form
				structure={CREATE_BLOG}
				text="create blog"
				to="/dashboard/user-blogs"
				formClassname="create-blog-form"
				onSubmit={handleSubmit}
				//onSubmit={() => alert("I'm currently updating the app according to new database structure & security rules, so you can't create a blog at the moment... Sorry, wait a few days!")}
			/>
		</div>
	);
}
