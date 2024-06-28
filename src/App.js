import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignupPage from "./Pages/Signup";
import LoginPage from "./Pages/Login";

import { AuthContext, FirebaseContext } from "./store/Context";
import Post from "./store/PostContext";
import "./App.css";

/**
 * ?  =====Import Components=====
 */
import Home from "./Pages/Home";
import CreatePage from "./Pages/Create";
import ViewPage from "./Pages/ViewPost";

function App() {
  const { setUser } = useContext(AuthContext);
  const { firebase } = useContext(FirebaseContext);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  });

  return (
    <div>
      <Post>
        <Router>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/signup">
            <SignupPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>

          <Route path="/create">
            <CreatePage />
          </Route>
          <Route path="/view">
            <ViewPage />
          </Route>
        </Router>
      </Post>
    </div>
  );
}

export default App;
