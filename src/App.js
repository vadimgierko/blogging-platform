import "./App.css";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import BlogsListPage from "./components/BlogsListPage";
import BlogPage from "./components/BlogPage";
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";
import Dashboard from "./components/Dashboard";
import BloggersList from "./components/BloggersList";
import CreateBlogForm from "./components/CreateBlogForm";
import CreateArticlePage from "./components/CreateArticlePage";
import Footer from "./components/Footer";
import BloggerPage from "./components/BloggerPage";

function App() {

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
            <Dashboard />
          </Route>
          <Route path="/blogs/:blogLink">
            <BlogPage />
          </Route>
          <Route path="/blogs">
            <BlogsListPage />
          </Route>
          <Route path="/bloggers/:userName">
            <BloggerPage />
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
