import "./App.css";
import { useAuth } from "./hooks/use-auth.js";
import { Switch, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import BlogsListPage from "./components/BlogsListPage";
import BlogPage from "./components/BlogPage";
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";
import Dashboard from "./components/Dashboard";
import BloggersList from "./components/BloggersList";
import UserProfile from "./components/UserProfile";
import CreateBlogForm from "./components/CreateBlogForm";
import CreateArticlePage from "./components/CreateArticlePage";
import Footer from "./components/Footer";

function App() {

  const { user } = useAuth();
  if (user) {
    console.log("user:", user.uid, user.email);
  }

  const [bloggersList, setBloggersList] = useState(null);
  const [bloggerData, setBloggerData] = useState(null);

  const [blogKeyForNewArticle, setBlogKeyForNewArticle] = useState(null);
  const [blogTitleForNewArticle, setBlogTitleForNewArticle] = useState(null);

  const [currentBlogLink, setCurrentBlogLink] = useState(null);
  const [currentBlogKey, setCurrentBlogKey] = useState(null);

  return (
    <div className="App">
      <Header />
      <div className="container" style={{ marginTop: 120 }}>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <SignInForm />
          </Route>
          <Route path="/signup">
            <SignUpForm />
          </Route>
          <Route path="/dashboard">
            <Dashboard
              setBlogKeyForNewArticle={setBlogKeyForNewArticle}
              setBlogTitleForNewArticle={setBlogTitleForNewArticle}
            />
          </Route>
          {/*<Route path="/blogs">
            <BlogsListPage
              setCurrentBlogKey={setCurrentBlogKey}
              setCurrentBlogLink={setCurrentBlogLink}
            />
          </Route>
          <Route path={currentBlogLink}>
            <BlogPage blogKey={currentBlogKey} />
          </Route>
          <Route path="/bloggers">
            {bloggersList ? (
              <BloggersList
                bloggersList={bloggersList}
                fetchBloggerData={fetchBloggerData}
              />
            ) : (
              getBloggersList()
            )}
          </Route>
          {isUserLogged && user && userData ? (
            <Route path="/create-blog">
              <CreateBlogForm
                userId={user.uid}
                userName={userData.userName}
                userFirstName={userData.firstName}
                userLastName={userData.lastName}
              />
            </Route>
          ) : null}
          {isUserLogged && user ? (
            <Route path="/dashboard">
              <Dashboard
                userId={user.uid}
                setBlogKeyForNewArticle={setBlogKeyForNewArticle}
                setBlogTitleForNewArticle={setBlogTitleForNewArticle}
              />
            </Route>
          ) : null}
          {bloggerData ? (
            <Route path={`/${bloggerData.userName}`}>
              <UserProfile userData={bloggerData} />
            </Route>
          ) : null}
          {isUserLogged &&
          user &&
          blogKeyForNewArticle &&
          blogTitleForNewArticle ? (
            <Route path="/create-article">
              <CreateArticlePage
                userId={user.uid}
                userName={userData.userName}
                userFirstName={userData.firstName}
                userLastName={userData.lastName}
                blogKey={blogKeyForNewArticle}
                blogTitle={blogTitleForNewArticle}
              />
            </Route>
          ) : null}*/}
        </Switch>
        <hr />
        <div className="text-center">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
