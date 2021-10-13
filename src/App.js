import './App.css';
import { Switch, Route } from "react-router-dom";
import Header from './components/Header';
import Home from './components/Home';
import SignInForm from './components/SignInForm';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container" style={{marginTop: 120}}>
        <Switch>
          <Route exact path="/"><Home /></Route>
          <Route path="/blogs"><h1>Blogs</h1></Route>
          <Route path="/bloggers"><h1>Bloggers</h1></Route>
          <Route path="/login"><SignInForm /></Route>
          <Route path="/signup"><h1>Create account form</h1></Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
