import { useState } from "react";
import { Link, useParams } from 'react-router-dom';
import MarkdownEditor from "./MarkdownEditor";
import { useDatabase } from "../hooks/use-database";

export default function CreateArticlePage() {

    const { blogKey } = useParams();
    const { blogTitle } = useParams();

    const { addArticle } = useDatabase();

    const [newArticleData, setNewArticleData] = useState({
        title: "",
        description: "",
        createdAt: "",
        content: ""
    });

    function handleSubmit() {
        const articleLink = convertTitleIntoLink(newArticleData.title);
        const newArticleDataWithLink = {
            ...newArticleData,
            articleLink: articleLink
        }
        addArticle(blogKey, blogTitle, newArticleDataWithLink);
    }

    function convertTitleIntoLink(title) {
        return (title.replace(/ /g, "-").toLowerCase());
    }

    return (
        <div className="CreateArticlePage container">
            <form>
                <h1>Create new article!</h1>
                <hr />
                <div className="mb-2">
                    <p>New article title goes here:</p>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="title"
                        onChange={(e) => setNewArticleData({...newArticleData, title: e.target.value, content: "# " + e.target.value})}
                    />
                </div>
                <div className="mb-2">
                    <p>New article description goes here:</p>
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="description"
                        onChange={(e) => setNewArticleData({...newArticleData, description: e.target.value})}
                    />
                </div>
                <hr />
                <MarkdownEditor
                    articleData={newArticleData}
                    setArticleData={setNewArticleData}
                />
                <Link
                    to="/dashboard/user-blogs"
                    type="button"
                    className="btn btn-primary mb-3"
                    onClick={handleSubmit}
                >
                    Create new article
                </Link>
            </form>
        </div>
    );
}