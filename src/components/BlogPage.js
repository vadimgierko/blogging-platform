import { useState, useEffect } from "react";
import { Link, Switch, Route, useRouteMatch, useParams } from "react-router-dom";
import { useDatabase } from "../hooks/use-database";
import ArticleView from "./ArticleView";

export default function BlogPage() {

    let {path, url} = useRouteMatch();
    const { blogLink } = useParams();

    const { blogs } = useDatabase();

    const [blog, setBlog] = useState(null);

    useEffect(() => {
        if (blogs) {
            const fetchedBlogs = Object.entries(blogs);
            const currentBlog = fetchedBlogs.find(blog => blog[1].blogLink === blogLink)[1];
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
                                <div>
                                    <h5 className="text-center">Table of content</h5>
                                    <ul>
                                        {
                                            Object.entries(blog.articles).map((article) =>
                                                <li key={article[0]}>
                                                    <Link
                                                        to={url + "/" + article[1].articleLink}
                                                        className="d-block"
                                                    >{article[1].title}</Link>
                                                </li>
                                            )
                                        }
                                    </ul>
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