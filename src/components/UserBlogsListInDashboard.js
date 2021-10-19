import { useState, useEffect } from "react";
import { database } from "../firebase";
import { ref, remove, onValue } from "firebase/database";
import { Link, Switch, Route, useRouteMatch } from "react-router-dom";
import BlogEditionForm from "./BlogEditionForm";

export default function UserBlogsListInDashboard({ userId, setBlogKeyForNewArticle, setBlogTitleForNewArticle }) {

    let {path, url} = useRouteMatch();

    const [userBlogsList, setUserBlogsList] = useState(null);

    const [currentBlogKey, setCurrentBlogKey] = useState(null);
    const [currentBlogLink, setCurrentBlogLink] = useState(null);

    function fetchUserBlogsList(userId) {
        const userBlogsRef = ref(database, 'users/' + userId + '/blogs');
        onValue(userBlogsRef, (snapshot) => {
            if (snapshot) {
                const fetchedUserBlogsList = snapshot.val();        
                setUserBlogsList(fetchedUserBlogsList ? Object.entries(fetchedUserBlogsList) : null);
                console.log("User blogs list fetched to dashboard", fetchedUserBlogsList);
            }
        });
    }

    function deleteBlog(blogKey) {
        // eslint-disable-next-line no-restricted-globals
        const wantToDeleteBlog = confirm("Are you sure, you want to delete this blog & all articles from this blog forever? There's no turning back... Delete blog?");
        if (wantToDeleteBlog) {
            remove(ref(database, 'users/' + userId + '/blogs/' + blogKey)).then(() => {
                console.log("blog was deleted");
                fetchUserBlogsList(userId);
            }).catch((error) => {
                // An error ocurred
                console.log(error.message);
            });
            remove(ref(database, 'blogs/' + blogKey));
        }
    }

    function convertBlogTitleIntoLink(blogTitle) {
        return ("/" + blogTitle.replace(/ /g, "-").toLowerCase());
    }

    useEffect(() => {
        fetchUserBlogsList(userId);
    }, [userId]);

    return (
        <Switch>
            <Route exact path={path}>
                <div>
                    <Link
                        to="/create-blog"
                        type="button"
                        className="btn btn-info d-block my-3"
                    >Create new blog</Link>
                    {
                        userBlogsList && userBlogsList.length ?
                            userBlogsList.map((blog) =>
                                <div className="container" key={blog[0]}>
                                    <div className="row">
                                        <div className="col">
                                            <Link
                                                to={`${url}${convertBlogTitleIntoLink(blog[1].title)}`}
                                                onClick={() => {
                                                    setCurrentBlogKey(blog[0]);
                                                    setCurrentBlogLink(`${url}${convertBlogTitleIntoLink(blog[1].title)}`);
                                                }}
                                            >
                                                <h5>{blog[1].title}</h5>
                                            </Link>
                                        </div>
                                        <div className="col-4 text-end">
                                            <Link
                                                to="/create-article"
                                                className="text-info"
                                                onClick={() => {
                                                    setBlogKeyForNewArticle(blog[0]);
                                                    setBlogTitleForNewArticle(blog[1].title);
                                                }}
                                            >
                                                <i className="bi bi-plus-square me-2" />
                                            </Link>
                                            <Link
                                                className="text-danger"
                                                to="/dashboard/user-blogs"
                                                onClick={() => {
                                                    deleteBlog(blog[0]);
                                                }}
                                            >
                                                <i className="bi bi-trash" />
                                            </Link>
                                        </div>
                                        
                                    </div>
                                    <p>{blog[1].description}</p>
                                    <hr />
                                </div>
                            )
                        :
                            <div>
                                <h5 className="text-center">There is no blogs yet... Create one!</h5>
                            </div>
                    }
                </div>
            </Route>
            <Route path={currentBlogLink}>
                <BlogEditionForm
                    userId={userId}
                    blogKey={currentBlogKey}
                    deleteBlog={deleteBlog}
                />
            </Route>
        </Switch>
    );
}