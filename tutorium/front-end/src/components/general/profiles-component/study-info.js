import React, { Component } from "react";
import { connect } from "react-redux";
import { Chip, Dialog, FlatButton, TextField } from "material-ui";
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
      addSubject: "",
      addLevel: "",
      addDay: "",
      addTime: "",
      addPlace: ""
    };
  }

  wantListActions = [
    <FlatButton
      label="ยกเลิก"
      primary={true}
      onClick={() => this.setState({ openAddWantList: false })}
    />,
    <FlatButton
      label="ตกลง"
      primary={true}
      onClick={() => this.addWantList()}
    />
  ];

  timeActions = [
    <FlatButton
      label="ยกเลิก"
      primary={true}
      onClick={() => this.setState({ openAddTime: false })}
    />,
    <FlatButton label="ตกลง" primary={true} onClick={() => this.addTime()} />
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
          {time[i].day + " " + time[i].time}
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

  addWantList() {}

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

  addTime() {}

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
            onRequestClose={() => this.setState({ openAddWantList: false })}
          >
            The actions in this window were passed in as an array of React
            objects.
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
            onRequestClose={() => this.setState({ openAddTime: false })}
          >
            The actions in this window were passed in as an array of React
            objects.
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
