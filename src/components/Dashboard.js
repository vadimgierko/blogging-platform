import { useEffect, useState } from "react";
import { database } from "../firebase";
import { ref, remove, onValue } from "firebase/database";
import { Link, Switch, Route, useRouteMatch } from "react-router-dom";
import UserDataFormInDashboard from "./UserDataFormInDashboard";
import UserBlogsListInDashboard from "./UserBlogsListInDashboard";

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
                    <Route exact path={path}>
                        <UserDataFormInDashboard userId={userId} />
                    </Route>
                    <Route path={`${path}/user-data`}>
                        <UserDataFormInDashboard userId={userId} />
                    </Route>
                    <Route path={`${path}/user-blogs`}>
                        <UserBlogsListInDashboard userId={userId} />
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