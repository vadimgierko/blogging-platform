import { useState } from "react";
import { Link, Switch, Route, useRouteMatch } from "react-router-dom";
import UserDataFormInDashboard from "./UserDataFormInDashboard";
import UserBlogsListInDashboard from "./UserBlogsListInDashboard";
import { useAuth } from "../hooks/use-auth";

export default function Dashboard({ setBlogKeyForNewArticle, setBlogTitleForNewArticle }) {

    let {path, url} = useRouteMatch();

    //const { user } = useAuth();
    //const userId = user.uid;
    
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
                    <UserDataFormInDashboard />
                </Route>
                <Route path={`${path}/user-data`}>
                    <UserDataFormInDashboard />
                </Route>
                <Route path={`${path}/user-blogs`}>
                    <UserBlogsListInDashboard
                        setBlogKeyForNewArticle={setBlogKeyForNewArticle}
                        setBlogTitleForNewArticle={setBlogTitleForNewArticle}
                    />
                </Route>
            </Switch>
        </div>
    );
}