import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./header";
import Home from "./home";
import SignIn from "./account-mgmt/signin";
import SignUp from "./account-mgmt/signup";
import Profile from "./general/userprofile";
import UserReport from "./general/userreport";
import MyCourses from "./student/mycourses";
import MyOffers from "./student/myoffers";
import ToBeTutor from "./tobetutor";
import CurrentCourses from "./tutor/currentcourses";
import TeachingInfo from "./tutor/teachinginfo";
import StudentSearch from "./tutor/studentsearch";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Route
            render={props => {
              return <Header {...props} />;
            }}
          />
          <div className="container">
            <Route exact path="/" component={Home} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/iamtutor" component={ToBeTutor} />
            <Route path="/myprofile" component={Profile} />
            <Route path="/report" component={UserReport} />
            <Route path="/mycourses" component={MyCourses} />
            <Route path="/myoffers" component={MyOffers} />
            <Route path="/tutor/mycouses" component={CurrentCourses} />
            <Route path="/tutor/teachinginfo" component={TeachingInfo} />
            <Route path="/tutor/findstudent" component={StudentSearch} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
