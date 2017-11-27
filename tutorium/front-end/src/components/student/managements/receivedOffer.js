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

class RecievedOffers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      receivedOffers: []
    };
  }

  async loadOffers() {
    var res = await axios.get("/api/match/offer/bystudent");
    if (res.data.success) {
      this.setState({ receivedOffers: res.data.offers });
    }
  }

  async acceptOffer(id, sbj) {
    var res = await axios({
      method: "POST",
      url: "/api/match/offer/accept",
      headers: {
        "Content-type": "application/x-www-form-urlencoded"
      },
      data: querystring.stringify({
        tutorID: id,
        subject: sbj
      })
    });
    if (res.data.success) alert("Confirm completed");
    else if (!res.data.success) alert("Please try again later . . .");

    window.location.href = "/myoffers";
  }

  async declineOffer(id, sbj) {
    var res = await axios({
      method: "POST",
      url: "/api/match/offer/decline",
      headers: {
        "Content-type": "application/x-www-form-urlencoded"
      },
      data: querystring.stringify({
        tutorID: id,
        subject: sbj
      })
    });
    if (res.data.success) alert("The offer has already been deleted");
    else if (!res.data.success) alert("Please try again later . . .");

    window.location.href = "/myoffers";
  }

  componentDidMount() {
    this.loadOffers();
  }

  render() {
    var renderList = [];
    this.state.receivedOffers.map(o => {
      if (o.studentConfirm) return;
      const sbj = JSON.parse(o.subject);
      const tutorid = o.tutorID;
      var tutor = o.tutor.student.name + " " + o.tutor.student.surname;
      renderList.push(
        <Card key={o.studentID} style={{ marginTop: 10, marginBottom: 5 }}>
          <CardHeader
            title={
              parseSubject(sbj.subject) +
              parseLevel(sbj.level) +
              " ( " +
              tutor +
              " ) " +
              o.price +
              " บาท / ชั่วโมง"
            }
            subtitle={
              <div>
                <FlatButton
                  onClick={() => this.acceptOffer(tutorid, o.subject)}
                  label="ตอบรับ"
                />
                <FlatButton
                  onClick={() => this.declineOffer(tutorid, o.subject)}
                  label="ปฏิเสธ"
                />
              </div>
            }
          />
        </Card>
      );
    });
    return (
      <div>
        <div style={{ fontSize: 25, marginTop: 20 }}>ข้อเสนอที่ได้รับ</div>
        {renderList.length === 0 ? "คุณไม่มีข้อเสนอที่ได้รับ" : renderList}
      </div>
    );
  }
}

export default RecievedOffers;
