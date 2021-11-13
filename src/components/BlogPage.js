import { useState, useEffect } from "react";
import { Link, Switch, Route, useRouteMatch, useParams } from "react-router-dom";
import { useDatabase } from "../hooks/use-database";
import ArticleView from "./ArticleView";

export default function BlogPage() {

    let {path, url} = useRouteMatch();
    const { blogLink } = useParams();

    const { blogs, deleteBlog } = useDatabase();

    const [blog, setBlog] = useState(null);

    useEffect(() => {
        if (blogs) {
            const fetchedBlogs = Object.entries(blogs);
            const currentBlogArray = fetchedBlogs.filter(blog => blog[1].blogLink === blogLink); // array...
            const currentBlog = currentBlogArray[0][1];
            setBlog(currentBlog);
        } else {
            console.log("there are no blogs or blogLink in BlogPage ...")
        }
    }, [blogs, blogLink]);

    return (
        <div>
            {
                blog ? (
                    <div>
                        <div className="text-center">
                            <h1>{blog.title}</h1>
                            <p>
                                by
                                <Link to={"/bloggers/" + blog.userName} className="ms-2">
                                    {blog.author}
                                </Link>
                            </p>
                            <p>{blog.description}</p>
                        </div>
                        <hr />
                        {
                            blog.articles ? (
                            
                                <div className="row">
                                    <Switch>
                                        <Route exact path={path}>
                                            <ArticleView />
                                        </Route>
                                        <Route exact path={path + "/:articleLink"}>
                                            <ArticleView />
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
                                                        to={url + "/" + article[1].articleLink}
                                                        className="d-block"
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