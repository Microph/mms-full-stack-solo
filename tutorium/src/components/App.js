import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
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

const tohome = () => {
  return <Redirect to="/" />;
};

class App extends Component {
  componentDidMount() {
    this.props.dispatch(actionCreators.fetchUser(false));
  }

  checkIfRouteDenied() {
    if (this.props.auth[0]) window.location.href = "/";
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <div className="container">
            <Route exact path="/" component={Home} />
            <Route
              path="/signin"
              component={this.props.auth[0] ? tohome : SignIn}
            />
            <Route
              path="/signup"
              component={this.props.auth[0] ? tohome : SignUp}
            />
            <Route
              path="/myprofile"
              component={this.props.auth[0] ? tohome : Profile}
            />
            <Route
              path="/report"
              component={this.props.auth[0] ? tohome : UserReport}
            />
            <Route
              path="/mycourses"
              component={this.props.auth[0] ? tohome : MyCourses}
            />
            <Route
              path="/myoffers"
              component={this.props.auth[0] ? tohome : MyOffers}
            />
            <Route
              path="/iamtutor"
              component={this.props.auth[0] ? tohome : ToBeTutor}
            />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(App);
