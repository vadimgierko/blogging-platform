import { useState } from "react";
import { Link } from 'react-router-dom';
import { useDatabase } from "../hooks/use-database";

export default function SignInForm() {

    const { signIn } = useDatabase();

    const [userSignInData, setUserSignInData] = useState({
        email: "",
        password: ""
    });

    return (
        <div className="container">
            <h1>Sign in!</h1>
            <hr />
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
                    to="/dashboard"
                    type="button"
                    className="btn btn-primary mb-3"
                    onClick={() => {
                        if (userSignInData.email.replace(/\s/g, '').length) {
                            if (userSignInData.password.replace(/\s/g, '').length) {
                                signIn(userSignInData.email, userSignInData.password);
                            } else {
                                alert("You need to input your password (& not only white spaces...) to log in!");
                            }
                        } else {
                            alert("You need to input your email (& not only white spaces...) to log in!");
                        }
                    }}
                >
                    Log in
                </Link>
            </form>
        </div>
    );
}