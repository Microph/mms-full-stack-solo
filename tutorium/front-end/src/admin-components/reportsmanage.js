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

  render() {
      return (
        <div>
          <h1>ReportsManage</h1>
          <ReportCard 
            isUserReportUser={true}
          />
          <ReportCard 
            isUserReportUser={false}
          />
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
                    <h2 style={{display: "inline-block", marginRight: 10}}><b>ติวเตอร์ไม่มาสอนครับ</b></h2>
                    <h5 style={{display: "inline-block"}}>- นักเรียน หาคนติว (00026)</h5>
                  </div>
                </div>

                <div class="row" hidden={!this.props.isUserReportUser}>
                  <div class="col-sm-12 col-md-12">
                      <h3>ผู้ใช้ที่ถูกรายงาน: เก่ง ไปหมด</h3>
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
                        <h4>รายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียด</h4>
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
                      onClick= {this.props.onClickDecline}
                      style={{
                        display: "inline-block",
                        margin: "auto",
                        marginTop: 20,
                        backgroundColor: "#f00"
                      }}
                      labelStyle={{ fontSize: 15, fontWeight: 700 }}
                      label="งับบัญชีผู้ใช้ เก่ง ไปหมด (ID: 000025) (โปรดใช้อย่างระมัดระวัง)"
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

export default ReportsManage;