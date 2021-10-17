import { useEffect, useState } from "react";
import { database } from "../firebase";
import { ref, set, remove, onValue } from "firebase/database";
import { auth } from "../firebase";
import { deleteUser } from "firebase/auth";
import { Link, Switch, Route, useRouteMatch } from "react-router-dom";

export default function Dashboard({ userId }) {

    let {path, url} = useRouteMatch();

    const [userData, setUserData] = useState(null);
    const [userBlogsList, setUserBlogsList] = useState(null);

    function fetchUserData(userId) {
        const userDataRef = ref(database, 'users/' + userId);
        onValue(userDataRef, (snapshot) => {
            if (snapshot) {
                const fetchedUserData = snapshot.val();
                setUserData(fetchedUserData);
                setUserBlogsList(fetchedUserData.blogs ? Object.entries(fetchedUserData.blogs) : null);
                console.log("User data fetched to dashboard", fetchedUserData);
            }
        });
    }

    useEffect(() => {
        fetchUserData(userId);
    }, [userId]);

    function handleSubmit() {
        set(ref(database, 'users/' + userId), {
            ...userData
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
            }).catch((error) => {
                // An error ocurred
                console.log(error.message);
            });
            remove(ref(database, 'blogs/' + blogKey));
        }
    }
    
    if (userData) {
        return (
            <div>
                <div className="row justify-content-between">
                    <div className="col-4">
                        <h1>Dashboard</h1>
                    </div>
                    <div className="col-4 text-end">
                        <Link
                            to={`${url}/user-data`}
                            className="me-2"
                        >Your profile data</Link>
                        <span> | </span>
                        <Link
                            to={`${url}/user-blogs`}
                            className="ms-2"
                        >Your blogs</Link>
                    </div>
                </div>
                <hr />
                <Switch>
                    <Route path={`${path}/user-data`}>
                        <form>
                            <div className="mb-2">
                                <p>Your real first name:</p>
                                <input
                                    type="input"
                                    className="form-control"
                                    defaultValue={userData ? userData.firstName : null }
                                    onChange={(e) => setUserData({...userData, firstName: e.target.value})}
                                />
                            </div>
                            <div className="mb-2">
                                <p>Your real last name:</p>
                                <input
                                    type="input"
                                    className="form-control"
                                    defaultValue={userData ? userData.lastName : null}
                                    onChange={(e) => setUserData({...userData, lastName: e.target.value})}
                                />
                            </div>
                            <div className="mb-2">
                                <p>Your user name:</p>
                                <input
                                    type="input"
                                    className="form-control"
                                    defaultValue={userData ? userData.userName : null}
                                    onChange={(e) => setUserData({...userData, userName: e.target.value})}
                                />
                            </div>
                            <div className="mb-2">
                                <p>Your email:</p>
                                <input
                                    type="input"
                                    className="form-control"
                                    defaultValue={userData ? userData.email : null}
                                    onChange={(e) => setUserData({...userData, email: e.target.value})}
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
                    </Route>
                    <Route path={`${path}/user-blogs`}>
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
                    </Route>
                </Switch>
            </div>
        );
    } else {
        return (
            <div>
                <h1 className="text-center">Dashboard</h1>
                <hr />
                <p>Loading data...</p>
            </div>
        );
    }
}