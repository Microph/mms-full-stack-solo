import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";

import Header from "./header";
import Home from "./home";
import SignIn from "./account-mgmt/signin";
import SignUp from "./account-mgmt/signup";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path="/" component={Home} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
