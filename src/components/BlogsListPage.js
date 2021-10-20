import { useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from '../firebase';
import { Link } from "react-router-dom";

export default function BlogsListPage({ setCurrentBlogLink, setCurrentBlogKey }) {

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

    function convertBlogTitleIntoLink(blogTitle) {
        return ("/" + blogTitle.replace(/ /g, "-").toLowerCase());
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
                                    <Link
                                        to={convertBlogTitleIntoLink(blog[1].title)}
                                        onClick={() => {
                                            setCurrentBlogKey(blog[0]);
                                            setCurrentBlogLink(convertBlogTitleIntoLink(blog[1].title))
                                        }}
                                    >
                                        <h3>{blog[1].title}</h3>
                                    </Link>
                                    <p><em>by {blog[1].author}</em></p>
                                    <p>{blog[1].description}</p>
                                    <hr />
                                </div>
                            )
                        }
                    </div>
                ) : getBlogsList()
            }
        </>
    );
}