import { useBlogger } from "../../hooks/use-blogger";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function Blogger() {
	const { userName } = useParams();

	const {
		bloggerPublicData,
		fetchBloggerPublicData,
		bloggerBlogsList,
		fetchBloggerBlogsList,
		getBloggerIdByUserName,
		bloggerId,
	} = useBlogger();

	useEffect(() => {
		if (userName) {
			getBloggerIdByUserName(userName);
		}
	}, [userName]);

	useEffect(() => {
		if (bloggerId) {
			fetchBloggerPublicData(bloggerId);
			fetchBloggerBlogsList(bloggerId);
		}
	}, [bloggerId]);

	if (!bloggerPublicData)
		return (
			<p>
				Downloading data or ... there is no blogger of user name:{" "}
				{bloggerPublicData && bloggerPublicData.userName}
			</p>
		);

	return (
		<div className="blogger-page">
			<h1>{bloggerPublicData.firstName + " " + bloggerPublicData.lastName}</h1>
			<hr />
			<p>user name: {"@" + bloggerPublicData.userName}</p>
			<nav className="blogger-blogs">
				{bloggerBlogsList ? (
					Object.entries(bloggerBlogsList).map((blog) => (
						<Link key={blog[0]} to={"/blogs/" + blog[1].link}>
							<h3>{blog[1].title}</h3>
						</Link>
					))
				) : (
					<p>Downloading blogger blogs or there are no blogs...</p>
				)}
			</nav>
		</div>
	);
}
