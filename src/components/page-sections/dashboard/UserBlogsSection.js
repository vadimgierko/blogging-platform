import { useDatabase } from "../../../hooks/use-database";
import { Link, Switch, Route, useRouteMatch } from "react-router-dom";
import BlogEditionSection from "./BlogEditionSection";
import LinkButton from "../../atoms/LinkButton";

export default function UserBlogsSection() {

    let {path, url} = useRouteMatch();

    const { userBlogsList, deleteBlog } = useDatabase();

    return (
        <div className="user-blogs-section-in-dashboard">
            <Switch>
                <Route exact path={path}>
                    <div>
                        <LinkButton
                            to="/create-blog"
                            style="info mb-3"
                            text="create new blog"
                        />
                        {
                            userBlogsList ?
                                Object.entries(userBlogsList).map((blog) =>
                                    <div key={blog[0]}>
                                        <div className="row">
                                            <div className="col">
                                                <Link
                                                    to={url + "/" + blog[1].blogLink}
                                                >
                                                    <h5>{blog[1].title}</h5>
                                                </Link>
                                            </div>
                                            <div className="col-4 text-end">
                                                <Link
                                                    to={"/create-article/" + blog[0] + "/" + blog[1].title}
                                                    className="text-info"
                                                >
                                                    <i className="bi bi-plus-square me-2" />
                                                </Link>
                                                <Link
                                                    className="text-primary"
                                                    to={`/blogs/${blog[1].blogLink}`}
                                                >
                                                    <i className="bi bi-eye me-2" />
                                                </Link>
                                                <Link
                                                    className="text-danger"
                                                    to="/dashboard/user-blogs"
                                                    onClick={() => {
                                                        // eslint-disable-next-line no-restricted-globals
                                                        const wantToDeleteBlog = confirm("Are you sure, you want to delete this blog & all articles from this blog forever? There's no turning back... Delete blog?");
                                                        if (wantToDeleteBlog) {
                                                            deleteBlog(blog[0]);
                                                        }
                                                    }}
                                                >
                                                    <i className="bi bi-trash" />
                                                </Link>
                                            </div>
                                            
                                        </div>
                                        <hr />
                                    </div>
                                )
                            :
                                <div>
                                    <h5 className="text-center">There are no blogs yet... Create one!</h5>
                                </div>
                        }
                    </div>
                </Route>
                <Route path={path + "/:blogLink"}>
                    <BlogEditionSection />
                </Route>
            </Switch>
        </div>
    );
}