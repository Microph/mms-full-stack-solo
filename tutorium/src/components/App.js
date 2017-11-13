import React, { Component } from "react";
import "./App.css";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Header from "./header";
import Home from "./home";
import SignIn from "./account-mgmt/signin";
import SignUp from "./account-mgmt/signup";
import Profile from "./general/userprofile";
import UserReport from "./general/userreport";
import MyCourses from "./student/mycourses";
import MyOffers from "./student/myoffers";
import ToBeTutor from "./tobetutor";

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
        <div>
          <Header />
          <Route exact path="/" component={Home} />
          <Route
            path="/signin"
            component={this.props.auth[0] ? () => <Redirect to="/" /> : SignIn}
          />
          <Route
            path="/signup"
            component={this.props.auth[0] ? () => <Redirect to="/" /> : SignUp}
          />
          <Route path="/myprofile" component={Profile} />
          <Route path="/report" component={UserReport} />
          <Route path="/mycourses" component={MyCourses} />
          <Route path="/myoffers" component={MyOffers} />
          <Route path="/iamtutor" component={ToBeTutor} />
        </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(App);
