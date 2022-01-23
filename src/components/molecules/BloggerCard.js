import { Link } from "react-router-dom";

export default function BloggerCard({ bloggerData }) {
	return (
		<div className="blogger-card">
			<hr />
			<Link
				to={"bloggers/" + bloggerData.userName}
				className="d-block my-2"
				style={{ textDecoration: "none" }}
			>
				<i className="bi bi-person-circle me-2"></i>
				{bloggerData.firstName + " " + bloggerData.lastName + " | @" + bloggerData.userName}
			</Link>
		</div>
	);
}
