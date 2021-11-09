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

    // ARTICLES ? "DOWNLOADING ARTICLE" : "THERE IS NO ARTICLES" !!!

    useEffect(() => {
        
        if (blogs) {
            //console.log("article params:", blogLink, articleLink);
            const fetchedBlogs = Object.entries(blogs);
            const currentBlogArray = fetchedBlogs.filter(blog => blog[1].blogLink === blogLink); // array...
            const currentBlog = currentBlogArray[0][1];
            //console.log("current blog:", currentBlog);
            const fetchedArticles = Object.entries(currentBlog.articles);
            //console.log("fetched articles:", fetchedArticles);
            if (articleLink) {
                const currentArticleArray = fetchedArticles.filter(article => article[1].articleLink === articleLink);
                //console.log("current article array after filtering:", currentArticleArray)
                const currentArticle = currentArticleArray[0][1];
                //console.log("current article:", currentArticle);
                setArticle(currentArticle);
            } else {
                // if no article link = blogs/current-blog-page
                // show the last (the newest) article
                if (fetchedArticles && fetchedArticles.length) {
                    const newestArticle = fetchedArticles[fetchedArticles.length - 1][1];
                    setArticle(newestArticle);
                }
            }
        }
    }, [blogs, blogLink, articleLink]);

    return (
        <div className="col-8">
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