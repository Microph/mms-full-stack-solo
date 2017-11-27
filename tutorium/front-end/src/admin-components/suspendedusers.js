import React, { Component } from 'react';
import axios from "axios";
import {
  FlatButton,  
} from "material-ui";

const querystring = require("querystring");

class SuspendedUsers extends Component {
  constructor(props) {
      super(props);
      this.state = {
          cards: []
      };
  }

  async componentDidMount() {
    const res = await axios({
      method: "GET",
      url: "/api/admin/suspended-user-management"
    });

    if(res.data.success) this.prepareCard(res.data.result);
  }

  prepareCard(reports){
    reports.map(reportOb => {
      this.genCard(
        reportOb.student.name + ' ' + reportOb.student.surname,
        reportOb.studentID,
        reportOb.updatedAt
      );
    });
  }

  genCard(name, studentID, time){
    const newCard = (<SuspendedUserCard 
      name = {name}
      studentID = {studentID}
      time = {time}
      onClickUnsuspend = {() => this.handleButtonSubmit(studentID)}
    />);
    this.setState({cards: [...this.state.cards, newCard]});
  }

  async handleButtonSubmit (studentID) {
    const res = await axios({
      method: "POST",
      url: "/api/admin/suspended-user-management",
      headers: {
        "Content-type": "application/x-www-form-urlencoded"
      },
      data: querystring.stringify({
        id: studentID
      })
    });

    if(res.data.success){
      //remove card
      let newCards = this.state.cards;
      newCards = newCards.filter(card => {
        return (Object.entries(card)[4][1]).studentID != studentID;
      });
      this.setState({cards: newCards});
      alert('Unsuspended User ID: ' + studentID);
    } 
    else{
      alert('Error: operation failed');
    }
  }

  render() {
      return (
          <div>
          <h1>Suspended Users</h1>
          {this.state.cards}
        </div>
      );
  }
}

class SuspendedUserCard extends Component {
  render() {
      return (
          <div>
          <div class="row">
          <div class="thumbnail clearfix">
             <div class="container">
                <div class="row">
                   <div class="col-sm-12 col-md-12">
                      <h2 style={{display: "inline-block", marginRight: 10}}>{this.props.name}</h2>
                      <h2 style={{display: "inline-block"}}>(ID: {this.props.studentID})</h2>
                   </div>
                </div>

                <div class="row">
                   <div class="col-sm-12 col-md-12">
                      <h4 style={{display: "inline-block"}}>ตั้งแต่ {this.props.time}</h4>
                      <FlatButton
                        onClick={this.props.onClickUnsuspend}
                        style={{
                          float: "right",
                          display: "inline-block",
                          margin: "auto",
                          marginRight: 10,
                          backgroundColor: "#0f0"
                        }}
                        labelStyle={{ fontSize: 15, fontWeight: 700 }}
                        label="ยกเลิกการระงับบัญชี"
                      />
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
  }
}

export default SuspendedUsers;