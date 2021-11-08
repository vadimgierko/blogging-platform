import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link, Switch, Route, useRouteMatch } from "react-router-dom";
import { useDatabase } from "../hooks/use-database";
//import { useAuth } from "../hooks/use-auth";

export default function BlogPage({ blogKey }) {

    console.log(blogKey)

    let {path, url} = useRouteMatch();

    console.log(url)
    //const { user } = useAuth();
    const { blogs, deleteBlog } = useDatabase();

    const [blog, setBlog] = useState(null);

    useEffect(() => {
        if (blogs) {
            console.log(blogs);
            const fetchedBlogs = Object.entries(blogs);
            const currentBlogArray = fetchedBlogs.filter(blog => blog[0] === blogKey); // array...
            const currentBlog = currentBlogArray[0][1];
            setBlog(currentBlog);
        } else {
            console.log("there are no user and blogs...")
        }
    }, [blogs]);

    const [currentArticleLink, setCurrentArticleLink] = useState(null);
    const [currentArticle, setCurrentArticle] = useState(null);

    function convertArticleTitleIntoLink(articleTitle) {
        return ("/" + articleTitle.replace(/ /g, "-").toLowerCase());
    }

    console.log(currentArticleLink);
    console.log(currentArticle)

    return (
        <div>
            {
                blog ? (
                    <div>
                        <h1>{blog.title}</h1>
                        <p>{blog.description}</p>
                        <hr />
                        {
                            blog.articles ? (
                                <div className="row">
                                    <Switch>
                                        <Route path={currentArticleLink}>
                                            {
                                                currentArticle && currentArticleLink ? (
                                                    <div className="col">
                                                        {/*<h1>{currentArticle.title}</h1>
                                                        <hr />*/}
                                                        <ReactMarkdown children={currentArticle.content} remarkPlugins={[remarkGfm]} />
                                                    </div>
                                                ) : null
                                            }
                                        </Route>
                                    </Switch>
                                    <div className="col-4">
                                        <h5>Table of content</h5>
                                        <hr />
                                        <ul>
                                            {
                                                Object.entries(blog.articles).map((article) =>
                                                    <Link
                                                        key={article[0]}
                                                        to={url + convertArticleTitleIntoLink(article[1].title)}
                                                        className="d-block"
                                                        onClick={() => {
                                                            setCurrentArticle(article[1]);
                                                            setCurrentArticleLink(url + convertArticleTitleIntoLink(article[1].title))
                                                        }}
                                                    >{article[1].title}</Link>
                                                )
                                            }
                                        </ul>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <p>There are no articles yet...</p>
                                </div>
                            )
                        }
                    </div>
                ) : (
                    <div>Downloading data...</div>
                )
            }
        </div>
    );
}