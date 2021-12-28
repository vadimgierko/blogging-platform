import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useParams } from "react-router-dom";
import { useDatabase } from "../hooks/use-database";

export default function ArticleView() {

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

    return (
        <div>
            {
                article ? (
                    <div>
                        <div className="article-header text-center">
                            <h1>{article.title}</h1>
                            <p>{article.createdAt ? article.createdAt : null}{article.updatedAt ? (article.updatedAt === article.createdAt ? null : " / " + article.updatedAt) : null}</p>
                            <p>{article.description}</p>
                        </div>
                        <hr />
                        <ReactMarkdown children={article.content} remarkPlugins={[remarkGfm]} />
                    </div>
                ) : (
                    <p>There are no articles or downloading article...</p>
                )
            }
        </div>
    );
}