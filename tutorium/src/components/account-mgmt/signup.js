import React, { Component } from "react";
import {
  Paper,
  TextField,
  Divider,
  RadioButtonGroup,
  RadioButton,
  SelectField,
  MenuItem,
  FlatButton
} from "material-ui";
import { connect } from "react-redux";
import axios from "axios";

window.axios = axios;

// {accountType: req.body.accountType,
//     accountID: req.body.accountID,
//     name: req.body.name,
//     surname: req.body.surname,
//     gender: req.body.gender,
//     educationLevel: req.body.educationLevel,
//     facebookUrl: req.body.facebookUrl,
//     lineID: req.body.lineID,
//     email: req.body.email,
//     mobile: req.body.mobile}

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
      gender: "",
      edlvl: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit() {
    const user = await axios.get("/api/current-login-session");
    const res = await axios.post("/api/register", {
      accountType: user.data.user.accountType,
      accountID: user.data.user.accountID,
      name: this.state.name,
      surname: this.state.lastname,
      gender: this.state.gender,
      educationLevel: this.state.edlvl,
      facebookUrl: this.state.fburl,
      lineID: this.state.lineid,
      email: this.state.email,
      mobile: this.state.phone
    });
    console.log(res);
  }

  render() {
    return (
      <div>
        <h2>สมัครสมาชิก</h2>
        <Paper zDepth={2}>
          <TextField
            hintText="ชื่อจริง"
            style={{ marginLeft: 20 }}
            underlineShow={false}
            required
            onChange={(event, name) => this.setState({ name })}
          />
          <Divider />
          <TextField
            hintText="นามสกุล"
            style={{ marginLeft: 20 }}
            underlineShow={false}
            required
            onChange={(event, lastname) => this.setState({ lastname })}
          />
          <Divider />
          <SelectField
            floatingLabelText="เพศ"
            value="male"
            required
            style={{ marginLeft: 20 }}
            onChange={(event, key, gender) => this.setState({ gender })}
          >
            <MenuItem value="male" primaryText="ชาย" />
            <MenuItem value="female" primaryText="หญิง" />
            <MenuItem value="others" primaryText="อื่น ๆ" />
          </SelectField>
          <Divider />
          <SelectField
            style={{ marginLeft: 20 }}
            floatingLabelText="ระดับการศึกษา"
            value="pratom"
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
          <Divider />
          <TextField
            hintText="Facebook URL"
            style={{ marginLeft: 20 }}
            underlineShow={false}
            onChange={(event, fburl) => this.setState({ fburl })}
          />
          <Divider />
          <TextField
            hintText="Line ID"
            style={{ marginLeft: 20 }}
            underlineShow={false}
            onChange={(event, lineid) => this.setState({ lineid })}
          />
          <Divider />
          <TextField
            hintText="อีเมลล์"
            style={{ marginLeft: 20 }}
            underlineShow={false}
            required
            onChange={(event, email) => this.setState({ email })}
          />
          <Divider />
          <TextField
            hintText="หมายเลขโทรศัพท์"
            style={{ marginLeft: 20 }}
            underlineShow={false}
            required
            onChange={(event, phone) => this.setState({ phone })}
          />
          <Divider />
          <FlatButton
            onClick={this.handleSubmit}
            style={{ color: "#000", margin: "auto" }}
            label="ยืนยัน"
          />
          <Divider />
        </Paper>
      </div>
    );
  }
}

const styles = {
  block: {
    maxWidth: 250
  },
  radioButton: {
    marginBottom: 16
  }
};

// export default SignUp;
function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(SignUp);
