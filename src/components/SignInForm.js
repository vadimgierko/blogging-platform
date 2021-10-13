import { useState } from "react";
//import { auth } from "../config/firebaseConfig";
//import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from 'react-router-dom';

export default function SignInForm() {

    const [userSignInData, setUserSignInData] = useState({
        email: "",
        password: ""
    });

    function handleSubmit() {
        console.log(userSignInData);
        /*
        signInWithEmailAndPassword(auth, userSignInData.email, userSignInData.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                console.log(error.message);
            });
        */
    }

    return (
        <div className="container">
            <form>
                <div className="row mb-3">
                    <div className="mb-2">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="email"
                            aria-label="email"
                            onChange={(e) => setUserSignInData({...userSignInData, email: e.target.value})}
                        />
                    </div>
                    <div className="mb-2">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="password"
                            aria-label="password"
                            onChange={(e) => setUserSignInData({...userSignInData, password: e.target.value})}
                        />
                    </div>
                </div>
                <Link
                    to="/"
                    type="button"
                    className="btn btn-primary mb-3"
                    onClick={handleSubmit}
                >
                    Log in
                </Link>
            </form>
        </div>
    );
}