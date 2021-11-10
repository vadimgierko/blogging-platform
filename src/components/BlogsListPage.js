import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDatabase } from "../hooks/use-database";

export default function BlogsListPage() {

    const { blogs } = useDatabase();

    const [blogsList, setBlogsList] = useState(null);

    useEffect(() => {
        if (blogs) {
            setBlogsList(Object.entries(blogs));
            console.log(blogs)
        }
    }, [blogs]);

    return (
        <div className="BlogsList">
            <div>
                <h1>Blogs</h1>
                <hr />
                { blogsList && blogsList.length ? (
                    blogsList.map((blog) => 
                        <div key={blog[0]}>
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
                            <hr />
                        </div>
                    )) : (
                        <p>Downloading blogs or... there is no blogs...</p>
                    )
                }
            </div>
        </div>
    );
}