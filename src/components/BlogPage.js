import { useState, useEffect } from "react";
import { Link, Switch, Route, useRouteMatch, useParams } from "react-router-dom";
import { useDatabase } from "../hooks/use-database";
//import { useAuth } from "../hooks/use-auth";
import ArticleView from "./ArticleView";

export default function BlogPage() {

    let {path, url} = useRouteMatch();
    const { blogLink } = useParams();

    //const { user } = useAuth();
    const { blogs, deleteBlog } = useDatabase();

    const [blog, setBlog] = useState(null);

    useEffect(() => {
        if (blogs) {
            console.log(blogs);
            const fetchedBlogs = Object.entries(blogs);
            const currentBlogArray = fetchedBlogs.filter(blog => blog[1].blogLink === blogLink); // array...
            const currentBlog = currentBlogArray[0][1];
            setBlog(currentBlog);
        } else {
            console.log("there are no blogs or blogLink in BlogPage ...")
        }
    }, [blogs, blogLink]);

    function convertArticleTitleIntoLink(articleTitle) {
        return (articleTitle.replace(/ /g, "-").toLowerCase());
    }

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
                                                        to={url + "/" + convertArticleTitleIntoLink(article[1].title)}
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