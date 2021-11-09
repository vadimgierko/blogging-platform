import { useDatabase } from "../hooks/use-database";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function BloggerProfile() {

    const { userName } = useParams();

    const { blogs, bloggers } = useDatabase();

    const [blogger, setBlogger] = useState(null);
    const [bloggerBlogs, setBloggerBlogs] = useState(null);

    useEffect(() => {
        if (bloggers) {
            if (userName) {
                const bloggersArray = Object.entries(bloggers);
                bloggersArray.map((blogger) => 
                    blogger[1].userName === userName ? setBlogger({...blogger[1]}) : null
                )
            }
        }
    }, [bloggers, userName]);

    useEffect(() => {
        if (blogs) {
            if (blogger && userName) {
                const blogsArray = Object.entries(blogs);
                const userBlogs = blogsArray.map((blog) => {
                    if (blog[1].userName === userName) {
                        return {...blog[1]};
                    }
                    return null;
                });
                setBloggerBlogs(userBlogs);
            }
        }
    }, [blogs, userName, blogger]);

    return (
        <>
            {
                blogger ? (
                    <>
                        <h1>{blogger.firstName + " " + blogger.lastName}</h1>
                        <hr />
                        <p>user name: {"@" + blogger.userName}</p>
                        <p>email: {blogger.email}</p>
                        <hr />
                        <h3>{blogger.firstName + " " + blogger.lastName}'s blogs:</h3>
                        <ul>
                            {
                                bloggerBlogs && bloggerBlogs.length && bloggerBlogs[0] !== null ? (
                                    bloggerBlogs.map((blog) => 
                                        <ul key={blog.blogLink}>
                                            <Link to={`/blogs/${blog.blogLink}`}>{blog.title}</Link>
                                        </ul>
                                    )
                                ) : (
                                    <p>Downloading blogger blogs...</p>
                                )
                            }
                        </ul>
                    </>
                ) : (
                    <>
                        <p>Downloading data or ... there is no blogger of user name: {userName}</p>
                    </>
                )
            }
        </>
    );
}