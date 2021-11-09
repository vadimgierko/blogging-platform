//import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

import { createContext, useContext, useState, useEffect } from "react";
import { firebaseAuth, database } from "../firebase"; // + , storage
import { onAuthStateChanged } from "firebase/auth";

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
    //const [items, setItems] = useState(null);
    //const [userItems, setUserItems] = useState(null);

    //   const addItem = (item) => {
    //     if (user) {
    //       const newItem = {
    //         ...item,
    //         userId: user.uid
    //       };

    //       const newItemKey = push(child(ref(database), "items")).key;

    //       const updates = {};
    //       updates["/items/" + user.uid + "/" + newItemKey] = newItem;

    //       return update(ref(database), updates);
    //     }
    //   };

    //   const updateItem = (updatedItem, itemKey) => {
    //     set(ref(database, "items/" + user.uid + "/" + itemKey), {
    //       ...updatedItem
    //     });
    //   };

    //   const deleteItem = (itemKey) => {
    //     remove(ref(database, "/items/" + user.uid + "/" + itemKey));
    //   };
    const deleteBlog = (blogKey) => {
        remove(ref(database, "blogs/" +  blogKey)).then(() => {
                console.log("blog " + blogKey + " was deleted");
            }).catch((error) => {
                // An error ocurred
                console.log(error.message);
            });
    }

    const updateUserData = (userData) => {
        set(ref(database, "users/" + user.uid), {
            ...userData
        });
    };

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
        const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
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

                //fetch blogs list
                const blogsRef = ref(database, "blogs/");
                onValue(blogsRef, (snapshot) => {
                  const data = snapshot.val();
                  if (data) {
                    setBlogs(data);
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
                  } else {
                    console.log("there are no bloggers...");
                  }
                });

                

                // // fetch all items
                // const itemsRef = ref(database, "items/");
                // onValue(itemsRef, (snapshot) => {
                //   const data = snapshot.val();
                //   if (data) {
                //     setItems(data);
                //   } else {
                //     console.log("there are no items");
                //   }
                // });
                // // fetch user items after log in
                // const userItemsRef = ref(database, "items/" + user.uid);
                // onValue(userItemsRef, (snapshot) => {
                //   const data = snapshot.val();
                //   if (data) {
                //     setUserItems(data);
                //   } else {
                //     console.log("there are no items");
                //   }
                // });
            } else {
                setUser(null);
                setUserData(null);

                //fetch blogs list
                const blogsRef = ref(database, "blogs/");
                onValue(blogsRef, (snapshot) => {
                  const data = snapshot.val();
                  if (data) {
                    setBlogs(data);
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
                  } else {
                    console.log("there are no bloggers...");
                  }
                });

                //setUserItems(null);

                // //fetch users list
                // const usersRef = ref(database, `users/`);
                // onValue(usersRef, (snapshot) => {
                //   const data = snapshot.val();
                //   if (data) {
                //     setUsers(data);
                //   } else {
                //     console.log("there are no users...");
                //   }
                // });
                // // fetch all items
                // const itemsRef = ref(database, "items/");
                // onValue(itemsRef, (snapshot) => {
                //   const data = snapshot.val();
                //   if (data) {
                //     setItems(data);
                //   } else {
                //     console.log("there are no items");
                //   }
                // });
                console.log("user is logged out");
            }
        });
        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    return (
        <DatabaseContext.Provider
            value={{
                user,
                userData,
                updateUserData,
                blogs,
                deleteBlog,
                bloggers,
                //items,
                //userItems,
                //addItem,
                //updateItem,
                //deleteItem,
                
                //uploadProfileImage,
                //uploadItemImage
            }}
        >
            {children}
        </DatabaseContext.Provider>
    );
}
