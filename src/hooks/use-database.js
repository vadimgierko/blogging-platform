import { createContext, useContext, useState, useEffect } from "react";
import { firebaseAuth, database } from "../firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  //deleteUser
} from "firebase/auth";

import {
    ref,
    set,
    onValue,
    //remove
} from "firebase/database";

const DatabaseContext = createContext();

export const useDatabase = () => useContext(DatabaseContext);

export function DatabaseProvider({ children }) {

  const [user, setUser] = useState(null);
  //const [userPrivateData, setUserPrivateData] = useState();
  const [userPublicData, setUserPublicData] = useState();
  const [userBlogsList, setUserBlogsList] = useState(); // ordered by keys

  const signIn = (signInData) => {
    const email = signInData.email;
    const password = signInData.password;
    return signInWithEmailAndPassword(firebaseAuth, email, password)
      .catch((error) => {
        alert(error.message);
      });
  };

  const signUp = (signUpData) => {
    return createUserWithEmailAndPassword(firebaseAuth, signUpData.email, signUpData.password)
      .then((userCredential) => {
        // Signed in
        //setUser(userCredential.user);
        console.log("user is sign up. userCredential.user: ", userCredential.user);
        
        // create user in database:
        set(ref(database, "users/" + userCredential.user.uid), {
          privateData: {
            email: signUpData.email
          },
          publicData: {
            data: {
              firstName: signUpData.firstName,
              lastName: signUpData.lastName,
              userName: signUpData.userName
            }
          }          
        })
        .catch((error) => {
          alert(error.message);
        });

        // add user's public data into users list ordered by keys:
        set(ref(database, "users/listOrderedByKeys/" + userCredential.user.uid), {
          firstName: signUpData.firstName,
          lastName: signUpData.lastName,
          userName: signUpData.userName
        })
        .catch((error) => {
          alert(error.message);
        });

        // add user's public data into users list ordered by user name:
        set(ref(database, "users/listOrderedByUserName/" + signUpData.userName), {
          firstName: signUpData.firstName,
          lastName: signUpData.lastName,
          userId: userCredential.user.uid
        })
        .catch((error) => {
          alert(error.message);
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const logOut = async () => {
    try {
      await signOut(firebaseAuth);
    } catch (error) {
      alert(error.message);
    }
  };

  //===================== UPDATE USER DATA

  // const updateUserPublicData = (userData) => {
  //   // save prev userName val:
  //   const prevUserName = userPublicData.userName;
  //   // update user data:
  //   set(ref(database, "users/" + user.uid + "/publicData/data"), {
  //     ...userData
  //   })
  //   .catch((error) => {
  //     alert(error.message);
  //   });

  //   // update user's public data in users list ordered by keys:
  //   set(ref(database, "users/listOrderedByKeys/" + user.uid), {
  //     ...userData
  //   })
  //   .catch((error) => {
  //     alert(error.message);
  //   });

  //   // update user's public data in users list ordered by user name:
  //   if (userData.userName === prevUserName) {
  //     // if userName wasn't updated:
  //     set(ref(database, "users/listOrderedByUserName/" + prevUserName), {
  //       firstName: userData.firstName,
  //       lastName: userData.lastName,
  //       userId: user.uid
  //     })
  //     .catch((error) => {
  //       alert(error.message);
  //     });
  //   } else {
  //     // if userName was updated:
  //     // delete prev userName record:
  //     remove(ref(database, "users/listOrderedByUserName/" + prevUserName))
  //     .then(() => console.log(prevUserName, "record was deleted from database."))
  //     .catch((error) => {
  //       alert(error.message);
  //     });
  //     // set new userName record:
  //     set(ref(database, "users/listOrderedByUserName/" + userData.userName), {
  //       firstName: userData.firstName,
  //       lastName: userData.lastName,
  //       userId: user.uid
  //     })
  //     .then(() => console.log(userData.userName, "record was added to database."))
  //     .catch((error) => {
  //       alert(error.message);
  //     });
  //   }
  // };

  //==================== DELETE USER ACCOUNT  

  // THIS FUNCTION IS OFF FOR A MOMENT (delete this comment, when fix)
  // const deleteUserAccount = () => {
  //   console.log("deleteUser operations:");
  //   const userForDelete = firebaseAuth.currentUser;
  //   console.log("userForDelete:", userForDelete);
  //   const userIdForDelete = userForDelete.uid;
  //   console.log("userIdForDelete:", userIdForDelete);

  //   if (userForDelete && userIdForDelete) {
  //     // 1. delete user data first:
  //     remove(ref(database, "users/" + userForDelete.uid)).then(() => {
  //       console.log("User data of deleted user " + userIdForDelete + " was deleted...");
  //     }).catch((error) => {
  //       // An error ocurred
  //       alert(error.message);
  //     });

  //     // + delete user from two lists => [x]
      
  //     // 2. delete user blogs in for loop:
  //     // THIS WILL BE COMPLETELY ANOTHER PROCEDURE WHEN NEW RULES & DATA STRUCTURE WILL BE SET
  //     const userBlogsForDelete = Object.entries(blogs).filter(blog => blog[1].userId === userIdForDelete);
  //     console.log("userBlogsForDelete:", userBlogsForDelete);
  //     if (userBlogsForDelete && userBlogsForDelete.length) {
  //       let userBlogsKeysForDelete = [];
  //       for (let i = 0; i < userBlogsForDelete.length; i++) {
  //         const key = userBlogsForDelete[i][0];
  //         userBlogsKeysForDelete.push(key);
  //       }
  //       console.log("userBlogsKeysForDelete:", userBlogsKeysForDelete);
  //       if (userBlogsKeysForDelete && userBlogsKeysForDelete.length) {
  //         for (let n = 0; n < userBlogsKeysForDelete.length; n++) {
  //           const key = userBlogsKeysForDelete[n];
  //           remove(ref(database, "blogs/" + key)).then(() => {
  //             console.log("Blog " + key + " of deleted user " + userIdForDelete + " was deleted...");
  //             // 3. delete user in the last loop
  //             if (n === userBlogsKeysForDelete.length - 1) {
  //               // eslint-disable-next-line no-restricted-globals
  //               const confirmAccountDeletion = confirm("Your blogs & user data was deleted. Now press OK to delete your account");
  //               if (confirmAccountDeletion) {
  //                 deleteUser(userForDelete).then(() => {
  //                   console.log("User " + userIdForDelete + " was deleted.");
  //                 }).catch((error) => {
  //                   alert(error.message, "Try again to delete your account. Your blogs & user data were already deleted.");
  //                 });
  //               }
  //             }
  //           }).catch((error) => {
  //             // An error ocurred
  //             alert(error.message);
  //           });
  //         }
  //       } else {
  //         console.log("There are no user blogs to delete... So delete user.");
  //         // eslint-disable-next-line no-restricted-globals
  //         const confirmAccountDeletion = confirm("Your blogs & user data was deleted. Now press OK to delete your account");
  //         if (confirmAccountDeletion) {
  //           deleteUser(userForDelete).then(() => {
  //             console.log("User " + userIdForDelete + " was deleted.");
  //           }).catch((error) => {
  //             alert(error.message, "Try again to delete your account. Your blogs & user data were already deleted.");
  //           });
  //         }
  //       }
  //     } else {
  //       console.log("There are no user blogs to delete... So delete user.");
  //       // eslint-disable-next-line no-restricted-globals
  //       const confirmAccountDeletion = confirm("Your blogs & user data was deleted. Now press OK to delete your account");
  //       if (confirmAccountDeletion) {
  //         deleteUser(userForDelete).then(() => {
  //           console.log("User " + userIdForDelete + " was deleted.");
  //         }).catch((error) => {
  //           alert(error.message, "Try again to delete your account. Your blogs & user data were already deleted.");
  //         });
  //       }
  //     }  
  //   } else {
  //     alert("You need to be signed in to delete your account. Try again!")
  //   }
  // }

  function fetchUserBlogsList() {
    const currentUserDataRef = ref(database, "users/" + user.uid + "/publicData/blogs");
    onValue(currentUserDataRef, (snapshot) => {
      const data = snapshot.val();
      console.log("current user blogs list data object:", data);
      setUserBlogsList(data);
    });
    console.log("DATA WAS FETCHED: USER BLOGS LIST");
  }

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setUser(user);
        console.log("user logged in. user:", user);
        const userPublicDataRef = ref(database, "users/" + user.uid + "/publicData/data");
        onValue(userPublicDataRef, (snapshot) => {
          const data = snapshot.val();
          console.log("user public data:", data);
          setUserPublicData(data);
          console.log("DATA WAS FETCHED: USER PUBLIC DATA");
        });
      } else {
        setUser(null);
        setUserPublicData(null);
        console.log("user is logged out");
      }
    });
  }, []);

  const value = {
    signIn,
    signUp,
    logOut,
    user,
    userPublicData,
    userBlogsList,
    fetchUserBlogsList,
    //updateUserPublicData,
    //deleteUserAccount
  }

  return (
    <DatabaseContext.Provider value={value} >{children}</DatabaseContext.Provider>
  );
}
