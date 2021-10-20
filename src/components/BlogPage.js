import { useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from '../firebase';

export default function BlogPage({ blogKey }) {

    const [blog, setBlog] = useState(null);

    function fetchBlog() {

        const blogRef = ref(database, 'blogs/' + blogKey);

        onValue(blogRef, (snapshot) => {
            if (snapshot) {

                const fetchedBlog = snapshot.val();
                
                if (fetchedBlog) {
                    setBlog(fetchedBlog);
                }
            }
        });
    }

    return (
        <div>
            {
                blog ? (
                    <div>
                        <h1>{blog.title}</h1>
                        <p>{blog.description}</p>
                        <hr />
                        {
                            blog.articles ? (
                                <div className="row">
                                    <div className="col">Here will be clicked article</div>
                                    <div className="col-4">
                                        <h5>Table of content</h5>
                                        <hr />
                                        <ul>
                                            {
                                                Object.entries(blog.articles).map((article) =>
                                                    <li key={article[0]}>{article[1].title}</li>
                                                )
                                            }
                                        </ul>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <p>There are no articles yet...</p>
                                </div>
                            )
                        }
                    </div>
                ) : fetchBlog()
            }
        </div>
    );
}