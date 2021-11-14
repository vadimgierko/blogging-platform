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
                const currentArticle = Object.entries(currentBlog.articles).find(article => article[1].articleLink === articleLink)[1];
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
        <div className="col-8">
            {
                article ? (
                    <div>
                        <h1>{article.title}</h1>
                        <p><em>Published:</em> {article.createdAt ? article.createdAt : (article.updatedAt ? article.updatedAt : "article was published before createdAt function came up ;-)")}</p>
                        <p><em>Updated:</em> {article.updatedAt ? article.updatedAt : article.createdAt}</p>
                        <p><em>Description:</em> {article.description}</p>
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