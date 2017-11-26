import React, { Component } from "react";
import {
  Paper,
  TextField,
  SelectField,
  MenuItem,
  FlatButton,
  Checkbox,
  Chip,
  TimePicker
} from "material-ui";
import UserPayment from "./general/profiles-component/userpayment";
import {
  parseLevel,
  parseDay,
  parseGender,
  parseSubject
} from "../util/parser";
import axios from "axios";

const querystring = require("querystring");
window.axios = axios;

class ToBeTutor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agreement: false,
      exp: "",
      places: [],
      addPlace: "",
      teaching: [],
      addSubject: "math",
      addLevel: "pratom",
      eduLevel: [],
      addEduLevel: "matthayomplai",
      addUniv: "",
      addGradYear: "",
      addFac: "",
      addMaj: "",
      teachable: [],
      addDay: "sunday",
      addTimeFrom: Date.now(),
      addTimeTo: Date.now()
    };
  }

  appendPlace(p) {
    if (p === "") return;
    var { places } = this.state;
    for (var i = 0; i < places.length; i++)
      if (places[i] === p) {
        this.setState({ addPlace: "" });
        return;
      }
    places.push(p);
    this.setState({ places, addPlace: "" });
  }

  appendTeaching(s, l) {
    var { teaching } = this.state;
    for (var i = 0; i < teaching.length; i++) {
      if (teaching[i].subject === s && teaching[i].level === l) return;
    }
    teaching.push({ subject: s, level: l });
    this.setState({ teaching, addLevel: "pratom", addSubject: "math" });
  }

  appendEdu(l, u, y, f, m) {
    if (u === "" || y === "") return;
    var { eduLevel } = this.state;
    for (var i = 0; i < eduLevel.length; i++)
      if (
        eduLevel[i].level === l &&
        eduLevel[i].university === u &&
        eduLevel[i].gradyear === y &&
        eduLevel[i].faculty === f &&
        eduLevel[i].major === m
      )
        return;
    eduLevel.push({
      level: l,
      university: u,
      gradyear: y,
      faculty: f,
      major: m
    });
    this.setState({
      eduLevel,
      addEduLevel: "matthayomplai",
      addUniv: "",
      addGradYear: "",
      addFac: "",
      addMaj: ""
    });
  }

  appendTeachable(d, f, t) {
    var { teachable } = this.state;
    for (var i = 0; i < teachable.length; i++) {
      if (teachable[i].day === d && teachable[i].time === f + "-" + t) return;
    }
    teachable.push({ day: d, time: f + "-" + t });
    this.setState({ teachable });
  }

  removePlace = key => {
    var { places } = this.state;
    places.splice(key, 1);
    this.setState({ places });
  };

  removeTeaching = key => {
    var { teaching } = this.state;
    teaching.splice(key, 1);
    this.setState({ teaching });
  };

  removeEdu = key => {
    var { eduLevel } = this.state;
    eduLevel.splice(key, 1);
    this.setState({ eduLevel });
  };

  removeTeachable = key => {
    var { teachable } = this.state;
    teachable.splice(key, 1);
    this.setState({ teachable });
  };

  renderTeachable() {
    var { teachable } = this.state;
    var renderList = [];
    for (var i = 0; i < teachable.length; i++) {
      renderList.push(
        <Chip
          key={i}
          style={{ marginTop: -4, marginLeft: 2 }}
          onRequestDelete={() => this.removeTeachable(i - 1)}
        >
          {parseDay(teachable[i].day) + " " + teachable[i].time}
        </Chip>
      );
    }
    return renderList;
  }

  renderPlace() {
    var { places } = this.state;
    var renderList = [];
    for (var i = 0; i < places.length; i++) {
      renderList.push(
        <Chip
          key={i}
          style={{ marginTop: -4, marginLeft: 2 }}
          onRequestDelete={() => this.removePlace(i - 1)}
        >
          {places[i]}
        </Chip>
      );
    }
    return renderList;
  }

  renderEdu() {
    var { eduLevel } = this.state;
    var renderList = [];
    for (var i = 0; i < eduLevel.length; i++) {
      renderList.push(
        <Chip
          key={ i }
          style={{ marginTop: -4, marginLeft: 2 }}
          onRequestDelete={() => this.removeEdu( i - 1 )}
        >
          {parseLevel(eduLevel[i].level) +
            " " +
            eduLevel[i].university +
            " " +
            eduLevel[i].gradyear +
            " " +
            eduLevel[i].faculty +
            " " +
            eduLevel[i].major}
        </Chip>
      );
    }
    return renderList;
  }

  renderTeaching() {
    var { teaching } = this.state;
    var renderList = [];
    for (var i = 0; i < teaching.length; i++) {
      renderList.push(
        <Chip
          key={i}
          style={{ marginTop: -4, marginLeft: 2 }}
          onRequestDelete={() => this.removeTeaching(i - 1)}
        >
          {parseSubject(teaching[i].subject) + parseLevel(teaching[i].level)}
        </Chip>
      );
    }
    return renderList;
  }

  handleSubmit = async () => {
    var res = await axios({
      method: "POST",
      url: "/api/tutor/register",
      headers: {
        "Content-type": "application/x-www-form-urlencoded"
      },
      data: querystring.stringify({
        education: JSON.stringify(this.state.eduLevel),
        teachList: JSON.stringify(this.state.teaching),
        place: JSON.stringify(this.state.places),
        time: JSON.stringify(this.state.teachable)
      })
    });
    if (res.data.success) {
      alert(res.data.msg);
      window.location.href = "/";
    } else alert(res.data.msg);
  };

  render() {
    var places = this.renderPlace();
    var teaching = this.renderTeaching();
    var eduLevel = this.renderEdu();
    var teachable = this.renderTeachable();
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
          <div
            style={{
              width: "100%",
              display: "flex",
              flexWrap: "wrap"
            }}
          >
            {/* Education Level */}
            <div className="col-xs-3">
              <SelectField
                fullWidth
                floatingLabelText="ระดับการศึกษา"
                value={this.state.addEduLevel}
                required
                onChange={(event, key, addEduLevel) =>
                  this.setState({ addEduLevel })
                }
                style={{ marginBottom: 5, marginTop: -25 }}
              >
                <MenuItem
                  value="matthayomplai"
                  primaryText="มัธยมศึกษาตอนปลาย"
                />
                <MenuItem value="bachelor" primaryText="ปริญญาตรี" />
                <MenuItem value="master" primaryText="ปริญญาโท" />
                <MenuItem value="doctor" primaryText="ปริญญาเอก" />
              </SelectField>
            </div>
            <div className="col-xs-3">
              <TextField
                fullWidth
                floatingLabelText="มหาวิทยาลัย / โรงเรียน"
                onChange={(event, addUniv) => this.setState({ addUniv })}
                value={this.state.addUniv}
                style={{ marginBottom: 5, marginTop: -25 }}
              />
            </div>
            <div className="col-xs-1">
              <TextField
                fullWidth
                floatingLabelText="พ.ศ.ที่จบ"
                onChange={(event, addGradYear) =>
                  this.setState({ addGradYear })
                }
                value={this.state.addGradYear}
                style={{ marginBottom: 5, marginTop: -25 }}
              />
            </div>
            <div className="col-xs-2">
              <TextField
                fullWidth
                floatingLabelText="คณะ"
                onChange={(event, addFac) => this.setState({ addFac })}
                value={this.state.addFac}
                style={{ marginBottom: 5, marginTop: -25 }}
              />
            </div>
            <div className="col-xs-2">
              <TextField
                fullWidth
                floatingLabelText="ภาควิชา / สาขา"
                onChange={(event, addMaj) => this.setState({ addMaj })}
                value={this.state.addMaj}
                style={{ marginBottom: 5, marginTop: -25 }}
              />
            </div>
            <div className="col-xs-1">
              <FlatButton
                label="+"
                backgroundColor="limegreen"
                style={{ color: "#fff" }}
                // l, u, y, f, m
                onClick={() =>
                  this.appendEdu(
                    this.state.addEduLevel,
                    this.state.addUniv,
                    this.state.addGradYear,
                    this.state.addFac,
                    this.state.addMaj
                  )
                }
              />
            </div>
            {eduLevel}
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
          <div
            style={{
              width: "100%",
              display: "flex",
              flexWrap: "wrap"
            }}
          >
            {/* Subject */}
            <div className="col-xs-5">
              <SelectField
                fullWidth
                floatingLabelText="วิชา"
                value={this.state.addSubject}
                required
                onChange={(event, key, addSubject) =>
                  this.setState({ addSubject })
                }
                style={{ marginBottom: 5, marginTop: -25 }}
              >
                <MenuItem value="math" primaryText="คณิตศาสตร์" />
                <MenuItem value="science" primaryText="วิทยาศาสตร์" />
                <MenuItem value="physics" primaryText="ฟิสิกส์" />
                <MenuItem value="chemistry" primaryText="เคมี" />
                <MenuItem value="biology" primaryText="ชีววิทยา" />
                <MenuItem value="thai" primaryText="ภาษาไทย" />
                <MenuItem value="english" primaryText="ภาษาอังกฤษ" />
                <MenuItem value="socialstudies" primaryText="สังคมศึกษา" />
              </SelectField>
            </div>
            {/* Education Level */}
            <div className="col-xs-5">
              <SelectField
                fullWidth
                floatingLabelText="ระดับการศึกษา"
                value={this.state.addLevel}
                required
                onChange={(event, key, addLevel) => this.setState({ addLevel })}
                style={{ marginBottom: 5, marginTop: -25 }}
              >
                <MenuItem value="pratom" primaryText="ประถมศึกษา" />
                <MenuItem value="matthayomton" primaryText="มัธยมศึกษาตอนต้น" />
                <MenuItem
                  value="matthayomplai"
                  primaryText="มัธยมศึกษาตอนปลาย"
                />
                <MenuItem value="bachelor" primaryText="ปริญญาตรี" />
                <MenuItem value="master" primaryText="ปริญญาโท" />
                <MenuItem value="doctor" primaryText="ปริญญาเอก" />
              </SelectField>
            </div>
            <div className="col-xs-2">
              <FlatButton
                label="+"
                backgroundColor="limegreen"
                style={{ color: "#fff" }}
                onClick={() =>
                  this.appendTeaching(
                    this.state.addSubject,
                    this.state.addLevel
                  )
                }
              />
            </div>
            {teaching}
          </div>

          {/* Exp Info */}
          <TextField
            fullWidth
            floatingLabelText="ประสบการสอนโดยสังเขป"
            underlineShow
            multiLine
            rows={2}
            onChange={(event, exp) => this.setState({ exp })}
            value={this.state.exp}
          />

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
          <div
            style={{
              width: "100%",
              display: "flex",
              flexWrap: "wrap"
            }}
          >
            <div className="col-xs-10">
              <TextField
                fullWidth
                floatingLabelText="เพิ่มสถานที่"
                onChange={(event, addPlace) => this.setState({ addPlace })}
                value={this.state.addPlace}
                style={{ marginTop: -25, marginBottom: 5 }}
              />
            </div>
            <div className="col-xs-2">
              <FlatButton
                label="+"
                backgroundColor="limegreen"
                style={{ color: "#fff" }}
                onClick={() => this.appendPlace(this.state.addPlace)}
              />
            </div>
            {places}
          </div>

          {/* Teachable Day */}
          <div
            style={{
              fontSize: 25,
              marginTop: 20,
              alignSelf: "flex-start",
              color: "#505050"
            }}
          >
            เวลาที่สามารถสอนได้
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexWrap: "wrap"
            }}
          >
            {/* Day */}
            <div className="col-xs-5">
              <SelectField
                fullWidth
                floatingLabelText="วันที่ต้องการเรียน"
                value={this.state.addDay}
                required
                onChange={(event, key, addDay) => this.setState({ addDay })}
                style={{ marginTop: -25, marginBottom: 5 }}
              >
                <MenuItem value="sunday" primaryText="วันอาทิตย์" />
                <MenuItem value="monday" primaryText="วันจันทร์" />
                <MenuItem value="tuesday" primaryText="วันอังคาร" />
                <MenuItem value="wednesday" primaryText="วันพุธ" />
                <MenuItem value="thursday" primaryText="วันพฤหัสบดี" />
                <MenuItem value="friday" primaryText="วันศุกร์" />
                <MenuItem value="saturday" primaryText="วันเสาร์" />
              </SelectField>
            </div>
            {/* Time */}
            <div className="col-xs-3">
              <TimePicker
                format="24hr"
                hintText="เวลาเริ่ม"
                value={this.state.addTimeFrom}
                onChange={(event, date) => {
                  console.log(date);
                  this.setState({
                    addTimeFrom: date
                  });
                }}
              />
            </div>
            <div className="col-xs-3">
              <TimePicker
                format="24hr"
                hintText="เวลาสิ้นสุด"
                value={this.state.addTimeTo}
                onChange={(event, date) => {
                  this.setState({ addTimeTo: date });
                }}
              />
            </div>
            <div className="col-xs-1">
              <FlatButton
                label="+"
                backgroundColor="limegreen"
                style={{ color: "#fff" }}
                onClick={() =>
                  this.appendTeachable(
                    this.state.addDay,
                    this.state.addTimeFrom.toTimeString().substr(0, 5),
                    this.state.addTimeTo.toTimeString().substr(0, 5)
                  )
                }
              />
            </div>
            {teachable}
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
