import React, { Component } from "react";
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
} from "../../../util/parser";
import axios from "axios";

const querystring = require("querystring");
window.axios = axios;

class ReceivedRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: [],
      openDialog: false,
      studentToOffer: null,
      idToOffer: null,
      subjectToOffer: null,
      price: "0"
    };
  }

  offerActions = [
    <FlatButton
      onClick={() =>
        this.setState({
          openDialog: false,
          studentToOffer: null,
          idToOffer: null,
          subjectToOffer: null,
          price: null
        })
      }
      primary
      label="ยกเลิก"
    />,
    <FlatButton
      onClick={() =>
        this.sendOffer(
          this.state.idToOffer,
          this.state.subjectToOffer,
          this.state.price
        )
      }
      primary
      label="ส่งข้อเสนอ"
    />
  ];

  async loadRequests() {
    const res = await axios("/api/match/request/bytutor");
    if (res.data.success) {
      this.setState({ requests: res.data.requests });
    }
  }

  async sendOffer(id, sbj, p) {
    var res = await axios({
      method: "POST",
      url: "/api/match/offer",
      headers: {
        "Content-type": "application/x-www-form-urlencoded"
      },
      data: querystring.stringify({
        studentID: id,
        subject: sbj,
        price: parseInt(p)
      })
    });
    this.declineRequest(id, sbj);
    if (res.data.success) alert("Offer to a student completed.");
    else if (!res.data.success) alert("Offer failed, please try again later.");
  }

  async declineRequest(id, sbj) {
    const res = await axios({
      method: "DELETE",
      url: "/api/match/request/delete/bytutor",
      headers: {
        "Content-type": "application/x-www-form-urlencoded"
      },
      data: querystring.stringify({
        studentID: id,
        subject: sbj
      })
    });
    // if (res.data.success) alert("The offer has already been deleted");
    // else if (!res.data.success) alert("Please try again later . . .");

    window.location.href = "/tutor/mycouses";
  }

  componentDidMount() {
    this.loadRequests();
  }

  render() {
    var renderList = [];
    this.state.requests.map(r => {
      const sbj = JSON.parse(r.subject);
      const studentid = r.studentID;
      const studentName = r.student.name + " " + r.student.surname;
      renderList.push(
        <Card key={r.tutorID} style={{ marginTop: 10, marginBottom: 5 }}>
          <CardHeader
            title={
              parseSubject(sbj.subject) +
              parseLevel(sbj.level) +
              " ( " +
              studentName +
              " ) "
            }
            subtitle={[
              <FlatButton
                onClick={() =>
                  this.setState({
                    openDialog: true,
                    studentToOffer: studentName,
                    idToOffer: studentid,
                    subjectToOffer: r.subject
                  })
                }
                primary
                style={{
                  marginTop: 5
                }}
                label="ยื่นข้อเสนอ"
              />,
              <FlatButton
                onClick={() => this.declineRequest(studentid, r.subject)}
                primary
                style={{
                  marginTop: 5
                }}
                label="ปฏิเสธ"
              />
            ]}
          />
        </Card>
      );
    });
    return (
      <div>
        <div style={{ fontSize: 25, marginTop: 20 }}>คำขอที่ได้รับ</div>
        {renderList.length === 0 ? "คุณไม่มีคำขอที่ได้รับ" : renderList}
        <Dialog
          title={
            "ส่งข้อเสนอไปยัง " +
            this.state.studentToOffer +
            " ในวิชา " +
            parseSubject(
              JSON.parse(
                this.state.subjectToOffer == null
                  ? '{"subject":""}'
                  : this.state.subjectToOffer
              ).subject
            ) +
            parseLevel(
              JSON.parse(
                this.state.subjectToOffer == null
                  ? '{"level":""}'
                  : this.state.subjectToOffer
              ).level
            )
          }
          actions={this.offerActions}
          open={this.state.openDialog}
          onRequestClose={() =>
            this.setState({
              openDialog: false
            })
          }
        >
          <TextField
            fullWidth
            floatingLabelText="ราคาต่อชั่วโมง"
            // required
            onChange={(event, price) => this.setState({ price })}
            value={this.state.price}
          />
        </Dialog>
      </div>
    );
  }
}

export default ReceivedRequests;
