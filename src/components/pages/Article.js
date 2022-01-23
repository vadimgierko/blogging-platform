import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useParams } from "react-router-dom";
import { useArticle } from "../../hooks/use-article";
import SectionHeader from "../molecules/SectionHeader";

export default function Article() {
	const { articleLink } = useParams();

	const { article, articleKey, fetchArticle, getArticleKeyByLink } = useArticle();

	useEffect(() => {
		if (articleLink) {
			getArticleKeyByLink(articleLink);
		}
	}, [articleLink]);

	useEffect(() => {
		if (articleKey) {
			fetchArticle(articleKey);
		}
	}, [articleKey]);

	if (!article) return <p>Downloading article or there is no such article...</p>;

	return (
		<div className="article-page">
			<article className="article">
				<SectionHeader item={article.metadata} headerClassname="article-header" />
				<hr />
				<ReactMarkdown children={article.metadata.content} remarkPlugins={[remarkGfm]} />
			</article>
		</div>
	);
}
