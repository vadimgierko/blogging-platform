import "./App.css";
import { Switch, Route } from "react-router-dom";
import Header from "./components/organisms/Header";
import Blogs from "./components/pages/Blogs";
import Blog from "./components/pages/Blog";
import Dashboard from "./components/pages/Dashboard";
import Bloggers from "./components/pages/Bloggers";
import CreateBlog from "./components/pages/CreateBlog";
import CreateArticle from "./components/pages/CreateArticle";
import Footer from "./components/organisms/Footer";
import Blogger from "./components/pages/Blogger";
import { useDatabase } from "./hooks/use-database";
import { useEffect, useState } from "react";
import Article from "./components/pages/Article";
import SignIn from "./components/pages/SignIn";
import SignUp from "./components/pages/SignUp";
import About from "./components/pages/About";
import UpdateArticle from "./components/pages/UpdateArticle";

export default function App() {
	const [userId, setUserId] = useState(null);

	const { user, userPublicData, logOut } = useDatabase();

	useEffect(() => {
		if (user) {
			setUserId(user.uid);
		} else {
			setUserId(null);
		}
	}, [user]);

	return (
		<div className="App">
			<Header
				userFirstName={user && userPublicData ? userPublicData.firstName : null}
				userLastName={user && userPublicData ? userPublicData.lastName : null}
				logOut={logOut}
			/>
			<main className="container" style={{ marginTop: 120 }}>
				<Switch>
					<Route exact path="/">
						<About />
					</Route>
					<Route path="/login">
						<SignIn />
					</Route>
					<Route path="/signup">
						<SignUp />
					</Route>
					<Route path="/dashboard">
						<Dashboard userId={userId} />
					</Route>
					<Route path="/blogs/:blogLink/:articleLink">
						<Article />
					</Route>
					<Route path="/blogs/:blogLink">
						<Blog />
					</Route>
					<Route path="/blogs">
						<Blogs />
					</Route>
					<Route path="/bloggers/:userName">
						<Blogger />
					</Route>
					<Route path="/bloggers">
						<Bloggers />
					</Route>
					<Route path="/create-blog">
						<CreateBlog />
					</Route>
					<Route path="/create-article/:blogKey/:blogTitle">
						<CreateArticle />
					</Route>
					<Route path="/edit-article/:blogKey/:articleKey">
						<UpdateArticle />
					</Route>
				</Switch>
			</main>
			<Footer />
		</div>
	);
}
