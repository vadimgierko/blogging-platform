import { useState } from "react";
import { database } from "../firebase";
import { ref, push, child, update } from "firebase/database";
import { Link } from 'react-router-dom';
import MarkdownEditor from "./MarkdownEditor";

export default function CreateArticlePage({ userId, userName, userFirstName, userLastName, blogTitle, blogKey }) {

    const [newArticleData, setNewArticleData] = useState({
        author: userFirstName + " " + userLastName,
        userId: userId,
        userName: userName,
        title: "",
        description: "",
        createdAt: "",
        blogTitle: blogTitle,
        blogKey: blogKey,
        content: ""
    });

    console.log("data passed to CreateArticlePage", newArticleData);

    function handleSubmit() {
        //console.log(newArticleData);
        saveNewArticle(newArticleData);
    }

    function saveNewArticle(newArticleData) {
        
        const articleData = {
            ...newArticleData
        };

        const newArticleKey = push(child(ref(database), '/blogs/' + blogKey + '/articles/')).key;

        const updates = {};
        updates['/blogs/' + blogKey + '/articles/' + newArticleKey] = articleData;
        updates['/users/' + userId + '/blogs/' + blogKey + '/articles/' + newArticleKey] = articleData;

        return update(ref(database), updates);
    }

    return (
        <div className="container">
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