import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Header from "./header";
import Home from "./home";
import SignIn from "./account-mgmt/signin";
import SignUp from "./account-mgmt/signup";

import { actionCreators } from "../reducers/authReducer";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(actionCreators.fetchUser(true));
  }

  checkIfRouteDenied() {
    if (this.props.auth[0]) window.location.href = "/";
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path="/" component={Home} />
          <Route exact path="/signin" component={this.props.auth[0] ? () => <Redirect to="/" /> : SignIn} />
          <Route exact path="/signup" component={this.props.auth[0] ? () => <Redirect to="/" /> : SignUp} />
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(App);
