import { useState, useEffect } from "react";
import { useRouteMatch, useParams } from "react-router-dom";
import { useDatabase } from "../../hooks/use-database";
import TableOfContent from "../molecules/TableOfContent";
import SectionHeader from "../molecules/SectionHeader";

export default function Blog() {

    let { url } = useRouteMatch();
    const { blogLink } = useParams();

    const { 
        blog,
        fetchBlog,
        getBlogKeyByLink,
        blogKey,
    } = useDatabase();

    useEffect(() => {
        if (blogLink) {
            getBlogKeyByLink(blogLink);
        }
    }, [blogLink]);

    useEffect(() => {
        if (blogKey) {
            fetchBlog(blogKey);
        }
    }, [blogKey]);

    useEffect(() => {
        if (blog) {
            console.log("fetched blog:", blog);
        }
    }, [blog]);

    if (!blog) return <p>Downloading data or there is no data...</p>

    return (
        <div className="blog-page">
            <SectionHeader item={blog.metadata} headerClassname="blog-header" />
            <TableOfContent articles={blog.articlesListOrderedByKeys} url={url} />
        </div>
    );
}