import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';

export default function Header() {
    const { user, logOut } = useAuth();

    const [isNavCollapsed, setIsNavCollapsed] = useState(true);
    
    const handleNavCollapse = () => {
        setIsNavCollapsed(!isNavCollapsed);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
            <div className="container">
                <Link className="navbar-brand" to="/">Blogging Platform</Link>
                <button
                    className="navbar-toggler collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarColor01"
                    aria-controls="navbarColor01"
                    aria-expanded={isNavCollapsed ? true : false}
                    aria-label="Toggle navigation"
                    onClick={handleNavCollapse}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={`${isNavCollapsed ? "collapse" : null} navbar-collapse`} id="navbarColor01">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/" onClick={isNavCollapsed ? null : () => handleNavCollapse() }>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/blogs" onClick={isNavCollapsed ? null : () => handleNavCollapse() }>Blogs</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/bloggers" onClick={isNavCollapsed ? null : () => handleNavCollapse() }>Bloggers</Link>
                        </li>
                    </ul>
                    <div>
                        {
                            user ?
                                <>
                                    <Link
                                        to="/dashboard"
                                        className="text-light text-muted"
                                        style={{textDecoration: "none"}}
                                    >
                                        <span className="me-2"><i className="bi bi-person-circle"></i></span>
                                        <span className="me-4">{user.email}</span>
                                    </Link>
                                    <Link
                                        type="button"
                                        to="/"
                                        className={isNavCollapsed ? "btn btn-outline-danger me-2" : "btn btn-outline-danger me-2 d-block"}
                                        onClick={() => {
                                            logOut();
                                            if (!isNavCollapsed) {
                                                handleNavCollapse();
                                            }
                                        }}
                                    >Log out</Link>
                                </>
                            :
                                <>
                                    <Link
                                        type="button"
                                        to="/login"
                                        className={isNavCollapsed ? "btn btn-outline-success me-2" : "btn btn-outline-success me-2 d-block mb-3"}
                                        onClick={isNavCollapsed ? null : () => handleNavCollapse() }
                                    >Log in</Link>
                                    <Link
                                        type="button"
                                        to="/signup"
                                        className={isNavCollapsed ? "btn btn-outline-info me-2" : "btn btn-outline-info me-2 d-block"}
                                        onClick={isNavCollapsed ? null : () => handleNavCollapse() }
                                    >Create account</Link>
                                </>
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
}