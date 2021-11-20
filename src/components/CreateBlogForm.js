import { useState } from "react";
import { Link } from 'react-router-dom';
import { useDatabase } from "../hooks/use-database";
import convertTitleIntoLink from "../functions/convertTitleIntoLink";

export default function CreateBlogForm() {

    const { addBlog } = useDatabase();

    const [newBlogData, setNewBlogData] = useState({
        title: "",
        description: "",
        articles: Array(0)
    });

    function handleSubmit() {
        if (
            newBlogData.title.replace(/\s/g, '').length &&
            newBlogData.description.replace(/\s/g, '').length
        ) {
            const blogLink = convertTitleIntoLink(newBlogData.title);
            const newBlogDataWithLink = {
                ...newBlogData,
                blogLink: blogLink
            }
            addBlog(newBlogDataWithLink);
        } else {
            alert("You need to complete all input fields (not only white spaces...) to create new blog... Try again!");
        }
        
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