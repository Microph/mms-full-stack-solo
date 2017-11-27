import React, { Component } from "react";
import {
  FlatButton,
  Card,
  CardHeader,
  CardText,
  Dialog,
  SelectField,
  MenuItem,
  TextField
} from "material-ui";
import {
  parseLevel,
  parseGender,
  parseSubject,
  parseDay
} from "../../../util/parser";
import axios from "axios";

const querystring = require("querystring");
window.axios = axios;

class CurrentCourses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      users: []
    };
  }

  async loadUsers() {
    var res = await axios("/api/search/student");
    if (res.data.success) {
      this.setState({ users: res.data.students });
    }
  }

  async loadCourses() {
    var res = await axios.get("/api/match/offer/bystudent");
    if (res.data.success) {
      var l = [];
      res.data.offers.map(o => {
        if (o.studentConfirm) l.push(o);
      });
      this.setState({ courses: l });
    }
  }

  componentDidMount() {
    this.loadCourses();
    this.loadUsers();
  }

  render() {
    var renderList = [];
    this.state.courses.map(o => {
      const sbj = JSON.parse(o.subject);
      const tutorid = o.tutorID;
      var tutorinfo = this.state.users[tutorid - 1];
      var tutor = o.tutor.student.name + " " + o.tutor.student.surname;
      renderList.push(
        <Card key={o.studentID} style={{ marginTop: 10, marginBottom: 5 }}>
          <CardHeader
            title={
              parseSubject(sbj.subject) +
              parseLevel(sbj.level) +
              " ( " +
              tutor +
              " ) " +
              o.price +
              " บาท / ชั่วโมง"
            }
            subtitle={
              "โทร " +
              (tutorinfo === undefined ? "" : tutorinfo.mobile) +
              ", อีเมลล์ " +
              (tutorinfo === undefined ? "" : tutorinfo.email) +
              ", Facebook " +
              (tutorinfo === undefined
                ? ""
                : tutorinfo.facebookURL == null || tutorinfo.facebookURL === ""
                  ? "-"
                  : tutorinfo.facebookURL) +
              ", LINE " +
              (tutorinfo === undefined
                ? ""
                : tutorinfo.lineID === "" || tutorinfo.lineID == null
                  ? "-"
                  : tutorinfo.lineID)
            }
          />
        </Card>
      );
    });
    return (
      <div>
        <div style={{ fontSize: 25, marginTop: 20 }}>คอร์สเรียนของฉัน</div>
        {renderList}
      </div>
    );
  }
}

export default CurrentCourses;
