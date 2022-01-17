import { createContext, useContext, useState } from "react";
import { database } from "../firebase";
import { useDatabase } from "./use-database";

import {
    ref,
    set,
    push,
    child,
    //update,
    onValue,
    //remove,
    //query,
    //limitToFirst
} from "firebase/database";

const ArticleContext = createContext();

export const useArticle = () => useContext(ArticleContext);

export function ArticleProvider({ children }) {

    const { userPublicData, user } = useDatabase();

    const [article, setArticle] = useState();
    const [articleKey, setArticleKey] = useState();

    const getArticleKeyByLink = (articleLink) => {
        const articleRef = ref(database, "articles/listOrderedByLinks/" + articleLink);
        onValue(articleRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            console.log("article key:", data.key);
            setArticleKey(data.key);
          }
        });
    }

    const fetchArticle = (articleKey) => {
        const articleRef = ref(database, "articles/" + articleKey);
        onValue(articleRef, (snapshot) => {
          const data = snapshot.val();
          console.log("article object:", data);
          setArticle(data);
        });
    }

    const addArticle = (blogKey, blogTitle, article) => {
        // article: {title, description, content, link, createdAt}
    
        const newArticleKey = push(child(ref(database), "articles")).key;
    
        if (newArticleKey) {
    
          // add article to articles in database:
          // add metadata & content
          set(ref(database, "articles/" + newArticleKey + "/metadata"), {
            ...article,
            author: userPublicData.firstName + " " + userPublicData.lastName,
            userName: userPublicData.userName,
            userId: user.uid,
            blogKey: blogKey,
            blogTitle: blogTitle
          })
          .catch((error) => {
            alert(error.message);
          });
    
          // add article to articles list ordered by links
          set(ref(database, "articles/listOrderedByLinks/" + article.link), {
            title: article.title,
            key: newArticleKey,
            userId: user.uid
          })
          .catch((error) => {
            alert(error.message);
          });
    
          // add article to its blog's list ordered by keys
          set(ref(database, "blogs/" + blogKey + "/articlesListOrderedByKeys/" + newArticleKey), {
            link: article.link,
            title: article.title,
            userId: user.uid
          })
          .catch((error) => {
            alert(error.message);
          });
    
          // add article to its blog's list ordered by links
          set(ref(database, "blogs/" + blogKey + "/articlesListOrderedByLinks/" + article.link), {
            title: article.title,
            key: newArticleKey,
            userId: user.uid
          })
          .catch((error) => {
            alert(error.message);
          });
        }
    
    }

    // const updateArticle = (blogKey, articleKey, updatedArticleData) => {
  //   if (updatedArticleData) {
  //     set(ref(database, "blogs/" + blogKey + "/articles/" + articleKey), {
  //       ...updatedArticleData
  //     });
  //   } else {
  //     alert("There is no data to update... The article isn't updated.");
  //   }
  // }

      // const deleteArticle = (blogKey, articleKey) => {
  //   remove(ref(database, "blogs/" +  blogKey + "/articles/" + articleKey)).then(() => {
  //     console.log("article " + articleKey + " in blog " + blogKey + " was deleted");
  //   }).catch((error) => {
  //     console.log(error.message);
  //   });
  // }
    
    const value = {
        article,
        articleKey,
        getArticleKeyByLink,
        fetchArticle,
        addArticle,
        //deleteArticle,
        //updateArticle,
    }

    return (
        <ArticleContext.Provider value={value} >{children}</ArticleContext.Provider>
    );
}