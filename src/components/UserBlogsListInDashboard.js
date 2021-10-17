import { useState, useEffect } from "react";
import { database } from "../firebase";
import { ref, remove, onValue } from "firebase/database";
import { Link } from "react-router-dom";

export default function UserBlogsListInDashboard({ userId }) {

    const [userBlogsList, setUserBlogsList] = useState(null);

    function fetchUserBlogsList(userId) {
        const userBlogsRef = ref(database, 'users/' + userId + '/blogs');
        onValue(userBlogsRef, (snapshot) => {
            if (snapshot) {
                const fetchedUserBlogsList = snapshot.val();        
                setUserBlogsList(fetchedUserBlogsList ? Object.entries(fetchedUserBlogsList) : null);
                console.log("User blogs list fetched to dashboard", fetchedUserBlogsList);
            }
        });
    }

    function deleteBlog(blogKey) {
        // eslint-disable-next-line no-restricted-globals
        const wantToDeleteBlog = confirm("Are you sure, you want to delete this blog & all articles from this blog forever? There's no turning back... Delete blog?");
        if (wantToDeleteBlog) {
            remove(ref(database, 'users/' + userId + '/blogs/' + blogKey)).then(() => {
                console.log("blog was deleted");
                fetchUserBlogsList(userId);
            }).catch((error) => {
                // An error ocurred
                console.log(error.message);
            });
            remove(ref(database, 'blogs/' + blogKey));
        }
    }

    useEffect(() => {
        fetchUserBlogsList(userId);
    }, [userId]);

    return (
        <div>
            <Link
                to="/create-blog"
                type="button"
                className="btn btn-info d-block my-3"
            >Create new blog</Link>
            {
                userBlogsList && userBlogsList.length ?
                    userBlogsList.map((blog) =>
                        <div className="container" key={blog[0]}>
                            <div className="row">
                                <div className="col">
                                    <Link
                                        to={"/dashboard/user-blogs/" + blog[0]}
                                    >
                                        <h5>{blog[1].title}</h5>
                                    </Link>
                                </div>
                                <div className="col-4 text-end">
                                    <Link><i className="bi bi-eye me-2" /></Link>
                                    <Link><i className="bi bi-pencil me-2" /></Link>
                                    <Link><i className="bi bi-plus-square me-2" /></Link>
                                    <Link
                                        className="text-danger"
                                        to="/dashboard/user-blogs"
                                        onClick={() => {
                                            deleteBlog(blog[0]);
                                        }}
                                    >
                                        <i className="bi bi-trash" />
                                    </Link>
                                </div>
                                
                            </div>
                            <p>{blog[1].description}</p>
                            <hr />
                        </div>
                    )
                :
                    <div>
                        <h5 className="text-center">There is no blogs yet... Create one!</h5>
                    </div>
            }
        </div>
    );
}