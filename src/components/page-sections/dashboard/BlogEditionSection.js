import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useBlog } from "../../../hooks/use-blog";
import { useArticle } from "../../../hooks/use-article";
import convertTitleIntoLink from "../../../functions/convertTitleIntoLink";
import Form from "../../organisms/Form";
import { CREATE_BLOG } from "../../../initial-data/form-structure-templates";

export default function BlogEditionSection() {

    const { blogLink } = useParams();

    const { 
        blog,
        fetchBlog,
        getBlogKeyByLink,
        blogKey,
        //updateBlog,
        //deleteBlog
    } = useBlog();

    // import deleteArticle from useArticle !!!

    useEffect(() => {
        if (blogLink) {
            getBlogKeyByLink(blogLink);
        }
    }, [blogLink]);

    useEffect(() => {
        if (blogKey) {
            fetchBlog(blogKey);
        }
    }, [blogKey]);

    useEffect(() => {
        if (blog) {
            console.log("fetched blog:", blog);
        }
    }, [blog]);

    if (!blog) return <p>Downloading data or there is no data...</p>

    function handleBlogEditionFormSubmit(blog) {

        // need to convert updated blog title into link!
        // convertTitleIntoLink(link)
        if (
            blog.title.replace(/\s/g, '').length &&
            blog.description.replace(/\s/g, '').length
        ) {
            //updateBlog(blogKey, blog);
            alert("At the moment you can not update blog. Check the note in about section.");
        } else {
            alert("You need to complete all input fields (not only white spaces...) to update your blog data... Try again!");
        }
    }

    return (
        <div className="blog-edition-section row">
            <div className="col-lg">
                <Form
                    structure={CREATE_BLOG}
                    data={blog.metadata}
                    onSubmit={handleBlogEditionFormSubmit}
                    text="save changes"
                    to="/dashboard/user-blogs"
                    formClassname="blog-edition-form"
                />
                {/*<Link
                    to="/dashboard/user-blogs"
                    type="button"
                    className="btn btn-outline-danger mb-3 d-block"
                    onClick={() => {
                        // eslint-disable-next-line no-restricted-globals
                        const wantToDeleteBlog = confirm("Are you sure, you want to delete this blog & all articles from this blog forever? There's no turning back... Delete blog?");
                        if (wantToDeleteBlog) {
                            //deleteBlog(blogKey);
                            alert("At the moment you can not delete blog. Check the note in about section.");
                        }
                    }}
                >
                    Delete blog
                </Link>*/}
            </div>
            <div className="col-lg">
                <h4 className="text-center">Articles</h4>
                <hr />
                {
                    blog.articlesListOrderedByKeys ? (
                        Object.entries(blog.articlesListOrderedByKeys).map((article) => (
                            <div key={article[0]}>
                                <div className="row">
                                    <div className="col-md">
                                        <h5>{article[1].title}</h5>
                                    </div>
                                    <div className="col-md text-end">
                                        <Link
                                            to={"/edit-article/" + blogKey + "/" + article[0]}
                                            className="btn btn-secondary d-inline"
                                        >
                                            <i className="bi bi-pencil" />
                                        </Link>
                                        <Link
                                            to={"/blogs/" + blogLink + "/" + article[1].link}
                                            className="btn btn-secondary d-inline"
                                        >
                                            <i className="bi bi-eye" />
                                        </Link>
                                        <button
                                            className="btn btn-danger d-inline"
                                            onClick={() => {
                                                // eslint-disable-next-line no-restricted-globals
                                                const wantToDeleteArticle = confirm("Are you sure, you want to delete this article from this blog forever? There's no turning back... Delete article?");
                                                if (wantToDeleteArticle) {
                                                    //deleteArticle(blogKey, article[0]);
                                                    alert("At the moment you can not delete article. Check the note in about section.");
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
}