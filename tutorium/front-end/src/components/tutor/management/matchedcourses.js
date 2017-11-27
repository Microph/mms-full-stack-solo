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

class MatchedCourses extends Component {
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
    var res = await axios.get("/api/match/offer/bytutor");
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
      var sbj = JSON.parse(o.subject);
      var studentid = o.studentID;
      var studentinfo = this.state.users[studentid - 1];
      var student = o.student.name + " " + o.student.surname;
      renderList.push(
        <Card key={o.studentID} style={{ marginTop: 10, marginBottom: 5 }}>
          <CardHeader
            title={
              parseSubject(sbj.subject) +
              parseLevel(sbj.level) +
              " ( " +
              student +
              " ) " +
              o.price +
              " บาท / ชั่วโมง"
            }
            subtitle={
              "โทร " +
              (studentinfo === undefined ? "" : studentinfo.mobile) +
              ", อีเมลล์ " +
              (studentinfo === undefined ? "" : studentinfo.email) +
              ", Facebook " +
              (studentinfo === undefined
                ? ""
                : studentinfo.facebookURL == null ||
                  studentinfo.facebookURL === ""
                  ? "-"
                  : studentinfo.facebookURL) +
              ", LINE " +
              (studentinfo === undefined
                ? ""
                : studentinfo.lineID === "" || studentinfo.lineID == null
                  ? "-"
                  : studentinfo.lineID)
            }
          />
        </Card>
      );
    });
    return (
      <div>
        <div style={{ fontSize: 25, marginTop: 20 }}>คอร์สปัจจุบัน</div>
        {renderList.length === 0 ? "คุณไม่คอร์สในปัจจุบัน" : renderList}
      </div>
    );
  }
}

export default MatchedCourses;
