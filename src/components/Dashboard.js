import { Link, Switch, Route, useRouteMatch } from "react-router-dom";
import UserDataFormInDashboard from "./UserDataFormInDashboard";
import UserBlogsListInDashboard from "./UserBlogsListInDashboard";

export default function Dashboard() {

    let {path} = useRouteMatch();
    
    return (
        <div>
            <div className="text-center">
                <Link
                    to={`/dashboard/user-data`}
                    className="me-2"
                >Your profile data</Link>
                <span> | </span>
                <Link
                    to={`/dashboard/user-blogs`}
                    className="ms-2"
                >Your blogs</Link>
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
                    <UserBlogsListInDashboard />
                </Route>
            </Switch>
        </div>
    );
}