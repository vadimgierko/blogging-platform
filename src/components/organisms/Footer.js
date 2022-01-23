import FooterLink from "../atoms/FooterLink";

const FOOTER_LINKS = [
	{
		href: "https://github.com/vadimgierko/blogging-platform",
		text: "Blogging Platform",
	},
	{
		href: "https://github.com/vadimgierko/markdown-text-editor",
		text: "Markdown Editor",
	},
	{
		href: "https://github.com/vadimgierko",
		text: "Vadim Gierko",
	},
];

export default function Footer() {
	return (
		<div className="footer text-center text-muted">
			<hr />
			<FooterLink href={FOOTER_LINKS[0].href} text={FOOTER_LINKS[0].text} />
			&
			<FooterLink href={FOOTER_LINKS[1].href} text={FOOTER_LINKS[1].text} />
			&copy; 2021 - 2022
			<FooterLink href={FOOTER_LINKS[2].href} text={FOOTER_LINKS[2].text} />
		</div>
	);
}
