import React, { useState } from 'react';

export default function Header() {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);
    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
            <div className="container-fluid">
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
                            <a className="nav-link active" href="#">Home
                                <span className="visually-hidden">(current)</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Blogs</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Bloggers</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">About</a>
                        </li>
                    </ul>
                    <div>
                        <button
                            type="button"
                            className={isNavCollapsed ? "btn btn-success me-2" : "btn btn-success me-2 d-block mb-3"}
                        >Log in</button>
                        <button
                            type="button"
                            className={isNavCollapsed ? "btn btn-info me-2" : "btn btn-info me-2 d-block"}
                        >Create account</button>
                    </div>
                </div>
            </div>
        </nav>
    );
}