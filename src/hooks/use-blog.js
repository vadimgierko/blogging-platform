import { createContext, useContext, useState, useEffect } from "react";
import { database } from "../firebase";
import { useDatabase } from "./use-database";

import {
    ref,
    set,
    push,
    child,
    //update,
    onValue,
    remove,
    query,
    limitToFirst
} from "firebase/database";

const BlogContext = createContext();

export const useBlog = () => useContext(BlogContext);

export function BlogProvider({ children }) {

    const { userPublicData, user } = useDatabase();

    const [blog, setBlog] = useState();
    const [blogKey, setBlogKey] = useState();

    const getBlogKeyByLink = (blogLink) => {
        const blogRef = ref(database, "blogs/listOrderedByLinks/" + blogLink);
        onValue(blogRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            console.log("blog key:", data.key);
            setBlogKey(data.key);
          }
        });
    }

    const fetchBlog = (blogKey) => {
        const blogRef = ref(database, "blogs/" + blogKey);
        onValue(blogRef, (snapshot) => {
          const data = snapshot.val();
          console.log("blog object:", data);
          setBlog(data);
        });
    }

    const addBlog = (blogData) => { // blogData consists title, description & link

        const newBlogKey = push(child(ref(database), "blogs")).key;
    
        if (newBlogKey) {
    
          // add blog to blogs in database:
          set(ref(database, "blogs/" + newBlogKey + "/metadata"), {
            author: userPublicData.firstName + " " + userPublicData.lastName,
            userName: userPublicData.userName,
            userId: user.uid,
            ...blogData
          })
          .catch((error) => {
            alert(error.message);
          });
    
          // add blog to user blogs list:
          set(ref(database, "users/" + user.uid + "/publicData/blogs/" + newBlogKey), {
            title: blogData.title,
            link: blogData.link
          })
          .catch((error) => {
            alert(error.message);
          });
    
          // add blog to blogs list ordered by keys:
          set(ref(database, "blogs/listOrderedByKeys/" + newBlogKey), {
            author: userPublicData.firstName + " " + userPublicData.lastName,
            userName: userPublicData.userName,
            userId: user.uid, // remember about userId, because only then rules will allow the user add smth !!!
            ...blogData
          })
          .catch((error) => {
            alert(error.message);
          });
          
          // add blog to blogs list ordered by links:
          set(ref(database, "blogs/listOrderedByLinks/" + blogData.link), {
            userId: user.uid,
            title: blogData.title,
            key: newBlogKey
          })
          .catch((error) => {
            alert(error.message);
          });
        }
    }

    // const updateBlog = (blogKey, updatedBlogData) => {
  //   set(ref(database, "blogs/" + blogKey), {
  //     ...updatedBlogData
  //   });
  // };

    // const deleteBlog = (blogKey) => {
  //   remove(ref(database, "blogs/" +  blogKey)).then(() => {
  //     console.log("blog " + blogKey + " was deleted");
  //   }).catch((error) => {
  //     // An error ocurred
  //     console.log(error.message);
  //   });
  // }

    const value = {
        blog,
        blogKey,
        getBlogKeyByLink,
        fetchBlog,
        addBlog,
        //updateBlog,
        //deleteBlog,
    }

    return (
        <BlogContext.Provider value={value} >{children}</BlogContext.Provider>
      );
}