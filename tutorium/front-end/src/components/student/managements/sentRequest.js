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

class SentRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sentRequests: []
    };
  }

  async loadRequests() {
    var res = await axios.get("/api/match/request/bystudent");
    if (res.data.success) {
      this.setState({ sentRequests: res.data.requests });
    }
  }

  componentDidMount() {
    this.loadRequests();
  }

  render() {
    var renderList = [];
    this.state.sentRequests.map(r => {
      const sbj = JSON.parse(r.subject);
      const tutor = r.tutor.student.name + " " + r.tutor.student.surname;
      const tutorid = r.tutorID;
      renderList.push(
        <Card key={r.studentID} style={{ marginTop: 10, marginBottom: 5 }}>
          <CardHeader
            title={
              parseSubject(sbj.subject) +
              parseLevel(sbj.level) +
              " ( " +
              tutor +
              " ) "
            }
            subtitle={null}
          />
        </Card>
      );
    });
    return (
      <div>
        <div style={{ fontSize: 25, marginTop: 20 }}>คำขอที่ส่งไปแล้ว</div>
        {renderList}
      </div>
    );
  }
}

export default SentRequests;
