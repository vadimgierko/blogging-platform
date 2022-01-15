import { useState, useEffect } from "react";
import { useRouteMatch, useParams } from "react-router-dom";
import { useDatabase } from "../../hooks/use-database";
import TableOfContent from "../molecules/TableOfContent";
import SectionHeader from "../molecules/SectionHeader";

export default function Blog() {

    let { url } = useRouteMatch();
    const { blogLink } = useParams();

    const { blogs, fetchBlogs } = useDatabase();

    const [blog, setBlog] = useState(null);

    // useEffect(() => {
    //     if (blogLink) {
    //         //
    //     }
    // }, [blogLink]);

    // this will be deleted
    // here will be fetching the blog according to its link:
    // getBlogByLink
    // => fetchBlog(blogLink)
    useEffect(() => {
        fetchBlogs();
    }, []);

    useEffect(() => {
        if (blogs) {
            const fetchedBlogs = Object.entries(blogs);
            const currentBlog = fetchedBlogs.find(blog => blog[1].blogLink === blogLink)[1];
            setBlog(currentBlog);
            console.log("blog articles:", currentBlog.articles);
        } else {
            console.log("there are no blogs or blogLink in BlogPage ...")
        }
    }, [blogs, blogLink]);

    if (!blog) return <p>Downloading data or there is no data...</p>

    return (
        <section className="blog">
            <SectionHeader item={blog} />
            {
                blog.articles
                ? <TableOfContent articles={blog.articles} url={url} />
                : <p>There are no articles yet...</p>
            }
        </section>
    );
}