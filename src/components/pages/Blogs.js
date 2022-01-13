import { useDatabase } from "../../hooks/use-database";
import BlogCard from "../molecules/BlogCard";

export default function Blogs() {

    const { blogs } = useDatabase();

    if (!blogs) return <p>Downloading blogs or... there is no blogs...</p>;

    return (
        <div className="blogs-page">
            <div className="blogs-list">
                <h1>Blogs</h1>
                {
                    Object.entries(blogs).map((blog, i) => <BlogCard key={"blog-card-" + i} blog={blog[1]} />)
                }
            </div>
        </div>
    );
}