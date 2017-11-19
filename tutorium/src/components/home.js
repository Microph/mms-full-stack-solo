import React, { Component } from "react";
// import {
//   FlatButton,
//   Card,
//   CardActions,
//   CardHeader,
//   CardMedia,
//   CardTitle,
//   CardText
// } from "material-ui";

class Home extends Component {
  render() {
    var tutorList = [];
    tutor.map(item => {
      tutorList.push(<h3>{item.subject}</h3>);
      item.name.map(person => {
        tutorList.push(<h5>{person}</h5>);
      });
    });
    return tutorList;
  }
}

const tutor = [
  { subject: "math", name: ["Tutor #1", "สอน เก่ง", "ท็อป ทุกวิชา"] },
  {
    subject: "eng",
    name: ["เมพขิง จิงกาเบล", "ติวเตอร์ หมายเลขห้า", "เก่ง ไปหมด"]
  }
];

export default Home;
