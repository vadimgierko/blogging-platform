import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavLink from "../atoms/NavLink";
import LinkButton from "../atoms/LinkButton";

const NAVLINKS = [
	{
		to: "/",
		text: "About",
	},
	{
		to: "/blogs",
		text: "Blogs",
	},
	{
		to: "/bloggers",
		text: "Bloggers",
	},
];

const PUBLIC_LINK_BUTTONS = [
	{
		to: "/login",
		text: "Sign In",
		style: "success",
	},
	{
		to: "/signup",
		text: "Create Account",
		style: "info",
	},
];

const PRIVATE_LINK_BUTTONS = [
	{
		to: "/",
		text: "Log Out",
		style: "danger",
	},
];

export default function Header({ userFirstName, userLastName, logOut }) {
	const [isNavCollapsed, setIsNavCollapsed] = useState(true);

	const handleNavCollapse = () => {
		setIsNavCollapsed(!isNavCollapsed);
	};

	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
			<div className="container">
				<Link className="navbar-brand" to="/">
					Blogging Platform
				</Link>
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

				<div
					className={`${isNavCollapsed ? "collapse" : null} navbar-collapse`}
					id="navbarColor01"
				>
					<ul className="navbar-nav me-auto">
						{NAVLINKS.map((navLink, i) => (
							<li key={"nav-item-" + i} className="nav-item">
								<NavLink
									to={navLink.to}
									onClick={() => {
										if (!isNavCollapsed) {
											handleNavCollapse();
										}
									}}
									text={navLink.text}
								/>
							</li>
						))}
					</ul>
					<div>
						{userFirstName ? (
							<>
								<Link
									to="/dashboard"
									className="text-light text-muted"
									style={{ textDecoration: "none" }}
									onClick={() => {
										if (!isNavCollapsed) {
											handleNavCollapse();
										}
									}}
								>
									<span className="me-2">
										<i className="bi bi-person-circle"></i>
									</span>
									<span className="me-3">
										{userFirstName} {userLastName}
									</span>
								</Link>
								{PRIVATE_LINK_BUTTONS.map((btn, i) => (
									<LinkButton
										key={"private-link-btn-" + i}
										to={btn.to}
										text={btn.text}
										style={btn.style}
										isCollapsed={isNavCollapsed}
										onClick={() => {
											logOut();
											if (!isNavCollapsed) {
												handleNavCollapse();
											}
										}}
									/>
								))}
							</>
						) : (
							<>
								{PUBLIC_LINK_BUTTONS.map((btn, i) => (
									<LinkButton
										key={"public-link-btn-" + i}
										to={btn.to}
										text={btn.text}
										style={btn.style}
										isCollapsed={isNavCollapsed}
										onClick={isNavCollapsed ? null : () => handleNavCollapse()}
									/>
								))}
							</>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
}
