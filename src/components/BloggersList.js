import { Link, useRouteMatch, Switch, Route } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import { useDatabase } from "../hooks/use-database";
import BloggerProfile from "./BloggerProfile";

export default function BloggersList() {

    let {path, url} = useRouteMatch();

    const { bloggers } = useDatabase();

    const [bloggersList, setBloggersList] = useState(null);

    useEffect(() => {
        if (bloggers) {
            setBloggersList(Object.entries(bloggers));
        }
    }, [bloggers]);

    return (
        <div>
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
                                to={url + "/" + bloggerData.userName}
                                className="d-block my-2"
                                style={{textDecoration: "none"}}
                                onClick={() => console.log("Blogger Id:", bloggerId)}
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
            <Switch>
                <Route exact path={path + "/:userName"}>
                    <BloggerProfile />
                </Route>
            </Switch>
        </div>
    );
}