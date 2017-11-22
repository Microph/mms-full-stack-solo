import React, { Component } from "react";
import { connect } from "react-redux";
import {
  FlatButton,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from "material-ui";
import {
  parseLevel,
  parseGender,
  parseSubject,
  parseDay
} from "../util/parser";

var preparedTutor = []; //derived tutor data for searching
var tutorToRender = []; //list of tutors to be rendered

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchphrase: ""
    };
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.doFilter = this.doFilter.bind(this);
    this.prepareTutor = this.prepareTutor.bind(this);
  }

  // Filter out some tutors
  doFilter(filters) {
    var trList = [];
    if (this.state.searchphrase !== "") {
      filters.map(word => {
        if (word === "") return;
        preparedTutor.map(t => {
          if (t.detail.indexOf(word) !== -1) {
            trList.push(t.render);
          }
        });
      });
    } else {
      preparedTutor.map(t => {
        trList.push(t.render);
      });
    }
    return trList;
  }

  prepareTutor() {
    if (this.props.tutors == null) return [];
    if (this.props.tutors.success) {
      var tList = [];
      this.props.tutors.tutors.map(tutor => {
        var teaching = "";
        JSON.parse(tutor.teachList).map(subject => {
          teaching =
            teaching +
            parseSubject(subject.subject) +
            parseLevel(subject.level) +
            " ";
        });
        var places = "";
        JSON.parse(tutor.place).map(place => {
          places += place + " ";
        });
        var day = "";
        var daytime = "";
        JSON.parse(tutor.time).map(dt => {
          day += parseDay(dt.day) + " ";
          daytime += parseDay(dt.day) + " " + dt.time + ", ";
        });

        tList.push({
          detail:
            tutor.name +
            " " +
            tutor.surname +
            " ติวเตอร์" +
            parseGender(tutor.gender) +
            " " +
            teaching +
            " " +
            places +
            " " +
            day,
          render: (
            <Card key={tutor.studentID} style={{ marginTop: 10 }}>
              <CardHeader
                title={tutor.name + " " + tutor.surname}
                subtitle={teaching}
                actAsExpander={true}
                showExpandableButton={true}
              />
              <CardText expandable={true} style={{color: "#505050"}}>
                <span>เพศ: {parseGender(tutor.gender)}</span>
                <br />
                <span>สถานที่ที่สามารถสอน: {places}</span>
                <br />
                <span>เวลาที่สามารถสอน: {daytime}</span>
              </CardText>
            </Card>
          )
        });
      });
      return tList;
    }
  }

  // hadle when search field changed
  handleFieldChange(searchphrase) {
    this.setState({ searchphrase });
  }

  render() {
    preparedTutor = this.prepareTutor();
    tutorToRender = this.doFilter(this.state.searchphrase.split(" "));
    return (
      <div>
        {/* Search Fields */}
        <div>
          <div className="search-header visible-lg">
            <div className="input-group stylish-input-group">
              <input
                type="text"
                className="form-control"
                placeholder="ใส่คำค้นหาของคุณที่นี่ เช่น คณิตศาสตร์ มัธยมศึกษาตอนต้น วันเสาร์ ติวเตอร์ชาย"
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
        <div>{tutorToRender}</div>
      </div>
    );
  }
}

function mapStateToProps({ tutors, auth }) {
  return { tutors, auth };
}

export default connect(mapStateToProps)(Home);
