import { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import MarkdownEditor from "../page-sections/create-article/MarkdownEditor";
import { useDatabase } from "../../hooks/use-database";
import convertTitleIntoLink from "../../functions/convertTitleIntoLink";

export default function UpdateArticle() {

    const { blogKey } = useParams();
    const { articleKey } = useParams();

    const { blogs, updateArticle } = useDatabase();

    const [updatedArticleData, setUpdatedArticleData] = useState(null);

    function handleSubmit() {
        if (
            updatedArticleData.title.replace(/\s/g, '').length &&
            updatedArticleData.description.replace(/\s/g, '').length
        ) {
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
        } else {
            alert("You need to complete all input fields (not only white spaces...) to create new article... Try again!");
        }
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

    if (!updatedArticleData) return <p>Downloading article data...</p>

    return (
        <div className="update-article-page container">
            <form className="update-article-form">
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
                //onClick={handleSubmit}
                onClick={() => alert("I'm currently updating the app according to new database structure & security rules, so you can't update an article at the moment... Sorry, wait a few days!")}
            >
                Update article
            </Link>   
        </div>
    );
}