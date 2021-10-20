import { useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from '../firebase';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link, Switch, Route, useRouteMatch } from "react-router-dom";

export default function BlogPage({ blogKey }) {

    let {path, url} = useRouteMatch();

    const [blog, setBlog] = useState(null);

    const [currentArticleLink, setCurrentArticleLink] = useState(null);
    const [currentArticle, setCurrentArticle] = useState(null);

    function convertArticleTitleIntoLink(articleTitle) {
        return ("/" + articleTitle.replace(/ /g, "-").toLowerCase());
    }

    function fetchBlog() {

        const blogRef = ref(database, 'blogs/' + blogKey);

        onValue(blogRef, (snapshot) => {
            if (snapshot) {

                const fetchedBlog = snapshot.val();
                
                if (fetchedBlog) {
                    setBlog(fetchedBlog);
                }
            }
        });
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
                ) : fetchBlog()
            }
        </div>
    );
}