import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDatabase } from "../hooks/use-database";

export default function UserDataFormInDashboard() {

    const { user, userData, updateUserData, deleteUserAccount } = useDatabase();
    
    const [currentUserData, setCurrentUserData] = useState(null);

    useEffect(() => {
        if (userData) {
            setCurrentUserData(userData);
        } else {
            setCurrentUserData(null);
        }
    }, [userData]);

    // function deleteAccount(userId) {
    //     const user = auth.currentUser;

    //     deleteUser(user).then(() => {
    //         // User deleted
    //         console.log("user", user.uid, "account was deleted");
    //         remove(ref(database, 'users/' + userId));
    //     }).catch((error) => {
    //         // An error ocurred
    //         console.log(error.message);
    //     });
    // }
    
    return (
        <>
            {
                user && currentUserData ? (
                    <form>
                        <div className="mb-2">
                            <p>Your real first name:</p>
                            <input
                                type="input"
                                className="form-control"
                                defaultValue={currentUserData ? currentUserData.firstName : null }
                                onChange={(e) => setCurrentUserData({...currentUserData, firstName: e.target.value})}
                            />
                        </div>
                        <div className="mb-2">
                            <p>Your real last name:</p>
                            <input
                                type="input"
                                className="form-control"
                                defaultValue={currentUserData ? currentUserData.lastName : null}
                                onChange={(e) => setCurrentUserData({...currentUserData, lastName: e.target.value})}
                            />
                        </div>
                        <div className="mb-2">
                            <p>Your user name:</p>
                            <input
                                type="input"
                                className="form-control"
                                defaultValue={currentUserData ? currentUserData.userName : null}
                                onChange={(e) => setCurrentUserData({...currentUserData, userName: e.target.value})}
                            />
                        </div>
                        <Link
                            to="/dashboard"
                            type="button"
                            className="btn btn-success d-block mb-3"
                            onClick={() => {
                                if (
                                    currentUserData.firstName.replace(/\s/g, '').length &&
                                    currentUserData.lastName.replace(/\s/g, '').length &&
                                    currentUserData.userName.replace(/\s/g, '').length
                                ) {
                                    updateUserData(currentUserData);
                                } else {
                                    alert("You need to complete all input fields (not only white spaces...) to update your account data!");
                                } 
                            }}
                        >Save changes</Link>
                        <Link
                            to="/dashboard"
                            type="button"
                            className="btn btn-outline-danger d-block mb-3"
                            onClick={() => {
                                // eslint-disable-next-line no-restricted-globals
                                const wantToDelete = confirm("Are you sure, you want to delete your account & your articles forever? There's no turning back... Delete account?");
                                if (wantToDelete) {
                                    //alert("Sorry, for a moment there are no delete account function in this app... Please, contact to the owner of this app to delete your account manually.");
                                    deleteUserAccount();
                                }
                            }}
                        >Delete my account</Link>
                    </form>
                ) : (
                    <div>
                        <h2>Downloading data or there is no data...</h2>
                        <Link
                            to="/dashboard"
                            type="button"
                            className="btn btn-outline-danger d-block mb-3"
                            onClick={() => {
                                // eslint-disable-next-line no-restricted-globals
                                const wantToDelete = confirm("Are you sure, you want to delete your account & your articles forever? There's no turning back... If you want to delete your account, press OK & delete your blogs & user Data at first.");
                                if (wantToDelete) {
                                    //alert("Sorry, for a moment there are no delete account function in this app... Please, contact to the owner of this app to delete your account manually.");
                                    deleteUserAccount();
                                }
                            }}
                        >Delete my account</Link>
                    </div>
                )
            }
        </>
    );
}

/*=======  EMAIL CHANGING DELETED UNTIL THERE WILL BE A FUNCTION FOR IT ======
<div className="mb-2">
    <p>Your email:</p>
    <input
        type="input"
        className="form-control"
        defaultValue={currentUserData ? currentUserData.email : null}
        onChange={(e) => setCurrentUserData({...currentUserData, email: e.target.value})}
    />
</div>
*/