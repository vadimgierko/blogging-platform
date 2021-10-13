import './App.css';
import { Switch, Route } from "react-router-dom";
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';
import { auth } from './firebase';
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUserLogged(true);
        setUserId(user.uid);
        console.log("user is logged");
        //console.log("user id:", user.uid);
        //console.log("joined at:", user.metadata.creationTime)
        //fetchUserData(user.uid);
        //console.log(user.uid)
      } else {
        setIsUserLogged(false);
        setUserId(null);
        console.log("user logged out");
        //console.log("user id:", userId);
        // clear userData
      }
    });
  }, []);

  return (
    <div className="App">
      <Header isUserLogged={isUserLogged} />
      <div className="container" style={{marginTop: 120}}>
        <Switch>
          <Route exact path="/"><Home /></Route>
          <Route path="/blogs"><h1>Blogs</h1></Route>
          <Route path="/bloggers"><h1>Bloggers</h1></Route>
          <Route path="/login"><SignInForm /></Route>
          <Route path="/signup"><SignUpForm /></Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
