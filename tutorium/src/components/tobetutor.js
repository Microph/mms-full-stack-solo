import React, { Component } from "react";
import {
  Paper,
  TextField,
  SelectField,
  MenuItem,
  FlatButton,
  Checkbox
} from "material-ui";

class ToBeTutor extends Component {
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
          {howto()}
          {/* Personal Info */}
          <div
            style={{
              fontSize: 30,
              marginTop: 20,
              alignSelf: "flex-start",
              color: "#505050"
            }}
          >
            ข้อมูลส่วนตัว
          </div>
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

          {/* Edu Info */}
          <div
            style={{
              fontSize: 30,
              marginTop: 20,
              alignSelf: "flex-start",
              color: "#505050"
            }}
          >
            ข้อมูลด้านการศึกษา
          </div>

          {/* Teaching Info */}
          <div
            style={{
              fontSize: 30,
              marginTop: 20,
              alignSelf: "flex-start",
              color: "#505050"
            }}
          >
            วิชาที่สามารถสอนได้
          </div>

          {/* Exp Info */}
          <div
            style={{
              fontSize: 30,
              marginTop: 20,
              alignSelf: "flex-start",
              color: "#505050"
            }}
          >
            ประสบการสอนโดยสังเขป
          </div>

          {/* Place Info */}
          <div
            style={{
              fontSize: 30,
              marginTop: 20,
              alignSelf: "flex-start",
              color: "#505050"
            }}
          >
            สถานที่ที่สามารถสอนได้
          </div>

          {/* Evidence */}
          <div
            style={{
              fontSize: 30,
              marginTop: 20,
              alignSelf: "flex-start",
              color: "#505050"
            }}
          >
            หลักฐานการยืนยันตัวตน
          </div>

          {/* Bank Info */}
          <div
            style={{
              fontSize: 30,
              marginTop: 20,
              alignSelf: "flex-start",
              color: "#505050"
            }}
          >
            บัญชีสำหรับรับค่าบริการ
          </div>

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

const howto = () => {
  return (
    <div style={{ fontSize: 30, alignSelf: "flex-start", color: "#505050" }}>
      ขั้นตอนการสมัครเป็นติวเตอร์<br />
      <div
        style={{
          fontSize: 20,
          marginLeft: 20,
          marginTop: 15,
          alignSelf: "flex-start"
        }}
      >
        1. ตรวจสอบข้อมูลส่วนตัว<br />
        2. กรอกข้อมูลเพิ่มเติม* และอัปโหลดหลักฐานการยืนยันตัวตน<br />
        <div
          style={{
            fontSize: 15,
            marginLeft: 20,
            alignSelf: "flex-start"
          }}
        >
          (บัตรประจำตัวประชาชน หรือ บัตรประจำตัวนักเรียน / นักศึกษา หรือ
          พาสปอร์ต)<br />
        </div>
        3. เลือกบัญชีธนาคารสำหรับรับค่าบริการ<br />
        4. ยืนยันและรอการตอบรับจากผู้ดูแลระบบ<br />
        <div
          style={{
            fontSize: 15,
            marginLeft: 20,
            alignSelf: "flex-start"
          }}
        >
          * สามารถแก้ไขได้ในภายหลัง<br />
        </div>
      </div>
    </div>
  );
};

export default ToBeTutor;
