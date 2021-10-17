import { useState } from "react";
import { database } from "../firebase";
import { ref, push, child, update } from "firebase/database";
import { Link } from 'react-router-dom';

export default function CreateBlogForm({ userId, userName, userFirstName, userLastName }) {

    const [newBlogData, setNewBlogData] = useState({
        author: userFirstName + " " + userLastName,
        userId: userId,
        userName: userName,
        title: "",
        description: "",
        articles: []
    });

    function handleSubmit() {
        console.log(newBlogData);
        saveNewBlog(newBlogData);
    }

    function saveNewBlog(newBlogData) {
        
        const blogData = {
            ...newBlogData
        };

        const newBlogKey = push(child(ref(database), 'blogs')).key;

        const updates = {};
        updates['/blogs/' + newBlogKey] = blogData;
        updates['/users/' + userId + '/blogs/' + newBlogKey] = blogData;

        return update(ref(database), updates);
    }

    return (
        <div className="container">
            <form>
                <h1>Create new blog!</h1>
                <hr />
                <div className="mb-2">
                    <p>New blog title goes here:</p>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="title"
                        onChange={(e) => setNewBlogData({...newBlogData, title: e.target.value})}
                    />
                </div>
                <div className="mb-2">
                    <p>New blog description goes here:</p>
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="description"
                        onChange={(e) => setNewBlogData({...newBlogData, description: e.target.value})}
                    />
                </div>
                
                <Link
                    to="/dashboard/user-blogs"
                    type="button"
                    className="btn btn-primary mb-3"
                    onClick={handleSubmit}
                >
                    Create new blog
                </Link>
            </form>
        </div>
    );
}