import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);
    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
            <div className="container">
                <a className="navbar-brand" href="#">Blogging Platform</a>
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
                            <Link className="nav-link active" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/blogs">Blogs</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/bloggers">Bloggers</Link>
                        </li>
                    </ul>
                    <div>
                        <Link
                            type="button"
                            to="/login"
                            className={isNavCollapsed ? "btn btn-success me-2" : "btn btn-success me-2 d-block mb-3"}
                        >Log in</Link>
                        <Link
                            type="button"
                            to="/signup"
                            className={isNavCollapsed ? "btn btn-info me-2" : "btn btn-info me-2 d-block"}
                        >Create account</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}