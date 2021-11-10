import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
//import { useAuth } from "../hooks/use-auth";
import { useDatabase } from "../hooks/use-database";

export default function CreateBlogForm() {

    //const { user } = useAuth();
    const { userData, addBlog } = useDatabase();

    const [newBlogData, setNewBlogData] = useState({
        title: "",
        description: "",
        articles: []
    });

    function handleSubmit() {
        addBlog(newBlogData);
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