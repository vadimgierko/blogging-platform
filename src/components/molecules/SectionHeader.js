import { Link } from "react-router-dom";

export default function SectionHeader({ item, headerClassname }) {
	return (
		<header className={"text-center " + headerClassname}>
			<h1>{item.title}</h1>
			<p>
				by
				<Link to={"/bloggers/" + item.userName} className="ms-2">
					{item.author}
				</Link>
			</p>
			<p>
				{item.createdAt && item.createdAt}
				{item.updatedAt &&
					(item.updatedAt === item.createdAt ? null : " / " + item.updatedAt)}
			</p>
			<p>{item.description}</p>
		</header>
	);
}
