import { useState } from "react";
import { database } from "../firebase";
import { ref, set, remove } from "firebase/database";
import { auth } from "../firebase";
import { deleteUser } from "firebase/auth";
import { Link } from "react-router-dom";

export default function Dashboard({ userId, userData, fetchUserData }) {

    const [data, setData] = useState(userData);
    const [blogsList, setBlogsList] = useState(userData.blogs ? Object.entries(userData.blogs) : null);

    function handleSubmit() {
        set(ref(database, 'users/' + userId), {
            ...data
        }).then(() => {
            fetchUserData(userId);
        })
    }

    function deleteAccount(userId) {
        const user = auth.currentUser;

        deleteUser(user).then(() => {
            // User deleted
            console.log("user", user.uid, "account was deleted");
            remove(ref(database, 'users/' + userId));
        }).catch((error) => {
            // An error ocurred
            console.log(error.message);
        });
    }

    function deleteBlog(blogKey) {
        // eslint-disable-next-line no-restricted-globals
        const wantToDeleteBlog = confirm("Are you sure, you want to delete this blog & all articles from this blog forever? There's no turning back... Delete blog?");
        if (wantToDeleteBlog) {
            remove(ref(database, 'users/' + userId + '/blogs/' + blogKey)).then(() => {
                console.log("blog was deleted");
                fetchUserData(userId);
                let updatedBlogsList = [];
                for (let i = 0; i < blogsList.length; i++) {
                    if (blogKey !== blogsList[i][0]) {
                        updatedBlogsList.push(blogsList[i]);
                    }
                }
                setBlogsList(updatedBlogsList);
            }).catch((error) => {
                // An error ocurred
                console.log(error.message);
            });
            remove(ref(database, 'blogs/' + blogKey));
        }
    }
    
    return (
        <div>
            <h1 className="text-center">Dashboard</h1>
            <hr />
            
            <div className="row">
                {/** DATA SETTINGS */}
                <div className="col-lg">
                    <h5 className="text-center">Your profile data</h5>
                    <hr />
                    <form>
                        <div className="mb-2">
                            <p>Your real first name:</p>
                            <input
                                type="input"
                                className="form-control"
                                defaultValue={data ? data.firstName : null }
                                onChange={(e) => setData({...data, firstName: e.target.value})}
                            />
                        </div>
                        <div className="mb-2">
                            <p>Your real last name:</p>
                            <input
                                type="input"
                                className="form-control"
                                defaultValue={data ? data.lastName : null}
                                onChange={(e) => setData({...data, lastName: e.target.value})}
                            />
                        </div>
                        <div className="mb-2">
                            <p>Your user name:</p>
                            <input
                                type="input"
                                className="form-control"
                                defaultValue={data ? data.userName : null}
                                onChange={(e) => setData({...data, userName: e.target.value})}
                            />
                        </div>
                        <div className="mb-2">
                            <p>Your email:</p>
                            <input
                                type="input"
                                className="form-control"
                                defaultValue={data ? data.email : null}
                                onChange={(e) => setData({...data, email: e.target.value})}
                            />
                        </div>
                        <Link
                            to="/dashboard"
                            type="button"
                            className="btn btn-success d-block mb-3"
                            onClick={handleSubmit}
                        >Save changes</Link>
                        <Link
                            to="/"
                            type="button"
                            className="btn btn-outline-danger d-block mb-3"
                            onClick={() => {
                                // eslint-disable-next-line no-restricted-globals
                                const wantToDelete = confirm("Are you sure, you want to delete your account & your articles forever? There's no turning back... Delete account?");
                                if (wantToDelete) {
                                    deleteAccount(userId);
                                }
                            }}
                        >Delete my account</Link>
                    </form>
                </div>
                {/** BLOGS SETTINGS */}
                <div className="col-lg">
                    <h5 className="text-center">Your blogs</h5>
                    <hr />
                    <Link
                        to="/create-blog"
                        type="button"
                        className="btn btn-info d-block my-3"
                    >Create new blog</Link>
                    {
                        blogsList && blogsList.length ?
                            blogsList.map((blog) =>
                                <div className="container" key={blog[0]}>
                                    <div className="row">
                                        <div className="col"><h5>{blog[1].title}</h5></div>
                                        <div className="col-4 text-end">
                                            <Link><i className="bi bi-eye me-2" /></Link>
                                            <Link><i className="bi bi-pencil me-2" /></Link>
                                            <Link><i className="bi bi-plus-square me-2" /></Link>
                                            <Link
                                                className="text-danger"
                                                to="/dashboard"
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
            </div>
        </div>
    );
}