export default function convertTitleIntoLink(title) {
	return title.replace(/ /g, "-").toLowerCase();
}
