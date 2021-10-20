import { useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from '../firebase';

export default function BlogsListPage() {

    const [blogsList, setBlogsList] = useState(null);

    function getBlogsList() {
        const blogsListRef = ref(database, 'blogs/');
        onValue(blogsListRef, (snapshot) => {
            if (snapshot) {
              const blogsListObject = snapshot.val();
              //console.log(bloggersListObject);
              if (blogsListObject) {
                const blogsListArray = Object.entries(blogsListObject);
                setBlogsList(blogsListArray);
              } else {
                setBlogsList([]);
              }
            }
        });
    }

    return (
        <>
            {
                blogsList ? (
                    <div>
                        <h1>Blogs</h1>
                        <hr />
                        {
                            blogsList.map((blog) => 
                                <div key={blog[0]}>
                                    <h3>{blog[1].title}</h3>
                                    <p><em>by {blog[1].author}</em></p>
                                    <p>{blog[1].description}</p>
                                    <hr />
                                    <p>Articles:</p>
                                    {
                                        blog[1].articles ? (
                                            Object.entries(blog[1].articles).map((article) => (
                                                <div key={article[0]}>
                                                    <h5>{article[1].title}</h5>
                                                    <p>{article[1].description}</p>
                                                    <hr />
                                                </div>
                                            ))
                                        ) : (
                                            null
                                        )
                                    }
                                </div>
                            )
                        }
                    </div>
                ) : getBlogsList()
            }
        </>
    );
}