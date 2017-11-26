import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Paper,
  TextField,
  SelectField,
  MenuItem,
  FlatButton,
  Checkbox,
  Card,
  CardHeader
} from "material-ui";
import axios from "axios";

const querystring = require("querystring");
window.axios = axios;

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      lastname: "",
      fburl: "",
      lineid: "",
      email: "",
      phone: "",
      gender: "",
      edlvl: ""
    };
  }

  fetchMySelf() {
    if (this.props.auth == null) return;
    if (this.props.auth.success) {
      const sid = this.props.auth.user.studentID;
      if (this.props.students == null) return;
      if (this.props.students.success)
        this.props.students.students.map(person => {
          if (person.studentID === sid) {
            if (this.state.gender !== "") return;
            this.setState({
              name: person.name,
              lastname: person.surname,
              fburl: person.facebookURL,
              lineid: person.lineID,
              email: person.email,
              phone: person.mobile,
              gender: person.gender,
              edlvl: person.educationLevel
            });
          }
        });
    }
  }

  fetchFBProfile() {
    if (this.props.auth == null) return;
    if (this.props.auth.success) {
      if (this.props.auth.user.accountType !== "facebook") return;
      var name = this.props.auth.user.displayName;
      var imgsrc = this.props.auth.user.profilePic;
      return [
        <Card>
          <CardHeader title={name} avatar={imgsrc} />
        </Card>
      ];
    }
  }

  fetchLineProfile() {
    if (this.props.auth == null) return;
    if (this.props.auth.success) {
      if (this.props.auth.user.accountType !== "line") return;
      var name = this.props.auth.user.displayName;
      var imgsrc = this.props.auth.user.profilePic;
      return [
        <Card>
          <CardHeader title={name} avatar={imgsrc} />
        </Card>
      ];
    }
  }

  handleSubmit = async () => {
    var res = await axios({
      method: "PUT",
      url: " /api/student/profile/update",
      headers: {
        "Content-type": "application/x-www-form-urlencoded"
      },
      data: querystring.stringify({
        name: this.state.name,
        surname: this.state.lastname,
        gender: this.state.gender,
        educationLevel: this.state.edlvl,
        facebookUrl: this.state.fburl,
        lineID: this.state.lineid,
        email: this.state.email,
        mobile: this.state.phone
      })
    });
    this.forceUpdate();
  };

  render() {
    this.fetchMySelf();
    return (
      <div>
        <Paper
          zDepth={1}
          style={{
            padding: 30,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          {/* Header */}
          <span style={{ fontSize: 25, alignSelf: "flex-start" }}>
            ข้อมูลส่วนตัว
          </span>
          {/* Profile fetched */}
          {this.fetchFBProfile()}
          {this.fetchLineProfile()}
          {/* FirstName */}
          <TextField
            fullWidth
            hintText="กรุณากรอกชื่อของคุณ"
            floatingLabelText="ชื่อ"
            // required
            onChange={(event, name) => this.setState({ name })}
            value={this.state.name}
          />
          {/* Lastname */}
          <TextField
            fullWidth
            hintText="กรุณากรอกนามสกุลของคุณ"
            floatingLabelText="นามสกุล"
            // required
            onChange={(event, lastname) => this.setState({ lastname })}
            value={this.state.lastname}
          />
          {/* Gender */}
          <SelectField
            fullWidth
            floatingLabelText="เพศ"
            value={this.state.gender}
            required
            onChange={(event, key, gender) => this.setState({ gender })}
          >
            <MenuItem value="male" primaryText="ชาย" />
            <MenuItem value="female" primaryText="หญิง" />
            <MenuItem value="others" primaryText="อื่น ๆ" />
          </SelectField>
          {/* Education Level */}
          <SelectField
            fullWidth
            floatingLabelText="ระดับการศึกษา"
            value={this.state.edlvl}
            required
            onChange={(event, key, edlvl) => this.setState({ edlvl })}
          >
            <MenuItem value="pratom" primaryText="ประถมศึกษา" />
            <MenuItem value="matthayomton" primaryText="มัธยมศึกษาตอนต้น" />
            <MenuItem value="matthayomplai" primaryText="มัธยมศึกษาตอนปลาย" />
            <MenuItem value="bachelor" primaryText="ปริญญาตรี" />
            <MenuItem value="master" primaryText="ปริญญาโท" />
            <MenuItem value="doctor" primaryText="ปริญญาเอก" />
          </SelectField>
          {/* FB URL */}
          <TextField
            fullWidth
            hintText="กรุณากรอก Facebook URL ของคุณ ตัวอย่าง www.facebook.com/yourUrl"
            floatingLabelText="Facebook URL"
            // required
            onChange={(event, fburl) => this.setState({ fburl })}
            value={this.state.fburl}
          />
          {/* Line ID */}
          <TextField
            fullWidth
            hintText="กรุณากรอก Line ID ของคุณ"
            floatingLabelText="Line ID"
            // required
            onChange={(event, lineid) => this.setState({ lineid })}
            value={this.state.lineid}
          />
          {/* E-mail */}
          <TextField
            fullWidth
            hintText="กรุณากรอกอีเมลล์ของคุณ"
            floatingLabelText="อีเมลล์"
            // required
            onChange={(event, email) => this.setState({ email })}
            value={this.state.email}
          />
          {/* Phone number */}
          <TextField
            fullWidth
            hintText="กรุณากรอกหมายเลขโทรศัพท์ของคุณ"
            floatingLabelText="หมายเลขโทรศัพท์"
            // required
            onChange={(event, phone) => this.setState({ phone })}
            value={this.state.phone}
          />
          {/* Confirm button */}
          <FlatButton
            onClick={this.handleSubmit}
            style={{
              color: "#fff",
              margin: "auto",
              marginTop: 30,
              backgroundColor: "limegreen"
            }}
            labelStyle={{ fontSize: 15, fontWeight: 700 }}
            label="บันทึกข้อมูล"
          />
        </Paper>
      </div>
    );
  }
}

function mapStateToProps({ students, auth }) {
  return { students, auth };
}

export default connect(mapStateToProps)(UserInfo);
