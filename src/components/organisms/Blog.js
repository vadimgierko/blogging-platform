import { useState, useEffect } from "react";
import { useRouteMatch, useParams } from "react-router-dom";
import { useDatabase } from "../../hooks/use-database";
import BlogHeader from "../molecules/BlogHeader";
import TableOfContent from "../molecules/TableOfContent";

export default function Blog() {

    let { url } = useRouteMatch();
    const { blogLink } = useParams();

    const { blogs } = useDatabase();

    const [blog, setBlog] = useState(null);

    useEffect(() => {
        if (blogs) {
            const fetchedBlogs = Object.entries(blogs);
            const currentBlog = fetchedBlogs.find(blog => blog[1].blogLink === blogLink)[1];
            setBlog(currentBlog);
        } else {
            console.log("there are no blogs or blogLink in BlogPage ...")
        }
    }, [blogs, blogLink]);

    if (!blog) return <p>Downloading data or there is no data...</p>

    return (
        <div className="blog-page">
            <BlogHeader blog={blog} />
            {
                blog.articles
                ? <TableOfContent articles={blog.articles} url={url} />
                : <p>There are no articles yet...</p>
            }
        </div>
    );
}