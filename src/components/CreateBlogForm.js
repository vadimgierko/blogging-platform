import { useState } from "react";
import { database } from "../firebase";
import { ref, set } from "firebase/database";
import { Link } from 'react-router-dom';

export default function CreateBlogForm({ userId, testBlog, setTestBlog }) {

    const [newBlogData, setNewBlogData] = useState({
        title: "",
        description: ""
    });

    function handleSubmit() {
        console.log(newBlogData);
        let blogs = testBlog;
        blogs.push(newBlogData);
        setTestBlog(blogs);
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
                        onChange={(e) => setNewBlogData({...newBlogData, description: e.target.value})}
                    />
                </div>
                
                <button
                    type="button"
                    className="btn btn-primary mb-3"
                    onClick={handleSubmit}
                >
                    Create new blog
                </button>
            </form>
        </div>
    );
}