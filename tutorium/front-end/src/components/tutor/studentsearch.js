import React, { Component } from "react";
import { connect } from "react-redux";
import {
  FlatButton,
  Card,
  CardHeader,
  CardText,
  Dialog,
  SelectField,
  MenuItem,
  TextField
} from "material-ui";
import {
  parseLevel,
  parseGender,
  parseSubject,
  parseDay
} from "../../util/parser";
import axios from "axios";

const querystring = require("querystring");
window.axios = axios;

var preparedStudent = []; //derived students data for searching
var studentsToRender = []; //list of students to be rendered

class StudentSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchphrase: "",
      openDialog: false,
      studentToOffer: null,
      studentIDToOffer: null,
      subjectToOffer: null,
      selSubjectToOffer: "",
      price: "0"
    };
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.doFilter = this.doFilter.bind(this);
    this.prepareStudent = this.prepareStudent.bind(this);
    this.renderStudent = this.renderStudent.bind(this);
  }

  offerActions = [
    <FlatButton
      label="ยกเลิก"
      primary={true}
      onClick={() =>
        this.setState({
          openDialog: false,
          studentToOffer: null,

          subjectToOffer: null,
          selSubjectToOffer: "",
          price: "0"
        })
      }
    />,
    <FlatButton
      label="ตกลง"
      primary={true}
      onClick={async () => {
        var res = await axios({
          method: "POST",
          url: "/api/match/offer",
          headers: {
            "Content-type": "application/x-www-form-urlencoded"
          },
          data: querystring.stringify({
            studentID: this.state.studentIDToOffer,
            subject: JSON.stringify(this.state.selSubjectToOffer),
            price: parseInt(this.state.price)
          })
        });
        if (res.data.success) alert("Offer to a student completed.");
        else if (!res.data.success)
          alert("Offer failed, please try again later.");
        this.setState({
          openDialog: false,
          studentToOffer: null,

          subjectToOffer: null,
          selSubjectToOffer: "",
          price: "0"
        });
      }}
    />
  ];

  doFilter(filters) {
    var srList = [];
    if (this.state.searchphrase !== "") {
      filters.map(word => {
        if (word === "") return;
        preparedStudent.map(t => {
          var i;
          for (i = 0; i < srList.length; i++)
            if (srList[i].detail === t.detail) return;
          if (t.detail.indexOf(word) !== -1) {
            srList.push(t);
          }
        });
      });
    } else {
      preparedStudent.map(t => {
        srList.push(t);
      });
    }
    return srList;
  }

  renderSubjectList() {
    var l = [];
    if (this.state.subjectToOffer != null) {
      this.state.subjectToOffer.map(s => {
        l.push(
          <MenuItem
            value={s}
            primaryText={parseSubject(s.subject) + parseLevel(s.level)}
          />
        );
      });
    }
    return l;
  }

  prepareStudent() {
    if (this.props.students == null) return [];
    if (this.props.students.success) {
      var sList = [];
      this.props.students.students.map(student => {
        if (student.wantList == null) return;
        if (
          student.wantList === "" ||
          student.time === "" ||
          student.place === ""
        )
          return;
        var wannastudy = "";
        JSON.parse(student.wantList).map(subject => {
          wannastudy +=
            parseSubject(subject.subject) + parseLevel(subject.level) + " ";
        });
        var places = "";
        JSON.parse(student.place).map(place => {
          places += place + " ";
        });
        var day = "";
        var daytime = "";
        JSON.parse(student.time).map(dt => {
          day += parseDay(dt.day) + " ";
          daytime += parseDay(dt.day) + " " + dt.time + ", ";
        });

        sList.push({
          detail:
            student.name +
            " " +
            student.surname +
            " ติวเตอร์" +
            parseGender(student.gender) +
            " " +
            wannastudy +
            " " +
            places +
            " " +
            day,
          render: [
            <Card
              key={student.studentID}
              style={{ marginTop: 10, marginBottom: 5 }}
            >
              <CardHeader
                title={student.name + " " + student.surname}
                subtitle={wannastudy}
                actAsExpander={true}
                showExpandableButton={true}
              />
              <CardText expandable={true} style={{ color: "#505050" }}>
                <span>เพศ: {parseGender(student.gender)}</span>
                <br />
                <span>สถานที่ที่ต้องการเรียน: {places}</span>
                <br />
                <span>เวลาที่ต้องการเรียน: {daytime}</span>
                <div>
                  <FlatButton
                    onClick={() =>
                      this.setState({
                        openDialog: true,
                        studentIDToOffer: student.studentID,
                        studentToOffer: student.name + " " + student.surname,
                        subjectToOffer: JSON.parse(student.wantList)
                      })
                    }
                    style={{
                      marginTop: 5
                    }}
                    label="ยื่นข้อเสนอ"
                  />
                </div>
              </CardText>
            </Card>,
            <Dialog
              title={"ส่งข้อเสนอไปยัง " + this.state.studentToOffer}
              actions={this.offerActions}
              open={this.state.openDialog}
              onRequestClose={() =>
                this.setState({
                  openDialog: false
                })
              }
            >
              {/* Subject */}
              <SelectField
                fullWidth
                floatingLabelText="เลือกวิชาที่ต้องการส่งข้อเสนอ"
                value={this.state.selSubjectToOffer}
                required
                onChange={(event, key, selSubjectToOffer) =>
                  this.setState({ selSubjectToOffer })
                }
              >
                {this.renderSubjectList()}
              </SelectField>
              <TextField
                fullWidth
                floatingLabelText="ราคาต่อชั่วโมง"
                // required
                onChange={(event, price) => this.setState({ price })}
                value={this.state.price}
              />
            </Dialog>
          ],
          ID: student.studentID
        });
      });
      return sList;
    }
  }

  renderStudent(students) {
    var ts = [];
    students.map(student => {
      ts.push(student.render);
    });
    return ts;
  }

  handleFieldChange(searchphrase) {
    this.setState({ searchphrase });
  }

  render() {
    preparedStudent = this.prepareStudent();
    studentsToRender = this.doFilter(this.state.searchphrase.split(" "));
    return (
      <div>
        {/* Search Fields */}
        <div>
          <div className="search-header">
            <div className="input-group stylish-input-group">
              <input
                type="text"
                className="form-control"
                placeholder="ใส่คำค้นหาของคุณที่นี่ เช่น คณิตศาสตร์ มัธยมศึกษาตอนต้น วันเสาร์"
                onChange={event => this.handleFieldChange(event.target.value)}
              />
              <span className="input-group-addon">
                <button>
                  <span class="glyphicon glyphicon-search" />
                </button>
              </span>
            </div>
          </div>
        </div>
        {/* Showlist */}
        <div>{this.renderStudent(studentsToRender)}</div>
      </div>
    );
  }
}

function mapStateToProps({ students, auth }) {
  return { students, auth };
}

export default connect(mapStateToProps)(StudentSearch);
