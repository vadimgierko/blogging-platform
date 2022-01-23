export default function FooterLink({ href, text }) {
	return (
		<a
			className="footer-link d-inline me-2 ms-2"
			style={{ textDecoration: "none" }}
			href={href}
			target="_blank"
			rel="noreferrer"
		>
			{text}
		</a>
	);
}
