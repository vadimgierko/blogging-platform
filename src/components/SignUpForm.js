import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { database } from "../firebase";
import { ref, set } from "firebase/database";
import { Link } from 'react-router-dom';

export default function SignUpForm() {

    const [userSignUpData, setUserSignUpData] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: ""
    });

    function handleSubmit() {
        console.log(userSignUpData);
        
        createUserWithEmailAndPassword(auth, userSignUpData.email, userSignUpData.password)
            .then((userCredential) => {
                console.log(userCredential);
                const user = userCredential.user;
                const userId = user.uid;
                // create user folder in database and pass initial data:
                set(ref(database, 'users/' + userId), {
                    firstName: userSignUpData.firstName,
                    lastName: userSignUpData.lastName,
                    userName: userSignUpData.userName,
                    email: userSignUpData.email,
                });
            })
            .catch((error) => {
                console.log(error.code);
                console.log(error.message);
            });
        
    }

    return (
        <div className="container">
            <form>
                <div className="mb-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Your real first name"
                        onChange={(e) => setUserSignUpData({...userSignUpData, firstName: e.target.value})}
                    />
                </div>
                <div className="mb-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Your real last name"
                        onChange={(e) => setUserSignUpData({...userSignUpData, lastName: e.target.value})}
                    />
                </div>
                <div className="mb-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="user name (lower case letters only!)"
                        onChange={(e) => setUserSignUpData({...userSignUpData, userName: e.target.value.toLowerCase()})}
                    />
                </div>
                <div className="mb-2">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="email"
                        aria-label="email"
                        onChange={(e) => setUserSignUpData({...userSignUpData, email: e.target.value})}
                    />
                </div>
                <div className="mb-2">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="password"
                        aria-label="password"
                        onChange={(e) => setUserSignUpData({...userSignUpData, password: e.target.value})}
                    />
                </div>
                
                <Link
                    to={`/${userSignUpData.userName}`}
                    type="button"
                    className="btn btn-primary mb-3"
                    onClick={handleSubmit}
                >
                    Create account
                </Link>
            </form>
        </div>
    );
}