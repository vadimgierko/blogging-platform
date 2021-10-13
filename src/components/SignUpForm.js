import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from 'react-router-dom';

export default function SignUpForm() {

    const [userSignUpData, setUserSignUpData] = useState({
        email: "",
        password: ""
    });

    function handleSubmit() {
        console.log(userSignUpData);
        
        createUserWithEmailAndPassword(auth, userSignUpData.email, userSignUpData.password)
            .then((userCredential) => {
                console.log(userCredential);
            })
            .catch((error) => {
                console.log(error.code);
                console.log(error.message);
            });
        
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
                </div>
                <Link
                    to="/"
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