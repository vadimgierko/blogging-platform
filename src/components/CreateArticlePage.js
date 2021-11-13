import { useState } from "react";
import { Link, useParams } from 'react-router-dom';
import MarkdownEditor from "./MarkdownEditor";
import { useDatabase } from "../hooks/use-database";
import convertTitleIntoLink from "../functions/convertTitleIntoLink";

export default function CreateArticlePage() {

    const { blogKey } = useParams();
    const { blogTitle } = useParams();

    const { addArticle } = useDatabase();

    const [newArticleData, setNewArticleData] = useState({
        title: "",
        description: "",
        content: ""
    });

    function handleSubmit() {
        const articleLink = convertTitleIntoLink(newArticleData.title);
        const date = new Date();
        const day = date.getUTCDate();
        const month = date.getUTCMonth() + 1;
        const year = date.getUTCFullYear();
        const createdAt = year + "." + month + "." + day;
        const newArticleDataWithLink = {
            ...newArticleData,
            articleLink: articleLink,
            createdAt: createdAt
        }
        addArticle(blogKey, blogTitle, newArticleDataWithLink);
    }

    return (
        <div className="CreateArticlePage container">
            <form>
                <h1>Create new article!</h1>
                <hr />
                <div className="row">
                    <div className="col-lg mb-2">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="title"
                            onChange={(e) => setNewArticleData({...newArticleData, title: e.target.value})}
                            required
                        />
                    </div>
                    <div className="col-lg mb-2">
                        <textarea
                            type="text"
                            className="form-control"
                            placeholder="description"
                            onChange={(e) => setNewArticleData({...newArticleData, description: e.target.value})}
                            required
                        />
                    </div>
                </div>
            </form>
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
        </div>
    );
}