import { useState } from "react";
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';

export default function SignUpForm() {

    const { signUp } = useAuth();

    const [userSignUpData, setUserSignUpData] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: ""
    });

    return (
        <div className="container">
            <form>
                <h1>Create account!</h1>
                <hr />
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
                    onClick={() => signUp(userSignUpData.email, userSignUpData.password)}
                >
                    Create account
                </Link>
            </form>
        </div>
    );
}