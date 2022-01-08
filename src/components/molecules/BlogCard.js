import { Link } from "react-router-dom";

export default function BlogCard({ blog }) {
    return (
        <div className="blog-card">
            <hr />
            <Link to={"blogs/" + blog[1].blogLink}>
                <h3>{blog[1].title}</h3>
            </Link>
            <p>
                by
                <Link to={"bloggers/" + blog[1].userName} className="ms-2">
                    {blog[1].author}
                </Link>
            </p>
            <p>{blog[1].description}</p>
        </div>
    );
}