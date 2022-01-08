import { Link } from "react-router-dom";

export default function BlogHeader({ blog }) {
    return (
        <div className="blog-header text-center">
            <h1>{blog.title}</h1>
            <p>
                by
                <Link to={"/bloggers/" + blog.userName} className="ms-2">
                    {blog.author}
                </Link>
            </p>
            <p>{blog.description}</p>
        </div>
    );
}