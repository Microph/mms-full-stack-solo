import React, { Component } from "react";
import { FlatButton, Card, CardHeader, Dialog, TextField } from "material-ui";
import axios from "axios";
import {
  parseLevel,
  parseDay,
  parseGender,
  parseSubject
} from "../../../util/parser";

const querystring = require("querystring");
window.axios = axios;

class UserPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      credits: null,
      dialogOn: false,
      addCardNo: "",
      addCVV: "",
      addExpireMonth: "",
      addExpireYear: "",
      addHolder: ""
    };
  }

  paymentAction = [
    <FlatButton
      primary
      onClick={() =>
        this.setState({
          dialogOn: false,
          addCardNo: "",
          addCVV: "",
          addExpireMonth: "",
          addExpireYear: "",
          addHolder: ""
        })
      }
      label="ยกเลิก"
    />,
    <FlatButton
      primary
      onClick={() =>
        this.addPayment(
          this.state.addCardNo,
          this.state.addCVV,
          this.state.addExpireMonth,
          this.state.addExpireYear,
          this.state.addHolder
        )
      }
      label="เพิ่มวิธีการชำระเงิน"
    />
  ];

  loadPayment = async () => {
    var payments = await axios.get("/api/payment/card");
    if (this.state.credits == null) {
      if (!payments.data.success) this.setState({ credits: [] });
      if (payments.data.success)
        this.setState({ credits: payments.data.cards });
    } else if (this.state.credits === []) {
      if (payments.data.success) {
        this.setState({ credits: payments.data.cards });
      }
    }
  };

  async deleteCard(key) {
    var { credits } = this.state;
    var res = await axios({
      method: "DELETE",
      url: "/api/payment/card/delete",
      headers: {
        "Content-type": "application/x-www-form-urlencoded"
      },
      data: querystring.stringify({
        cardNO: credits[key].cardNO
      })
    });
    // console.log(res);
    if (res.data.success) {
      credits.splice(key, 1);
      this.setState({ credits });
    }
  }

  cardsToRender = () => {
    var renderList = [];
    var { credits } = this.state;
    if (credits == null) return <div />;
    for (var i = 0; i < credits.length; i++) {
      renderList.push(
        <Card key={i} style={{ marginTop: 10, marginBottom: 5 }}>
          <CardHeader
            title={[
              "XXXX-XXXX-XXXX-" + credits[i].cardNO.substr(12, 17),
              <FlatButton
                label="ลบข้อมูล"
                backgroundColor="#c00"
                hoverColor="#a00"
                style={{ marginLeft: 5, color: "#fff" }}
                onClick={() => this.deleteCard(i - 1)}
              />
            ]}
            subtitle={
              "ผู้ถือบัตร: " +
              credits[i].cardHolder +
              " Expire: " +
              credits[i].expireMonth +
              "/" +
              credits[i].expireYear
            }
          />
        </Card>
      );
    }
    return renderList;
  };

  addPayment = async (cno, cvv, m, y, h) => {
    // var { credits } = this.state;
    var res = await axios({
      method: "POST",
      url: "/api/payment/card/add",
      headers: {
        "Content-type": "application/x-www-form-urlencoded"
      },
      data: querystring.stringify({
        cardNO: cno,
        cardHolder: h,
        CVV: cvv,
        expireMonth: m,
        expireYear: y
      })
    });
    this.setState({ credits: null, dialogOn: false });
  };

  render() {
    this.loadPayment();
    var cards = this.cardsToRender();
    return (
      <div>
        <span style={{ fontSize: 25 }}>
          {this.props.topic}
          <FlatButton
            onClick={() => this.setState({ dialogOn: true })}
            style={{ borderColor: "#505050", borderWidth: "1px" }}
            label="+ เพิ่มบัญชี"
          />
        </span>
        {cards}
        <Dialog
          title="เพิ่มบัตรเครดิต"
          actions={this.paymentAction}
          open={this.state.dialogOn}
          onRequestClose={() =>
            this.setState({
              dialogOn: false,
              addCardNo: "",
              addCVV: "",
              addExpireMonth: "",
              addExpireYear: "",
              addHolder: ""
            })
          }
        >
          <TextField
            fullWidth
            hintText="หมายเลขบัตร"
            floatingLabelText="หมายเลขบัตร"
            // required
            onChange={(event, addCardNo) => this.setState({ addCardNo })}
            value={this.state.addCardNo}
          />
          <TextField
            fullWidth
            hintText="ผู้ถือบัตร"
            floatingLabelText="ผู้ถือบัตร"
            // required
            onChange={(event, addHolder) => this.setState({ addHolder })}
            value={this.state.addHolder}
          />
          <div className="col-xs-4">
            <TextField
              fullWidth
              hintText="CVV"
              floatingLabelText="CVV"
              // required
              onChange={(event, addCVV) => this.setState({ addCVV })}
              value={this.state.addCVV}
            />
          </div>
          <div className="col-xs-4">
            <TextField
              fullWidth
              hintText="Expire month"
              floatingLabelText="Expire month"
              // required
              onChange={(event, addExpireMonth) =>
                this.setState({ addExpireMonth })
              }
              value={this.state.addExpireMonth}
            />
          </div>
          <div className="col-xs-4">
            <TextField
              fullWidth
              hintText="Expire year"
              floatingLabelText="Expire year"
              // required
              onChange={(event, addExpireYear) =>
                this.setState({ addExpireYear })
              }
              value={this.state.addExpireYear}
            />
          </div>
        </Dialog>
      </div>
    );
  }
}

export default UserPayment;
