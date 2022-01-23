import { useEffect } from "react";
import { useLists } from "../../hooks/use-lists";
import BlogCard from "../molecules/BlogCard";

export default function Blogs() {
	const { blogsListOrderedByKeys, fetchBlogsListOrderedByKeys } = useLists();

	useEffect(() => {
		fetchBlogsListOrderedByKeys();
	}, []);

	if (!blogsListOrderedByKeys) return <p>Downloading blogs or... there is no blogs...</p>;

	return (
		<div className="blogs-page">
			<div className="blogs-list">
				<h1>Blogs</h1>
				{Object.entries(blogsListOrderedByKeys).map((blog, i) => (
					<BlogCard key={"blog-card-" + i} blog={blog[1]} />
				))}
			</div>
		</div>
	);
}
