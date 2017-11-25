import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Chip,
  Dialog,
  FlatButton,
  TextField,
  SelectField,
  MenuItem,
  TimePicker
} from "material-ui";
import axios from "axios";
import {
  parseLevel,
  parseDay,
  parseGender,
  parseSubject
} from "../../../util/parser";

const querystring = require("querystring");
window.axios = axios;

class StudyInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openAddWantList: false,
      openAddPlace: false,
      openAddTime: false,
      addSubject: "math",
      addLevel: "pratom",
      addDay: "sunday",
      addTimeFrom: Date.now(),
      addTimeTo: Date.now(),
      addPlace: ""
    };
  }

  wantListActions = [
    <FlatButton
      label="ยกเลิก"
      primary={true}
      onClick={() =>
        this.setState({
          openAddWantList: false,
          addSubject: "math",
          addLevel: "pratom"
        })
      }
    />,
    <FlatButton
      label="ตกลง"
      primary={true}
      onClick={() =>
        this.addWantList(this.state.addSubject, this.state.addLevel)
      }
    />
  ];

  timeActions = [
    <FlatButton
      label="ยกเลิก"
      primary={true}
      onClick={() =>
        this.setState({
          openAddTime: false,
          addDay: "sunday",
          addTimeFrom: Date.now(),
          addTimeTo: Date.now()
        })
      }
    />,
    <FlatButton
      label="ตกลง"
      primary={true}
      onClick={() =>
        this.addTime(
          this.state.addDay,
          this.state.addTimeFrom.toTimeString().substr(0, 5),
          this.state.addTimeTo.toTimeString().substr(0, 5)
        )
      }
    />
  ];

  placeActions = [
    <FlatButton
      label="ยกเลิก"
      primary={true}
      onClick={() => this.setState({ openAddPlace: false, addPlace: "" })}
    />,
    <FlatButton
      label="ตกลง"
      primary={true}
      onClick={() => this.addPlace(this.state.addPlace)}
    />
  ];

  fetchStudyDetails() {
    if (this.props.auth == null) return;
    if (this.props.auth.success) {
      const sid = this.props.auth.user.studentID;
      if (this.props.students == null) return;
      if (this.props.students.success)
        this.props.students.students.map(person => {
          if (person.studentID === sid) {
            wantList = JSON.parse(person.wantList);
            place = JSON.parse(person.place);
            time = JSON.parse(person.time);
          }
        });
    }
  }

  async handleRequestDeleteWantList(index) {
    // console.log(index);
    wantList.splice(index, 1);
    var res = await axios({
      method: "PUT",
      url: "/api/student/wantList/update",
      headers: {
        "Content-type": "application/x-www-form-urlencoded"
      },
      data: querystring.stringify({
        wantList: JSON.stringify(wantList)
      })
    });
    // console.log(wantList);
    window.location.href = "/myprofile";
  }

  async handleRequestDeletePlace(index) {
    place.splice(index, 1);
    var res = await axios({
      method: "PUT",
      url: "/api/student/place/update",
      headers: {
        "Content-type": "application/x-www-form-urlencoded"
      },
      data: querystring.stringify({
        place: JSON.stringify(place)
      })
    });
    window.location.href = "/myprofile";
  }

  async handleRequestDeleteTime(index) {
    time.splice(index, 1);
    var res = await axios({
      method: "PUT",
      url: "/api/student/time/update",
      headers: {
        "Content-type": "application/x-www-form-urlencoded"
      },
      data: querystring.stringify({
        time: JSON.stringify(time)
      })
    });
    window.location.href = "/myprofile";
  }

  renderWantList() {
    if (wantList == null) return <div />;
    var renderList = [];
    for (var i = 0; i < wantList.length; i++) {
      renderList.push(
        <Chip
          key={i}
          style={{ marginTop: -4, marginLeft: 2 }}
          onRequestDelete={() => this.handleRequestDeleteWantList(i - 1)}
        >
          {parseSubject(wantList[i].subject) + parseLevel(wantList[i].level)}
        </Chip>
      );
    }
    renderList.push(
      <Chip
        key={-1}
        style={{ marginTop: -4, marginLeft: 2 }}
        onClick={() => this.setState({ openAddWantList: true })}
      >
        {"+"}
      </Chip>
    );
    return renderList;
  }

  renderPlace() {
    if (place == null) return <div />;
    var renderList = [];
    for (var i = 0; i < place.length; i++) {
      renderList.push(
        <Chip
          key={i}
          style={{ marginTop: -4, marginLeft: 2 }}
          onRequestDelete={() => this.handleRequestDeletePlace(i - 1)}
        >
          {place[i]}
        </Chip>
      );
    }
    renderList.push(
      <Chip
        key={-1}
        style={{ marginTop: -4, marginLeft: 2 }}
        onClick={() => this.setState({ openAddPlace: true })}
      >
        {"+"}
      </Chip>
    );
    return renderList;
  }

  renderTime() {
    if (time == null) return <div />;
    var renderList = [];
    for (var i = 0; i < time.length; i++) {
      renderList.push(
        <Chip
          key={i}
          style={{ marginTop: -4, marginLeft: 2 }}
          onRequestDelete={() => this.handleRequestDeleteTime(i - 1)}
        >
          {parseDay(time[i].day) + " " + time[i].time}
        </Chip>
      );
    }
    renderList.push(
      <Chip
        key={-1}
        style={{ marginTop: -4, marginLeft: 2 }}
        onClick={() => this.setState({ openAddTime: true })}
      >
        {"+"}
      </Chip>
    );
    return renderList;
  }

  async addWantList(sbj, lvl) {
    for (var i = 0; i < wantList.length; i++) {
      if (wantList[i].subject == sbj && wantList[i].level == lvl) {
        this.setState({
          openAddWantList: false,
          addSubject: "math",
          addLevel: "pratom"
        });
        return;
      }
    }
    wantList.push({
      subject: sbj,
      level: lvl
    });
    var res = await axios({
      method: "PUT",
      url: "/api/student/wantList/update",
      headers: {
        "Content-type": "application/x-www-form-urlencoded"
      },
      data: querystring.stringify({
        wantList: JSON.stringify(wantList)
      })
    });
    window.location.href = "/myprofile";
  }

  async addPlace(text) {
    for (var i = 0; i < place.length; i++) {
      if (place[i] == text) {
        this.setState({ openAddPlace: false, addPlace: "" });
        return;
      }
    }
    place.push(text);
    var res = await axios({
      method: "PUT",
      url: "/api/student/place/update",
      headers: {
        "Content-type": "application/x-www-form-urlencoded"
      },
      data: querystring.stringify({
        place: JSON.stringify(place)
      })
    });
    window.location.href = "/myprofile";
  }

  async addTime(d, from, to) {
    var t = from + "-" + to;
    time.push({ day: d, time: t });
    var res = await axios({
      method: "PUT",
      url: "/api/student/time/update",
      headers: {
        "Content-type": "application/x-www-form-urlencoded"
      },
      data: querystring.stringify({
        time: JSON.stringify(time)
      })
    });
    window.location.href = "/myprofile";
  }

  render() {
    this.fetchStudyDetails();
    var wantListToRender = this.renderWantList();
    var placeToRender = this.renderPlace();
    var timeToRender = this.renderTime();
    return (
      <div>
        <div
          style={{
            fontSize: 15,
            display: "flex",
            flexWrap: "wrap",
            margin: 5,
            marginLeft: 0
          }}
        >
          {"วิชาที่ต้องการเรียน: "}
          {wantListToRender}
          <Dialog
            title="เพิ่มวิชาที่ต้องการเรียน"
            actions={this.wantListActions}
            open={this.state.openAddWantList}
            onRequestClose={() =>
              this.setState({
                openAddWantList: false,
                addSubject: "math",
                addLevel: "pratom"
              })
            }
          >
            {/* Subject */}
            <SelectField
              fullWidth
              floatingLabelText="วิชา"
              value={this.state.addSubject}
              required
              onChange={(event, key, addSubject) =>
                this.setState({ addSubject })
              }
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
            {/* Education Level */}
            <SelectField
              fullWidth
              floatingLabelText="ระดับการศึกษา"
              value={this.state.addLevel}
              required
              onChange={(event, key, addLevel) => this.setState({ addLevel })}
            >
              <MenuItem value="pratom" primaryText="ประถมศึกษา" />
              <MenuItem value="matthayomton" primaryText="มัธยมศึกษาตอนต้น" />
              <MenuItem value="matthayomplai" primaryText="มัธยมศึกษาตอนปลาย" />
              <MenuItem value="bachelor" primaryText="ปริญญาตรี" />
              <MenuItem value="master" primaryText="ปริญญาโท" />
              <MenuItem value="doctor" primaryText="ปริญญาเอก" />
            </SelectField>
          </Dialog>
        </div>
        <div
          style={{
            fontSize: 15,
            display: "flex",
            flexWrap: "wrap",
            margin: 5,
            marginLeft: 0
          }}
        >
          {"วัน - เวลาที่ต้องการเรียน: "}
          {timeToRender}
          <Dialog
            title="เพิ่มวัน - เวลาที่ต้องการเรียน"
            actions={this.timeActions}
            open={this.state.openAddTime}
            onRequestClose={() =>
              this.setState({
                openAddTime: false,
                addTimeFrom: Date.now(),
                addTimeTo: Date.now(),
                addDay: "sunday"
              })
            }
          >
            {/* Day */}
            <SelectField
              fullWidth
              floatingLabelText="วันที่ต้องการเรียน"
              value={this.state.addDay}
              required
              onChange={(event, key, addDay) => this.setState({ addDay })}
            >
              <MenuItem value="sunday" primaryText="วันอาทิตย์" />
              <MenuItem value="monday" primaryText="วันจันทร์" />
              <MenuItem value="tuesday" primaryText="วันอังคาร" />
              <MenuItem value="wednesday" primaryText="วันพุธ" />
              <MenuItem value="thursday" primaryText="วันพฤหัสบดี" />
              <MenuItem value="friday" primaryText="วันศุกร์" />
              <MenuItem value="saturday" primaryText="วันเสาร์" />
            </SelectField>
            {/* Time */}
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
            <TimePicker
              format="24hr"
              hintText="เวลาสิ้นสุด"
              value={this.state.addTimeTo}
              onChange={(event, date) => {
                this.setState({ addTimeTo: date });
              }}
            />
          </Dialog>
        </div>
        <div
          style={{
            fontSize: 15,
            display: "flex",
            flexWrap: "wrap",
            margin: 5,
            marginLeft: 0
          }}
        >
          {"สถานที่ที่ต้องการเรียน: "}
          {placeToRender}
          <Dialog
            title="เพิ่มสถานที่ที่ต้องการเรียน"
            actions={this.placeActions}
            open={this.state.openAddPlace}
            onRequestClose={() =>
              this.setState({ openAddPlace: false, addPlace: "" })
            }
          >
            <TextField
              fullWidth
              hintText="กรุณากรอกสถานที่ที่ต้องการเรียน"
              floatingLabelText="สถานที่ที่ต้องการเรียน"
              // required
              onChange={(event, addPlace) => this.setState({ addPlace })}
              value={this.state.addPlace}
            />
          </Dialog>
        </div>
      </div>
    );
  }
}

var wantList = null;
var place = null;
var time = null;

function mapStateToProps({ students, auth }) {
  return { students, auth };
}

export default connect(mapStateToProps)(StudyInfo);
