import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDatabase } from "../hooks/use-database";

export default function UserDataFormInDashboard() {

    const { user, userData, updateUserData } = useDatabase();
    
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
                        <div className="mb-2">
                            <p>Your email:</p>
                            <input
                                type="input"
                                className="form-control"
                                defaultValue={currentUserData ? currentUserData.email : null}
                                onChange={(e) => setCurrentUserData({...currentUserData, email: e.target.value})}
                            />
                        </div>
                        <Link
                            to="/dashboard"
                            type="button"
                            className="btn btn-success d-block mb-3"
                            onClick={() => updateUserData(currentUserData)}
                        >Save changes</Link>
                        <Link
                            to="/"
                            type="button"
                            className="btn btn-outline-danger d-block mb-3"
                            onClick={() => {
                                // eslint-disable-next-line no-restricted-globals
                                const wantToDelete = confirm("Are you sure, you want to delete your account & your articles forever? There's no turning back... Delete account?");
                                if (wantToDelete) {
                                    //deleteAccount(userId); => CREATE DELETE USER IN USE-DATABASE !!!
                                }
                            }}
                        >Delete my account</Link>
                    </form>
                ) : (
                    <div>
                        <h2>Downloading data...</h2>
                    </div>
                )
            }
        </>
    );
}