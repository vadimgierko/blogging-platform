import { useState, useEffect } from "react";
import { database } from "../firebase";
import { ref, remove, onValue } from "firebase/database";
import { Link } from "react-router-dom";

export default function BlogEditionForm({blogKey, userId, deleteBlog}) {

    const [blogData, setBlogData] = useState(null);

    function getBlogData(blogKey) {
        const blogRef = ref(database, 'users/' + userId + '/blogs/' + blogKey);
        onValue(blogRef, (snapshot) => {
            if (snapshot) {
                const fetchedBlogData = snapshot.val();        
                setBlogData(fetchedBlogData ? fetchedBlogData : null);
                console.log("Current blog data fetched", fetchedBlogData);
            }
        });
    }

    function deleteArticle(articleKey) {
        // eslint-disable-next-line no-restricted-globals
        const wantToDeleteArticle = confirm("Are you sure, you want to delete this article from this blog forever? There's no turning back... Delete blog?");
        if (wantToDeleteArticle) {
            remove(ref(database, 'users/' + userId + '/blogs/' + blogKey + '/articles/' + articleKey)).then(() => {
                console.log("article was deleted");
                getBlogData(blogKey);
            }).catch((error) => {
                // An error ocurred
                console.log(error.message);
            });
            remove(ref(database, 'blogs/' + blogKey + '/articles/' + articleKey));
        }
    }

    useEffect(() => {
        getBlogData(blogKey);
    }, [blogKey]);

    if (blogData) {
        return (
            <div className="row">
                <div className="col">
                    <form>
                        <div className="mb-2">
                            <h4 className="text-center">Blog</h4>
                            <hr />
                            <p>Blog title</p>
                            <input
                                type="text"
                                className="form-control"
                                defaultValue={blogData.title}
                                onChange={(e) => setBlogData({...blogData, title: e.target.value})}
                            />
                        </div>
                        <div className="mb-2">
                            <p>Blog description</p>
                            <textarea
                                type="text"
                                className="form-control"
                                defaultValue={blogData.description}
                                onChange={(e) => setBlogData({...blogData, description: e.target.value})}
                            />
                        </div>
                        <button
                            type="button"
                            className="btn btn-success mb-3 d-block"
                            style={{width: "100%"}}
                            onClick={() => console.log(blogData)}
                        >
                            Save changes
                        </button>
                        <Link
                            to="/dashboard/user-blogs"
                            type="button"
                            className="btn btn-outline-danger mb-3 d-block"
                            onClick={() => deleteBlog(blogKey)}
                        >
                            Delete blog
                        </Link>
                    </form>
                </div>
                <div className="col">
                    <h4 className="text-center">Articles</h4>
                    <hr />
                    {
                        blogData.articles ? (
                            Object.entries(blogData.articles).map((article) => (
                                <div key={article[0]}>
                                    <div className="row">
                                        <div className="col">
                                            <h5>{article[1].title}</h5>
                                            <p>{article[1].description}</p>
                                        </div>
                                        <div className="col-4 text-end">
                                            <button
                                                className="btn btn-danger d-inline"
                                                onClick={() => {
                                                    deleteArticle(article[0]);
                                                }}
                                            >
                                                <i className="bi bi-trash" />
                                            </button>
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            ))
                        ) : (null)
                    }
                </div>
            </div>
        );
    } else {
        return (
            <h5>Downloading blog data...</h5>
        );
    }
}