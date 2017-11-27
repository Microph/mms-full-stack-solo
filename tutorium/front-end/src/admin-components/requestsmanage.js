import React, { Component } from 'react';
import axios from "axios";
import {
  FlatButton,  
} from "material-ui";
import {
  parseLevel,
  parseGender,
  parseSubject,
  parseDay
} from "../util/parser";

const querystring = require("querystring");

class RequestsManage extends Component {
  constructor(props) {
      super(props);
      this.state = {
          cards: []
      };
  }

  async componentDidMount() {
    const res = await axios({
      method: "GET",
      url: "/api/admin/tutor-request-management"
    });

    if(res.data.success) this.prepareCard(res.data.students);
  }

  //call if tutor-request-management return success
  prepareCard(studentData){
    studentData.map(studentOb => {
      this.genCard(
        studentOb.student.name + ' ' + studentOb.student.surname, 
        studentOb.studentID,
        studentOb.uploadEvidence,
        studentOb.education,
        studentOb.teachList
      );
    });
  }

  //always get called after prepareCard
  genCard(name, studentID, uploadEvidence, education, teachList){
    const newCard = (<RequestCard 
      name = {name}
      uploadEvidence = {uploadEvidence}
      studentID = {studentID}
      education = {education}
      teachList = {teachList}
      onClickAccept = {() => this.handleButtonSubmit(studentID, true)}
      onClickDecline = {() => this.handleButtonSubmit(studentID, false)}
    />);
    this.setState({cards: [...this.state.cards, newCard]});
  }

  async handleButtonSubmit (studentID, isAccepted) {
    const acceptStatus = isAccepted? 'true':'false';
    const res = await axios({
      method: "POST",
      url: "/api/admin/tutor-request-management",
      headers: {
        "Content-type": "application/x-www-form-urlencoded"
      },
      data: querystring.stringify({
        id: studentID,
        accept: acceptStatus
      })
    });

    if(res.data.success){
      //remove card
      let newCards = this.state.cards;
      newCards = newCards.filter(card => {
        return (Object.entries(card)[4][1]).studentID != studentID;
      });
      this.setState({cards: newCards});

      if(isAccepted)
        alert('Accepted User ID: ' + studentID + ' as a tutor.');
      else
        alert('Declined User ID: ' + studentID + ' request.');
    } 
    else{
      alert('Error: operation failed');
    }
  }

  render() {
      return(
        <div>
          <h1>Tutor Requests</h1>
          {this.state.cards}
        </div>
      );
  }
}

class RequestCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFullDetail: false,
    };

    this.onClickShowHide = this.onClickShowHide.bind(this);
  }

  onClickShowHide(){
    const prev = this.state.showFullDetail;
    this.setState({showFullDetail: !prev});
  }

  getTextShowOrHide(){
    if(this.state.showFullDetail)
      return 'ย่อ'
    else
      return 'แสดงรายละเอียดเต็ม'
  }

  displayJSON(jsonObIn){
    if(jsonObIn == null) return '-';

    const jsonOb = JSON.parse(jsonObIn);

    let out = '';
    for (let i = 0; i < jsonOb.length; i++){
      let obj = jsonOb[i];
      for (let key in obj){
        let attrName = key;
        let attrValue = obj[key];

        //string parsing
        switch(attrName){
          case 'subject': attrName='วิชา'; attrValue = parseSubject(attrValue); break;
          case 'level': attrName='ระดับ'; attrValue = parseLevel(attrValue); break;
          case 'university': attrName='มหาวิทยาลัย'; break;
          case 'faculty': attrName='ภาควิชา'; break;
          case 'major': attrName='สาขา'; break;
          default: ;
        }

        if(attrValue != ''){
          out += attrName + ': ' + attrValue + '\n';
        }
      }
      out += '\n';
    }
    return out;
  }

  render() {
    return (
      <div>
        <div class="row">
          <div class="thumbnail clearfix">
            <div class="container">
                <div class="row">
                  <div class="col-sm-7 col-md-7">
                      <h2>{this.props.name}</h2>
                  </div>
                  <div class="col-sm-5 col-md-5">
                      <h2 align="right">ID: {this.props.studentID}</h2>
                  </div>
                </div>
                <div hidden={!this.state.showFullDetail}>
                  <div class="row">
                    <div class="col-sm-12 col-md-12">
                        <h4><b>หลักฐานการยืนยันตัวตน</b></h4>
                        <h4>{this.displayJSON(this.props.uploadEvidence).split('\n').map(
                          function(item) {
                            return (
                              <span>
                                {item}
                                <br/>
                              </span>
                            )
                            })}
                        </h4>
                    </div>
                  </div>
                  
                  <div class="row">
                    <div class="col-sm-12 col-md-12">
                        <h4><b>ข้อมูลด้านการศึกษา</b></h4>
                        <h4>{this.displayJSON(this.props.education).split('\n').map(
                          function(item) {
                            return (
                              <span>
                                {item}
                                <br/>
                              </span>
                            )
                            })}
                        </h4>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-sm-12 col-md-12">
                        <h4><b>วิชาที่สอน</b></h4>
                        <h4>{this.displayJSON(this.props.teachList).split('\n').map(
                          function(item) {
                            return (
                              <span>
                                {item}
                                <br/>
                              </span>
                            )
                            })}
                        </h4>
                    </div>
                  </div>
                </div>
                
                <div class="row">
                  <div class="col-sm-12 col-md-12" align="center">
                  <FlatButton
                    onClick={this.onClickShowHide}
                    style={{
                      width: "100%",
                      margin: "auto",
                      marginTop: 20,
                      backgroundColor: "#ddd"
                    }}
                    labelStyle={{ fontSize: 15, fontWeight: 700 }}
                    label={this.getTextShowOrHide()}
                  />
                  </div>
                </div>

                <div class="row">
                  <div align="center">
                    <FlatButton
                      onClick= {this.props.onClickAccept}
                      style={{
                        display: "inline-block",
                        margin: "auto",
                        marginRight: 20,
                        marginTop: 20,
                        backgroundColor: "#0f0"
                      }}
                      labelStyle={{ fontSize: 15, fontWeight: 700 }}
                      label="ยอมรับ"
                    />
                    <FlatButton
                      onClick= {this.props.onClickDecline}
                      style={{
                        display: "inline-block",
                        margin: "auto",
                        marginTop: 20,
                        backgroundColor: "#f00"
                      }}
                      labelStyle={{ fontSize: 15, fontWeight: 700 }}
                      label="ปฏิเสธ"
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

export default RequestsManage;