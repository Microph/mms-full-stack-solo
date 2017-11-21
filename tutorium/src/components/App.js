import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./header";
import Home from "./home";
// Account
import SignIn from "./account-mgmt/signin";
import SignUp from "./account-mgmt/signup";
//  Student
import Profile from "./general/userprofile";
import UserReport from "./general/userreport";
import MyCourses from "./student/mycourses";
import MyOffers from "./student/myoffers";
// Tutor
import ToBeTutor from "./tobetutor";
import CurrentCourses from "./tutor/currentcourses";
import TeachingInfo from "./tutor/teachinginfo";
import StudentSearch from "./tutor/studentsearch";
// Admin
import AdminLogin from "../admin-components/login";
import Dashboard from "../admin-components/dashboard";
import DeleteRequests from "../admin-components/deleterequests";
import ReportsManage from "../admin-components/reportsmanage";
import RequestsManage from "../admin-components/requestsmanage";
import SuspendedUsers from "../admin-components/suspendedusers";
import UsersManage from "../admin-components/usersmanage";
// Util
import NotFound from "./util/NotFound";

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
            <Switch>
              {/* General */}
              <Route exact path="/" component={Home} />
              <Route exact path="/report" component={UserReport} />
              <Route exact path="/myprofile" component={Profile} />
              {/* Account */}
              <Route exact path="/signin" component={SignIn} />
              <Route exact path="/signup" component={SignUp} />
              {/* Student */}
              <Route exact path="/myoffers" component={MyOffers} />
              <Route exact path="/mycourses" component={MyCourses} />
              {/* Tutor */}
              <Route exact path="/iamtutor" component={ToBeTutor} />
              <Route exact path="/tutor/mycouses" component={CurrentCourses} />
              <Route
                exact
                path="/tutor/teachinginfo"
                component={TeachingInfo}
              />
              <Route
                exact
                path="/tutor/findstudent"
                component={StudentSearch}
              />
              {/* Admin */}
              <Route exact path="/admin/login" component={AdminLogin} />
              <Route exact path="/admin/dashboard" component={Dashboard} />
              <Route exact path="/admin/usersmanage" component={UsersManage} />
              <Route
                exact
                path="/admin/requestsmanage"
                component={RequestsManage}
              />
              <Route
                exact
                path="/admin/reportsmanage"
                component={ReportsManage}
              />
              <Route
                exact
                path="/admin/deleterequests"
                component={DeleteRequests}
              />
              <Route
                exact
                path="/admin/suspendedusers"
                component={SuspendedUsers}
              />
              {/* 404, Not found */}
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
