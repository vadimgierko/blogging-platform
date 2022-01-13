import { useDatabase } from "../../hooks/use-database";
import BloggerCard from "../molecules/BloggerCard";

export default function Bloggers() {

    const { users } = useDatabase();

    if (!users) return <p>Downloading bloggers list or... there are no bloggers</p>

    return (
        <section className="bloggers-page">
            <h1>Bloggers</h1>
            <nav className="bloggers-list">
                {Object.entries(users).map(blogger => <BloggerCard key={blogger[0]} bloggerData={blogger[1]} />)}
            </nav>
        </section>
    );
}