import { useEffect } from "react";
import { useDatabase } from "../../hooks/use-database";
import BloggerCard from "../molecules/BloggerCard";

export default function Bloggers() {

    const {
        //fetchUsersListOrderedByKeys,
        fetchUsersListOrderedByUserName,
        //usersListOrderedByKeys,
        usersListOrderedByUserName
    } = useDatabase();

    useEffect(() => {
        if (!usersListOrderedByUserName) {
            fetchUsersListOrderedByUserName();
        }
    }, [usersListOrderedByUserName]);

    if (!usersListOrderedByUserName) return <p>Downloading bloggers list or... there are no bloggers</p>

    return (
        <section className="bloggers-page">
            <h1>Bloggers</h1>
            <nav className="bloggers-list">
                {
                    Object.entries(usersListOrderedByUserName).map(blogger =>
                        <BloggerCard 
                            key={blogger[0]}
                            bloggerData={{...blogger[1], userName: blogger[0]}}
                        />
                    )}
            </nav>
        </section>
    );
}