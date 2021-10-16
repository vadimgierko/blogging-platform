import './App.css';
import { Switch, Route } from "react-router-dom";
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';
import Dashboard from './components/Dashboard';
import { auth } from './firebase';
import { onAuthStateChanged } from "firebase/auth";
import { ref, onValue } from "firebase/database";
import { database } from './firebase';

function App() {
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUserLogged(true);
        setUser(user);
        console.log("user is logged");
        fetchUserData(user.uid);
      } else {
        setIsUserLogged(false);
        setUser(null);
        console.log("user logged out");
        setUserData(null);
      }
    });
  }, []);

  function fetchUserData (userId) {
    const userDataRef = ref(database, 'users/' + userId);
    onValue(userDataRef, (snapshot) => {
        if (snapshot) {
          const fetchedUserData = snapshot.val();
          setUserData(fetchedUserData);
        } else {
          setUserData({
            firstName: "",
            lastName: ""
          });
        }
    });
  }

  return (
    <div className="App">
      <Header
        isUserLogged={isUserLogged}
        userNames={userData ? (userData.firstName + " " + userData.lastName) : (user ? user.email : null)}
        userName={userData ? userData.userName : null}
      />
      <div className="container" style={{marginTop: 120}}>
        <Switch>
          <Route exact path="/"><Home /></Route>
          <Route path="/blogs"><h1>Blogs</h1></Route>
          <Route path="/bloggers"><h1>Bloggers</h1></Route>
          <Route path="/login"><SignInForm /></Route>
          <Route path="/signup"><SignUpForm /></Route>
          <Route path="/dashboard"><Dashboard userId={user ? user.uid : null} userData={userData} /></Route>
          {
            userData ?
              <Route path={`/${userData.userName}`}>
                <div>
                  {
                    <>
                      <h1>{userData.firstName + " " + userData.lastName}</h1>
                      <hr />
                      <p>user name: {"@" + userData.userName}</p>
                      <p>email: {userData.email}</p>
                    </>
                  }
                </div>
              </Route>
            :
              null
          }
        </Switch>
      </div>
    </div>
  );
}

export default App;
