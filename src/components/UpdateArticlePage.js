import { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import MarkdownEditor from "./MarkdownEditor";
import { useDatabase } from "../hooks/use-database";
import convertTitleIntoLink from "../functions/convertTitleIntoLink";

export default function UpdateArticlePage() {

    const { blogKey } = useParams();
    const { articleKey } = useParams();

    const { blogs, updateArticle } = useDatabase();

    const [updatedArticleData, setUpdatedArticleData] = useState(null);

    function handleSubmit() {
        // update article link in the case if title changed:
        const articleLink = convertTitleIntoLink(updatedArticleData.title);
        // set date of update:
        const date = new Date();
        const day = date.getUTCDate();
        const month = date.getUTCMonth() + 1;
        const year = date.getUTCFullYear();
        const updatedAt = year + "." + month + "." + day;
        // update updatedData with new link & updateAt date:
        const updatedArticleDataWithLink = {
            ...updatedArticleData,
            articleLink: articleLink,
            updatedAt: updatedAt
        }
        updateArticle(blogKey, articleKey, updatedArticleDataWithLink);
    }

    useEffect(() => {
        if (blogs) {
            const currentBlog = blogs[blogKey];
            console.log("currentBlog:", currentBlog);
            const currentArticle = currentBlog.articles[articleKey];
            console.log("currentArticle:", currentArticle);
            setUpdatedArticleData(currentArticle);
        }
    }, [blogs, blogKey, articleKey]);

    return (
        <div className="UpdateArticlePage container">
            {
                updatedArticleData ? (
                    <>
                        <form>
                            <h1>Update article!</h1>
                            <hr />
                            <div className="row">
                                <div className="col-lg mb-2">
                                    <input
                                        type="text"
                                        className="form-control"
                                        defaultValue={updatedArticleData.title}
                                        onChange={(e) => setUpdatedArticleData({...updatedArticleData, title: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="col-lg mb-2">
                                    <textarea
                                        type="text"
                                        className="form-control"
                                        defaultValue={updatedArticleData.description}
                                        onChange={(e) => setUpdatedArticleData({...updatedArticleData, description: e.target.value})}
                                        required
                                    />
                                </div>
                            </div>
                        </form>
                        <hr />
                        <MarkdownEditor
                            articleData={updatedArticleData}
                            setArticleData={setUpdatedArticleData}
                        />
                        <Link
                            to="/dashboard/user-blogs"
                            type="button"
                            className="btn btn-primary mb-3"
                            onClick={handleSubmit}
                        >
                            Update article
                        </Link>
                    </>
                ) : (
                    <>Cannot fetch the article data...</>
                )
            }
        </div>
    );
}