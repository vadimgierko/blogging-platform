import { useDatabase } from "../../hooks/use-database";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogCard from "../molecules/BlogCard";

export default function Blogger() {

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
                let userBlogs = [];
                for (let i = 0; i < blogsArray.length; i++) {
                    if (blogsArray[i][1].userName === userName) {
                        userBlogs = [...userBlogs, blogsArray[i][1]]
                    }
                }
                setBloggerBlogs(userBlogs);
            }
        }
    }, [blogs, userName, blogger]);

    if (!blogger) return <p>Downloading data or ... there is no blogger of user name: {userName}</p>;

    return (
        <section className="blogger">
            <h1>{blogger.firstName + " " + blogger.lastName}</h1>
            <hr />
            <p>user name: {"@" + blogger.userName}</p>
            <p>email: {blogger.email}</p>
            <nav className="blogger-blogs">
                {
                    bloggerBlogs && bloggerBlogs.length && bloggerBlogs[0] !== null ? (
                        bloggerBlogs.map((blog) => 
                            <BlogCard key={blog.title} blog={blog} />
                        )
                    ) : (
                        <p>Downloading blogger blogs...</p>
                    )
                }
            </nav>
        </section>
    );
}