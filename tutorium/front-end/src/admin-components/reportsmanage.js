import React, { Component } from 'react';
import axios from "axios";
import {
  FlatButton,  
} from "material-ui";

const querystring = require("querystring");

class ReportsManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        cards: []
      };
  }

  async componentDidMount() {
    const res = await axios({
      method: "GET",
      url: "/api/admin/report-management"
    });

    if(res.data.success) 
      this.prepareCard(res.data.report);
    
  }

  async prepareCard(reports){
    for(let i=0; i<reports.length; i++){
      let reportedName = null;
      if(reports[i].reportedStudentID != null){
        const res2 = await axios({
          method: "GET",
          url: "/api/get-student-info-by-id",
          headers: {"id": reports[i].reportedStudentID}
        });

        if(res2.data.success)
          reportedName = res2.data.result.name + ' ' + res2.data.result.surname;
      }
      
      //call genCard
      this.genCard(
        reports[i].topic, 
        reports[i].reporter.name + ' ' + reports[i].reporter.surname, 
        reports[i].reporterStudentID, 
        reportedName, 
        reports[i].reportedStudentID, 
        reports[i].detail,
        reports[i].updatedAt
      );
    }
  }

  genCard(topic, reporterName, reporterID, reportedName, reportedID, detail, updateTime){
    const newCard = (<ReportCard 
      isUserReportUser={!(reportedName === null)}
      topic = {topic}
      reporterName = {reporterName}
      reporterID = {reporterID}
      reportedName = {reportedName}
      reportedID = {reportedID}
      detail = {detail}
      updateTime = {updateTime}
      onClickSuspend = {() => this.handleButtonSubmit(reportedID)}
    />);
    this.setState({cards: [...this.state.cards, newCard]});
  }

  handleButtonSubmit (studentID) {
    alert('Suspend Student ID: ' + studentID);
  }

  render() {
      return (
        <div>
          <h1>User Reports</h1>
          {this.state.cards}
        </div>
      );
  }
}

class ReportCard extends Component {
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

  render() {
    return (
      <div>
        <div class="row">
          <div class="thumbnail clearfix">
            <div class="container">
                <div class="row">
                  <div class="col-sm-12 col-md-12">
                    <h2 style={{display: "inline-block", marginRight: 10}}><b>{this.props.topic}</b></h2>
                    <h5 style={{display: "inline-block", marginRight: 10}}>- {this.props.reporterName} ({this.props.reporterID})</h5>
                    <h5 style={{display: "inline-block"}}>- {this.props.updateTime}</h5>
                  </div>
                </div>

                <div class="row" hidden={!this.props.isUserReportUser}>
                  <div class="col-sm-12 col-md-12">
                      <h3>ผู้ใช้ที่ถูกรายงาน: {this.props.reportedName} ({this.props.reportedID})</h3>
                  </div>
                </div>  

                <div hidden={!this.state.showFullDetail}>  
                  <div class="row">
                    <div class="col-sm-12 col-md-12">
                        <h4></h4>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-sm-12 col-md-12">
                        <h4>{this.props.detail}</h4>
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

                <div class="row" hidden={!this.props.isUserReportUser}>
                  <div class="col-sm-12 col-md-12" align="left">
                    <FlatButton
                      onClick= {this.props.onClickSuspend}
                      style={{
                        display: "inline-block",
                        margin: "auto",
                        marginTop: 20,
                        backgroundColor: "#f00"
                      }}
                      labelStyle={{ fontSize: 15, fontWeight: 700 }}
                      label={'ระงับบัญชีผู้ใช้ ' + this.props.reportedName + ' (' + this.props.reportedID + ') ' + '(โปรดใช้อย่างระมัดระวัง)'}                    />
                  </div>
                </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ReportsManage;