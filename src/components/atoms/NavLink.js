import { Link } from "react-router-dom";

export default function NavLink({ to, onClick, text }) {
	return (
		<Link className="nav-link" to={to} onClick={onClick}>
			{text}
		</Link>
	);
}
