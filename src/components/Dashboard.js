import { useState } from "react";
import { Link, Switch, Route, useRouteMatch } from "react-router-dom";
import UserDataFormInDashboard from "./UserDataFormInDashboard";
import UserBlogsListInDashboard from "./UserBlogsListInDashboard";

export default function Dashboard({ userId, setBlogKeyForNewArticle, setBlogTitleForNewArticle }) {

    let {path, url} = useRouteMatch();
    
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
                    <UserBlogsListInDashboard
                        userId={userId}
                        setBlogKeyForNewArticle={setBlogKeyForNewArticle}
                        setBlogTitleForNewArticle={setBlogTitleForNewArticle}
                    />
                </Route>
            </Switch>
        </div>
    );
}