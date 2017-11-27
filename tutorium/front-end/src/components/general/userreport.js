import React, { Component } from "react";
import axios from "axios";
import {
  TextField,
  FlatButton,
  Paper,
  SelectField,
  MenuItem
} from "material-ui";

const querystring = require("querystring");

class UserReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      problemType: "general", //general or user
      topic: "",
      reportedUser: "",
      details: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSubmit () {
    console.log('send');
    const res = await axios({
      method: "GET",
      url: "/api/current-login-session"
    });

    if(!res.data.success){
      alert('Error: operation failed. (cannot get current login session)');
      return;
    }

    const reporterID = res.data.user.studentID;
    let res2 = null;
    if(this.state.problemType == "user"){
      res2 = await axios({
        method: "POST",
        url: "/api/user-write-report",
        headers: {
          "Content-type": "application/x-www-form-urlencoded"
        },
        data: querystring.stringify({
          reporterStudentID: reporterID,
          reportedStudentID: this.state.reportedUser,
          topic: this.state.topic,
          detail: this.state.details
        })
      });
    }
    else{
      res2 = await axios({
        method: "POST",
        url: "/api/user-write-report",
        headers: {
          "Content-type": "application/x-www-form-urlencoded"
        },
        data: querystring.stringify({
          reporterStudentID: reporterID,
          topic: this.state.topic,
          detail: this.state.details
        })
      });
    }

    if(res2.data.success){
      alert('Send report successfully');
      window.location.href = "/report";
    }
    else{
      alert('Error: operation failed. (cannot send report)');
    }
  }

  render() {
    return (
      <Paper
        zDepth={2}
        style={{
          padding: 30,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        {/* Personal Info */}
        <div
          style={{
            fontSize: 30,
            marginTop: 20,
            marginBottom: 10,
            alignSelf: "flex-start",
            color: "#505050"
          }}
        >
          รายงานปัญหา
        </div>
        {/* Type */}
        <SelectField
          fullWidth
          floatingLabelText="ประเภทปัญหา"
          floatingLabelStyle={{
            color: "#505050",
            fontSize: 25,
            fontWeight: 300
          }}
          menuStyle={{ marginTop: 15 }}
          value={this.state.problemType}
          onChange={(event, index, value) =>
            this.setState({ problemType: value })}
        >
          <MenuItem value={"general"} primaryText="ปัญหาทั่วไป" />
          <MenuItem value={"user"} primaryText="รายงานผู้ใช้" />
        </SelectField>

        {/* Topic */}
        <TextField
          fullWidth
          hintText="หัวข้อ"
          floatingLabelText="หัวข้อ"
          underlineShow
          // required
          onChange={(event, topic) => this.setState({ topic })}
          value={this.state.topic}
        />

        {/* User */}
        <TextField
          fullWidth
          hintText="ID ผู้ใช้ที่ต้องการรายงาน"
          floatingLabelText="ID ผู้ใช้ที่ต้องการรายงาน"
          className={this.state.problemType === "user" ? "" : "hidden"}
          underlineShow
          // required
          onChange={(event, reportedUser) => this.setState({ reportedUser })}
          value={this.state.reportedUser}
        />

        {/* Details */}
        <TextField
          fullWidth
          hintText="รายละเอียด"
          floatingLabelText="รายละเอียด"
          underlineShow
          multiLine
          rows={2}
          // required
          onChange={(event, details) => this.setState({ details })}
          value={this.state.details}
        />

        {/* Confirm button */}
        <FlatButton
          disabled={
            this.state.topic === "" ||
            this.state.details === "" ||
            (this.state.problemType === "user" &&
              this.state.reportedUser === "")
          }
          onClick={this.onSubmit}
          style={{
            color: "#fff",
            margin: "auto",
            marginTop: 30,
            backgroundColor: "limegreen"
          }}
          labelStyle={{ fontSize: 15, fontWeight: 700 }}
          label="ยืนยัน"
        />
      </Paper>
    );
  }
}

export default UserReport;
