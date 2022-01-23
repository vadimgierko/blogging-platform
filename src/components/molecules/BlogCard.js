import { Link } from "react-router-dom";

export default function BlogCard({ blog }) {
	return (
		<div className="blog-card">
			<hr />
			<Link to={"/blogs/" + blog.link}>
				<h3>{blog.title}</h3>
			</Link>
			<p>
				by
				<Link to={"bloggers/" + blog.userName} className="ms-2">
					{blog.author}
				</Link>
			</p>
			<p>{blog.description}</p>
		</div>
	);
}
