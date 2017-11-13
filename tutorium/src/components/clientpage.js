import React, { Component } from 'react';
import '../App.css';
import Header from "./header";
import { Route } from 'react-router-dom'

import Home from './home';
import SignIn from './account/signin';
import SignUp from './account/signup';

class ClientPage extends Component {
  render() {
    return (
        <div>
          <Header />
          <Route exact path="/" component={Home} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
        </div>
    );
  }
}

export default ClientPage;