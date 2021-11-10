import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDatabase } from "../hooks/use-database";

export default function BloggersList() {

    const { bloggers } = useDatabase();

    const [bloggersList, setBloggersList] = useState(null);

    useEffect(() => {
        if (bloggers) {
            setBloggersList(Object.entries(bloggers));
        }
    }, [bloggers]);

    return (
        <div>
            <>
                <h1>Bloggers</h1>
                <hr />
                {
                    bloggersList ? (
                        bloggersList.map((blogger) => {
                            const bloggerId = blogger[0];
                            const bloggerData = blogger[1];
                            return (
                                <Link
                                    key={bloggerId}
                                    to={"bloggers/" + bloggerData.userName}
                                    className="d-block my-2"
                                    style={{textDecoration: "none"}}
                                >
                                    <i className="bi bi-person-circle me-2"></i>
                                    {bloggerData.firstName + " " + bloggerData.lastName + " | " + bloggerData.userName}
                                </Link>
                            );
                        })
                    ) : (
                        <p>Downloading bloggers list...</p>
                    )
                }
            </>
        </div>
    );
}