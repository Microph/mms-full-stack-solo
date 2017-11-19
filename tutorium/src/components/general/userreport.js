import React, { Component } from "react";
import {
  TextField,
  FlatButton,
  Paper,
  SelectField,
  MenuItem
} from "material-ui";

class UserReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      problemType: "general", //general or user
      topic: "",
      reportedUser: "",
      details: ""
    };
  }

  onSubmit = () => {
    return;
  };

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
          hintText="ชื่อผู้ใช้ที่ต้องการรายงาน"
          floatingLabelText="ชื่อผู้ใช้ที่ต้องการรายงาน"
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
