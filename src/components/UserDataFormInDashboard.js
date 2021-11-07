// import { useState, useEffect } from "react";
// import { database } from "../firebase";
// import { auth } from "../firebase";
// import { deleteUser } from "firebase/auth";
// import { ref, set, remove, onValue } from "firebase/database";
// import { Link } from "react-router-dom";

// export default function UserDataFormInDashboard({ userId }) {
    
//     const [userData, setUserData] = useState(null);

//     useEffect(() => {
//         fetchUserData(userId);
//     }, [userId]);

//     function handleSubmit() {
//         set(ref(database, 'users/' + userId), {
//             ...userData
//         }).then(() => {
//             fetchUserData(userId);
//         })
//     }

//     function deleteAccount(userId) {
//         const user = auth.currentUser;

//         deleteUser(user).then(() => {
//             // User deleted
//             console.log("user", user.uid, "account was deleted");
//             remove(ref(database, 'users/' + userId));
//         }).catch((error) => {
//             // An error ocurred
//             console.log(error.message);
//         });
//     }

//     function fetchUserData(userId) {
//         const userDataRef = ref(database, 'users/' + userId);
//         onValue(userDataRef, (snapshot) => {
//             if (snapshot) {
//                 const fetchedUserData = snapshot.val();
//                 setUserData(fetchedUserData);
//                 console.log("User data fetched to dashboard", fetchedUserData);
//             }
//         });
//     }

//     if (userData) {
//         return (
//             <form>
//                 <div className="mb-2">
//                     <p>Your real first name:</p>
//                     <input
//                         type="input"
//                         className="form-control"
//                         defaultValue={userData ? userData.firstName : null }
//                         onChange={(e) => setUserData({...userData, firstName: e.target.value})}
//                     />
//                 </div>
//                 <div className="mb-2">
//                     <p>Your real last name:</p>
//                     <input
//                         type="input"
//                         className="form-control"
//                         defaultValue={userData ? userData.lastName : null}
//                         onChange={(e) => setUserData({...userData, lastName: e.target.value})}
//                     />
//                 </div>
//                 <div className="mb-2">
//                     <p>Your user name:</p>
//                     <input
//                         type="input"
//                         className="form-control"
//                         defaultValue={userData ? userData.userName : null}
//                         onChange={(e) => setUserData({...userData, userName: e.target.value})}
//                     />
//                 </div>
//                 <div className="mb-2">
//                     <p>Your email:</p>
//                     <input
//                         type="input"
//                         className="form-control"
//                         defaultValue={userData ? userData.email : null}
//                         onChange={(e) => setUserData({...userData, email: e.target.value})}
//                     />
//                 </div>
//                 <Link
//                     to="/dashboard"
//                     type="button"
//                     className="btn btn-success d-block mb-3"
//                     onClick={handleSubmit}
//                 >Save changes</Link>
//                 <Link
//                     to="/"
//                     type="button"
//                     className="btn btn-outline-danger d-block mb-3"
//                     onClick={() => {
//                         // eslint-disable-next-line no-restricted-globals
//                         const wantToDelete = confirm("Are you sure, you want to delete your account & your articles forever? There's no turning back... Delete account?");
//                         if (wantToDelete) {
//                             deleteAccount(userId);
//                         }
//                     }}
//                 >Delete my account</Link>
//             </form>
//         );
//     } else {
//         return (
//             <h5>Downloading data...</h5>
//         );
//     }
// }