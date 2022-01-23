import { Link } from "react-router-dom";

export default function LinkButton({ to, style, onClick, text, isCollapsed }) {
	return (
		<Link
			type="button"
			to={to}
			className={
				"link-button btn btn-outline-" + style + (isCollapsed ? " ms-2" : " mt-3 d-block")
			}
			onClick={onClick}
		>
			{text}
		</Link>
	);
}
