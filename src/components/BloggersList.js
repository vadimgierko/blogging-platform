import { Link } from "react-router-dom";

export default function BloggersList({ bloggersList, fetchBloggerData }) {
    return (
        <div>
            <h1>Bloggers</h1>
            <hr />
            {
                bloggersList.map((blogger) => {
                    const bloggerId = blogger[0];
                    const bloggerData = blogger[1];
                    return (
                        <Link
                            key={bloggerId}
                            to={"/" + bloggerData.userName}
                            className="d-block my-2"
                            style={{textDecoration: "none"}}
                            onClick={() => fetchBloggerData(bloggerId)}
                        >
                            <i className="bi bi-person-circle me-2"></i>
                            {bloggerData.firstName + " " + bloggerData.lastName + " | " + bloggerData.userName}
                        </Link>
                    );
                })
            }
        </div>
    );
}