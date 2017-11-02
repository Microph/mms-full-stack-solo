import React, { Component } from 'react';
import './App.css';
import Header from "./components/header";
import { BrowserRouter, Route } from 'react-router-dom'

import Home from './components/home';
import SignIn from './components/account/signin';
import SignUp from './components/account/signup';

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
