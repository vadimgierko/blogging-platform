import { Link } from "react-router-dom";

export default function TableOfContent({ articles, url }) {
    return (
        <nav className="table-of-content">
            <hr />
            <h5 className="text-center">Table of content</h5>
            <ul>
                {
                    Object.entries(articles).map((article) =>
                        <li key={article[0]}>
                            <Link
                                to={url + "/" + article[1].articleLink}
                                className="d-block"
                            >{article[1].title}</Link>
                        </li>
                    )
                }
            </ul>
        </nav>
    );
}