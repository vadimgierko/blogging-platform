import { Link, Switch, Route, useRouteMatch } from "react-router-dom";
import UserDataSection from "../page-sections/dashboard/UserDataSection";
import UserBlogsSection from "../page-sections/dashboard/UserBlogsSection";
import { useDatabase } from "../../hooks/use-database";

export default function Dashboard({ userId }) {
	let { path } = useRouteMatch();

	const { fetchUserBlogsList } = useDatabase();

	if (!userId) return <p>You need to be logged to see your dashboard...</p>;

	return (
		<div className="dashboard-page">
			<nav className="dashboard-nav text-center">
				<Link to={`/dashboard/user-data`} className="me-2">
					Your profile data
				</Link>
				<span> | </span>
				<Link
					to={`/dashboard/user-blogs`}
					className="ms-2"
					onClick={() => fetchUserBlogsList(userId)}
				>
					Your blogs
				</Link>
			</nav>
			<hr />
			<Switch>
				<Route exact path={path}>
					<UserDataSection />
				</Route>
				<Route path={`${path}/user-data`}>
					<UserDataSection />
				</Route>
				<Route path={`${path}/user-blogs`}>
					<UserBlogsSection />
				</Route>
			</Switch>
		</div>
	);
}
