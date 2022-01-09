import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useParams } from "react-router-dom";
import { useDatabase } from "../../hooks/use-database";
import SectionHeader from "../molecules/SectionHeader";

export default function Article() {

    const { articleLink } = useParams();
    const { blogLink } = useParams();
    const { blogs } = useDatabase();
    const [article, setArticle] = useState(null);

    useEffect(() => {
        
        if (blogs) {
            const currentBlog = Object.entries(blogs).find(blog => blog[1].blogLink === blogLink)[1];
            console.log("currentBlog:", currentBlog);
            if (articleLink) {
                console.log("article link:", articleLink);
                const currentArticle = Object.entries(currentBlog.articles).find(article => article[1].articleLink === articleLink)[1];
                console.log("currentArticle found by articleLink", currentArticle);
                setArticle(currentArticle);
            } else {
                // if no article link = blogs/current-blog-page
                // show the last (the newest) article
                const articles = currentBlog.articles ? Object.entries(currentBlog.articles) : null;
                if (articles && articles.length) {
                    const newestArticle = articles[articles.length - 1][1];
                    console.log("newestArticle:", newestArticle)
                    setArticle(newestArticle);
                } else {
                    console.log("there are no articles")
                }
            }
        }
    }, [blogs, blogLink, articleLink]);

    if (!article) return <p>There are no article or downloading article...</p>;

    return (
        <article className="article">
            <SectionHeader item={article} />
            <hr />
            <ReactMarkdown children={article.content} remarkPlugins={[remarkGfm]} />
        </article>
    );
}