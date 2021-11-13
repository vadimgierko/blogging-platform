import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDatabase } from "../hooks/use-database";


export default function BlogEditionForm() {

    const { blogLink } = useParams();

    const { blogs, deleteBlog, updateBlog, deleteArticle } = useDatabase();

    const [blog, setBlog] = useState(null);
    const [blogKey, setBlogKey] = useState(null);

    useEffect(() => {
        if (blogs) {
            const fetchedBlogs = Object.entries(blogs);
            const currentBlogArray = fetchedBlogs.filter(blog => blog[1].blogLink === blogLink); // array...
            const currentBlog = currentBlogArray[0][1];
            const currentBlogKey = currentBlogArray[0][0];
            setBlog(currentBlog);
            setBlogKey(currentBlogKey);
        } else {
            console.log("there are no blogs or blogLink in BlogPage ...")
        }
    }, [blogs, blogLink]);

    if (blog) {
        return (
            <div className="BlogEditionForm row">
                <div className="col">
                    <form>
                        <div className="mb-2">
                            <h4 className="text-center">Blog</h4>
                            <hr />
                            <p>Blog title</p>
                            <input
                                type="text"
                                className="form-control"
                                defaultValue={blog.title}
                                onChange={(e) => setBlog({...blog, title: e.target.value})}
                            />
                        </div>
                        <div className="mb-2">
                            <p>Blog description</p>
                            <textarea
                                type="text"
                                className="form-control"
                                defaultValue={blog.description}
                                onChange={(e) => setBlog({...blog, description: e.target.value})}
                            />
                        </div>
                        <button
                            type="button"
                            className="btn btn-success mb-3 d-block"
                            style={{width: "100%"}}
                            onClick={() => {
                                updateBlog(blogKey, blog);
                            }}
                        >
                            Save changes
                        </button>
                        <Link
                            to="/dashboard/user-blogs"
                            type="button"
                            className="btn btn-outline-danger mb-3 d-block"
                            onClick={() => {
                                // eslint-disable-next-line no-restricted-globals
                                const wantToDeleteBlog = confirm("Are you sure, you want to delete this blog & all articles from this blog forever? There's no turning back... Delete blog?");
                                if (wantToDeleteBlog) {
                                    deleteBlog(blogKey);
                                }
                            }}
                        >
                            Delete blog
                        </Link>
                    </form>
                </div>
                <div className="col">
                    <h4 className="text-center">Articles</h4>
                    <hr />
                    {
                        blog.articles ? (
                            Object.entries(blog.articles).map((article) => (
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
                                                    // eslint-disable-next-line no-restricted-globals
                                                    const wantToDeleteArticle = confirm("Are you sure, you want to delete this article from this blog forever? There's no turning back... Delete article?");
                                                    if (wantToDeleteArticle) {
                                                        deleteArticle(blogKey, article[0]);
                                                    }
                                                }}
                                            >
                                                <i className="bi bi-trash" />
                                            </button>
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            ))
                        ) : (
                            <div>
                                There are no articles...
                            </div>
                        )
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