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
            console.log("article params:", blogLink, articleLink);
            const fetchedBlogs = Object.entries(blogs);
            const currentBlogArray = fetchedBlogs.filter(blog => blog[1].blogLink === blogLink); // array...
            const currentBlog = currentBlogArray[0][1];
            console.log("current blog:", currentBlog);
            const fetchedArticles = Object.entries(currentBlog.articles);
            console.log("fetched articles:", fetchedArticles);
            const currentArticleArray = fetchedArticles.filter(article => article[1].articleLink === articleLink);
            console.log("current article array after filtering:", currentArticleArray)
            const currentArticle = currentArticleArray[0][1];
            console.log("current article:", currentArticle);
            setArticle(currentArticle);
        }
    }, [blogs, blogLink, articleLink]);

    return (
        <div className="col">
            {
                article ? (
                    <ReactMarkdown children={article.content} remarkPlugins={[remarkGfm]} />
                ) : (
                    <p>Downloading article...</p>
                )
            }
        </div>
    );
}