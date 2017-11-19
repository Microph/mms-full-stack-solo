import React, { Component } from "react";
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
import { connect } from "react-redux";
import axios from "axios";

const querystring = require("querystring");

window.axios = axios;

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      lastname: "",
      fburl: "",
      lineid: "",
      email: "",
      phone: "",
      gender: "male",
      edlvl: "pratom",
      agreement: false,
      formerr: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = async () => {
    const user = await axios.get("/api/current-login-session");
    const res = await axios({
      method: "POST",
      url: "/api/register",
      headers: {
        "Content-type": "application/x-www-form-urlencoded"
      },
      data: querystring.stringify({
        accountType: user.data.user.accountType,
        accountID: user.data.user.accountID,
        name: this.state.name,
        surname: this.state.lastname,
        gender: this.state.gender,
        educationLevel: this.state.edlvl,
        facebookUrl: this.state.fburl,
        lineID: this.state.lineid,
        email: this.state.email,
        mobile: this.state.phone,
        agree: this.state.agreement
      })
    });
    if (res.data.success) {
      window.location.href = "/";
    } else {
      this.setState({ formerr: true });
    }
  };

  fetchFBProfile() {
    if (this.props.auth == null) return;
    if (this.props.auth.success) {
      if (this.props.auth.user.accountType !== "facebook") return;
      var id = this.props.auth.user.accountID;
      var name = this.props.auth.user.displayName;
      var imgsrc = "https://graph.facebook.com/" + id + "/picture";
      return [
        <Card>
          <CardHeader
            title={name}
            subtitle={
              <a href="/api/logout" style={{ textDecoration: "None" }}>
                นี่ไม่ใช่ฉัน
              </a>
            }
            avatar={imgsrc}
          />
        </Card>
      ];
    }
  }

  fetchLineProfile() {
    if (this.props.auth == null) return;
    if (this.props.auth.success) {
      if (this.props.auth.user.accountType !== "line") return;
      var id = this.props.auth.user.accountID;
      var name = this.props.auth.user.displayName;
      var imgsrc = this.props.auth.user.profilePic;
      return [
        <Card>
          <CardHeader
            title={name}
            subtitle={
              <a href="/api/logout" style={{ textDecoration: "None" }}>
                นี่ไม่ใช่ฉัน
              </a>
            }
            avatar={imgsrc}
          />
        </Card>
      ];
    }
  }

  render() {
    return (
      <div>
        <Paper
          zDepth={2}
          style={{
            padding: 30,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          {/* Header */}
          <span style={{ fontSize: 30, alignSelf: "flex-start" }}>
            สมัครสมาชิก
          </span>
          {/* Profile fetched */}
          {this.fetchFBProfile()}
          {this.fetchLineProfile()}
          {/* FirstName */}
          <TextField
            fullWidth
            hintText="กรุณากรอกชื่อของคุณ"
            floatingLabelText="ชื่อ"
            underlineShow={false}
            // required
            onChange={(event, name) => this.setState({ name })}
            value={this.state.name}
          />
          {/* Lastname */}
          <TextField
            fullWidth
            hintText="กรุณากรอกนามสกุลของคุณ"
            floatingLabelText="นามสกุล"
            underlineShow={false}
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
            <MenuItem value="doctor" primaryText="ปริญญาเอง" />
          </SelectField>
          {/* FB URL */}
          <TextField
            fullWidth
            hintText="กรุณากรอก Facebook URL ของคุณ ตัวอย่าง www.facebook.com/yourUrl"
            floatingLabelText="Facebook URL"
            underlineShow={false}
            // required
            onChange={(event, fburl) => this.setState({ fburl })}
            value={this.state.fburl}
          />
          {/* Line ID */}
          <TextField
            fullWidth
            hintText="กรุณากรอก Line ID ของคุณ"
            floatingLabelText="Line ID"
            underlineShow={false}
            // required
            onChange={(event, lineid) => this.setState({ lineid })}
            value={this.state.lineid}
          />
          {/* E-mail */}
          <TextField
            fullWidth
            hintText="กรุณากรอกอีเมลล์ของคุณ"
            floatingLabelText="อีเมลล์"
            underlineShow={false}
            // required
            onChange={(event, email) => this.setState({ email })}
            value={this.state.email}
          />
          {/* Phone number */}
          <TextField
            fullWidth
            hintText="กรุณากรอกหมายเลขโทรศัพท์ของคุณ"
            floatingLabelText="หมายเลขโทรศัพท์"
            underlineShow={false}
            // required
            onChange={(event, phone) => this.setState({ phone })}
            value={this.state.phone}
          />
          {/* I've read it */}
          <Checkbox
            label="ฉันได้อ่านและยอมรับเงื่อนไขในการให้บริการแล้ว"
            style={{ marginTop: 30 }}
            onCheck={(event, agreement) => this.setState({ agreement })}
          />
          {/* Confirm button */}
          <FlatButton
            disabled={!this.state.agreement}
            onClick={this.handleSubmit}
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
      </div>
    );
  }
}

// export default SignUp;
function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(SignUp);
