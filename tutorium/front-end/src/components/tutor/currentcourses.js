import React, { Component } from "react";
import MatchedCourses from "./management/matchedcourses";
import ReceivedRequests from "./management/receivedrequests";

class CurrentCourses extends Component {
  render() {
    return (
      <div>
        <ReceivedRequests />
        <MatchedCourses />
      </div>
    );
  }
}

export default CurrentCourses;
