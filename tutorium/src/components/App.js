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
  

  render() {
    return (
      <BrowserRouter>
        <div>
        <Route render={(props) => {
                  // console.log(props.location)
                  return (
                    <Header {...props} />
                  )
                }} />
          
          <div className="container">
            <Route exact path="/" component={Home} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/iamtutor" component={ToBeTutor} />
            <Route path="/myprofile" component={Profile} />
            <Route path="/report" component={UserReport} />
            <Route path="/mycourses" component={MyCourses} />
            <Route path="/myoffers" component={MyOffers} />
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
