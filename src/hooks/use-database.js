//import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

import { createContext, useContext, useState, useEffect } from "react";
import { firebaseAuth, database } from "../firebase"; // + , storage

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

import {
    ref,
    set,
    push,
    child,
    update,
    onValue,
    remove
} from "firebase/database";

const DatabaseContext = createContext();

export const useDatabase = () => useContext(DatabaseContext);

export function DatabaseProvider({ children }) {

  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [blogs, setBlogs] = useState(null);
  const [bloggers, setBloggers] = useState(null);

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        // Signed in
        setUser(userCredential.user);
        console.log("user is signed in");
        return userCredential.user;
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        // Signed in
        setUser(userCredential.user);
        console.log("user is sign up");
        return userCredential.user;
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const logOut = () => {
    return signOut(firebaseAuth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  
  const updateUserData = (userData) => {
    set(ref(database, "users/" + user.uid), {
      ...userData
    });
  };

  const addBlog = (blogData) => {

    const newBlogKey = push(child(ref(database), "blogs")).key;

    if (newBlogKey) {
      set(ref(database, "blogs/" + newBlogKey), {
        ...blogData,
        author: userData.firstName + " " + userData.lastName,
        userName: userData.userName,
        userId: user.uid,
      });
    }
  }

  const deleteBlog = (blogKey) => {
    remove(ref(database, "blogs/" +  blogKey)).then(() => {
      console.log("blog " + blogKey + " was deleted");
    }).catch((error) => {
      // An error ocurred
      console.log(error.message);
    });
  }

  const updateBlog = (blogKey, updatedBlogData) => {
    set(ref(database, "blogs/" + blogKey), {
      ...updatedBlogData
    });
  };

  const addArticle = (blogKey, blogTitle, article) => {

    const newArticleKey = push(child(ref(database), "blogs/" + blogKey + "/articles/")).key;

    if (newArticleKey) {
      set(ref(database, "blogs/" + blogKey + "/articles/" + newArticleKey), {
        ...article,
        author: userData.firstName + " " + userData.lastName,
        userName: userData.userName,
        userId: user.uid,
        blogKey: blogKey,
        blogTitle: blogTitle
      });
    }
  }

  const updateArticle = (blogKey, articleKey, updatedArticleData) => {
    if (updatedArticleData) {
      set(ref(database, "blogs/" + blogKey + "/articles/" + articleKey), {
        ...updatedArticleData
      });
    } else {
      alert("There is no data to update... The article isn't updated.");
    }
  }

  const deleteArticle = (blogKey, articleKey) => {
    remove(ref(database, "blogs/" +  blogKey + "/articles/" + articleKey)).then(() => {
      console.log("article " + articleKey + " in blog " + blogKey + " was deleted");
    }).catch((error) => {
      console.log(error.message);
    });
  }

  //   const getProfileImageURL = (profileImageRef) => {
  //     // get profile img url to users data:
  //     getDownloadURL(storageRef(storage, profileImageRef))
  //     .then((url) => {
  //       updateUserData({...userData, profileImageURL: url})
  //     })
  //     .catch((error) => {
  //       console.log(error.message);
  //     });
  //   }

  //   const uploadProfileImage = (image) => {
  //     // Create a reference to 'profileImage.jpg'
  //     const profileImageRef = storageRef(storage, `images/profileImages/${user.uid}/profileImg.png`);

  //     uploadBytes(profileImageRef, image).then((snapshot) => {
  //         if (snapshot) {
  //           getProfileImageURL(profileImageRef);
  //         } else {
  //           console.log("file is not uploaded yet...")
  //         }
  //     });
  //   };

  //   const getItemImageURL = (itemImageRef, itemKey, item) => {
  //     getDownloadURL(storageRef(storage, itemImageRef))
  //     .then((url) => {
  //       console.log("img url", url);
  //       const updatedItem = {
  //         ...item,
  //         itemImageURL: url
  //       }
  //       updateItem(updatedItem, itemKey);
  //     })
  //     .catch((error) => {
  //       console.log(error.message);
  //     });
  //   }

  //   const uploadItemImage = (image, itemKey, item) => {
  //     const itemImageRef = storageRef(storage, `images/itemsImages/${user.uid}/${itemKey}/itemImg.png`);

  //     uploadBytes(itemImageRef, image).then((snapshot) => {
  //         if (snapshot) {
  //           getItemImageURL(itemImageRef, itemKey, item);
  //         } else {
  //           console.log("file is not uploaded yet...")
  //         }
  //     });
  //   }

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setUser(user);

        const userDataRef = ref(database, `users/${user.uid}`);
        onValue(userDataRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setUserData(data);
            } else {
                console.log("there are no user data...");
            }
        });
      } else {
        setUser(null);
        setUserData(null);
        console.log("user is logged out");
      }
    });
  }, []);

  // fetch blogs & bloggers list every time, regardless of whether the user is logged or not:
  useEffect(() => {

    //fetch blogs list
    const blogsRef = ref(database, "blogs/");
    onValue(blogsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setBlogs(data);
        //console.log("blogs:", data)
      } else {
        console.log("there are no blogs");
      }
    });

    //fetch bloggers list
    const bloggersRef = ref(database, `users/`);
    onValue(bloggersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setBloggers(data);
        //console.log("bloggers:", data)
      } else {
        console.log("there are no bloggers...");
      }
    });
  }, []);

  const value = {
    signIn,
    signUp,
    logOut,
    user,
    userData,
    updateUserData,
    blogs,
    deleteBlog,
    bloggers,
    addBlog,
    updateBlog,
    addArticle,
    deleteArticle,
    updateArticle,
    //uploadProfileImage,
    //uploadItemImage
  }

  return (
    <DatabaseContext.Provider value={value} >{children}</DatabaseContext.Provider>
  );
}
