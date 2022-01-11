import "./App.css";
import { Switch, Route } from "react-router-dom";
import Header from "./components/organisms/Header";
import Home from "./components/organisms/Home";
import BlogsList from "./components/organisms/BlogsList";
import Blog from "./components/organisms/Blog";
import Dashboard from "./components/Dashboard";
import BloggersList from "./components/organisms/BloggersList";
import CreateBlogForm from "./components/CreateBlogForm";
import CreateArticlePage from "./components/CreateArticlePage";
import Footer from "./components/organisms/Footer";
import Blogger from "./components/organisms/Blogger";
import UpdateArticlePage from "./components/UpdateArticlePage";
import { useDatabase } from "./hooks/use-database";
import { useEffect, useState } from "react";
import Article from "./components/organisms/Article";
import Form from "./components/organisms/Form";
import { SIGN_IN, SIGN_UP } from "./initial-data/form-structure-templates";

function App() {

  const [userId, setUserId] = useState(null);

  const { user, signIn, signUp, logOut } = useDatabase();

  useEffect(() => {
    if (user) {
      setUserId(user.uid);
    } else {
      setUserId(null);
    }
  }, [user]);

  return (
    <div className="App">
      <Header user={user} logOut={logOut} />
      <div className="container" style={{ marginTop: 120 }}>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Form
              formClassname="sign-in-form"
              structure={SIGN_IN}
              onSubmit={signIn}
              to="/dashboard"
              text="log in"
            />
          </Route>
          <Route path="/signup">
            <Form
              formClassname="sign-up-form"
              structure={SIGN_UP}
              onSubmit={signUp}
              to="/dashboard"
              text="create account"
            />
          </Route>
          <Route path="/dashboard">
            {
              userId
              ? <Dashboard />
              : (
                <div>
                  <h3>Downloading data...</h3>
                  <ul>
                    <li>...wait for a data download or...</li>
                    <li>...try to sign in one more time or...</li>
                    <li>...create an account with create account button if don't have one or...</li>
                    <li>...check your Internet connection...</li>
                  </ul>
                </div>
              )
            }
          </Route>
          <Route path="/blogs/:blogLink/:articleLink">
            <Article />
          </Route>
          <Route path="/blogs/:blogLink">
            <Blog />
          </Route>
          <Route path="/blogs">
            <BlogsList />
          </Route>
          <Route path="/bloggers/:userName">
            <Blogger />
          </Route>
          <Route path="/bloggers">
            <BloggersList />
          </Route>
          <Route path="/create-blog">
            <CreateBlogForm />
          </Route>
          <Route path="/create-article/:blogKey/:blogTitle">
            <CreateArticlePage />
          </Route>
          <Route path="/edit-article/:blogKey/:articleKey">
            <UpdateArticlePage />
          </Route>
        </Switch>
        <Footer />
      </div>
    </div>
  );
}

export default App;
