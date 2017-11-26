import React, { Component } from "react";
import {
  Paper,
  TextField,
  SelectField,
  MenuItem,
  FlatButton,
  Checkbox
} from "material-ui";
import UserPayment from "./general/profiles-component/userpayment";

class ToBeTutor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agreement: false
    };
  }

  handleSubmit = () => {
    return;
  };

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

          {/* Edu Info */}
          <div
            style={{
              fontSize: 25,
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
              fontSize: 25,
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
              fontSize: 25,
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
              fontSize: 25,
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
              fontSize: 25,
              marginTop: 20,
              alignSelf: "flex-start",
              color: "#505050"
            }}
          >
            หลักฐานการยืนยันตัวตน
            <span style={{ color: "#606060", fontSize: 20, marginLeft: 10 }}>
              (ฟังก์ชันยังไม่พร้อมใช้งานในขณะนี้)
            </span>
          </div>

          {/* Bank Info */}
          <div
            style={{
              fontSize: 25,
              marginTop: 20,
              alignSelf: "flex-start",
              color: "#505050"
            }}
          >
            บัญชีสำหรับรับค่าบริการ
            <UserPayment />
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
        1. กรอกข้อมูล* และอัปโหลดหลักฐานการยืนยันตัวตน<br />
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
        2. เลือกบัญชีธนาคารสำหรับรับค่าบริการ<br />
        3. ยืนยันและรอการตอบรับจากผู้ดูแลระบบ<br />
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
