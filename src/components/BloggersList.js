import { Link } from "react-router-dom";

export default function BloggersList({ bloggersList }) {
    return (
        <div>
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
                        >
                            <i className="bi bi-person-circle me-2"></i>{bloggerData.firstName + " " + bloggerData.lastName + " | " + bloggerData.userName}
                        </Link>
                    );
                })
            }
        </div>
    );
}