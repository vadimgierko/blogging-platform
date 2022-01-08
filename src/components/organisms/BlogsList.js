import { useDatabase } from "../../hooks/use-database";
import BlogCard from "../molecules/BlogCard";

export default function BlogsList() {

    const { blogs } = useDatabase();

    if (!blogs) return <p>Downloading blogs or... there is no blogs...</p>;

    return (
        <div className="blogs-list">
            <div>
                <h1>Blogs</h1>
                {Object.entries(blogs).map(blog => <BlogCard blog={blog} /> )}
            </div>
        </div>
    );
}