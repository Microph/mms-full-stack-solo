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

class UsersManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        totalStudents: 0,
        totalTutors: 0,
        cards: []
    };
  }

  async componentDidMount() {
    const res = await axios({
      method: "GET",
      url: "/api/search/student"
    });

    const res2 = await axios({
      method: "GET",
      url: "/api/search/tutor"
    });

    if(res.data.success && res2.data.success) {
      this.setState({
        totalStudents: res.data.students.length,
        totalTutors: res2.data.tutors.length
      });
      this.prepareCard(res.data.students);
    }
    
  }

  async prepareCard(studentData){
    studentData.map(studentOb => {
      this.genCard(
        studentOb.name + ' ' + studentOb.surname,
        studentOb.studentID,
        parseGender(studentOb.gender),
        parseLevel(studentOb.educationLevel),
        studentOb.facebookURL,
        studentOb.lineID,
        studentOb.email,
        studentOb.mobile,
        studentOb.account.isTutor
      );
    });
  }

  genCard(name, id, gender, level, fb, line, email, tel, isTutor){
    console.log(isTutor);
    const newCard = (<UserDetailCard 
      name = {name}
      id = {id}
      gender = {gender}
      level = {level}
      fb = {fb}
      line = {line}
      email = {email}
      tel = {tel}
      isTutor = {isTutor? ' (ติวเตอร์)':''}
    />);
    this.setState({cards: [...this.state.cards, newCard]});
  }

  handleFieldChange(value) {
    /*To be implemented*/
    console.log(value);
  }

  render() {
      return(
        <div>
          <h1>Users Management</h1>
          {/* User Count and Search Field */}
          <div className="row" style={{marginBottom: 20}}>
            <div className="col-sm-7 col-md-7">
              <h4>กำลังแสดง นักเรียน {this.state.totalStudents} คน (เป็นติวเตอร์ {this.state.totalTutors} คน)</h4>
            </div>
            
            <div className="search-header col-sm-5 col-md-5 pull-right">
              <div className="input-group stylish-input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="ใส่คำค้นหาของคุณที่นี่"
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
          {/* Cards Field */}
          {this.state.cards}
        </div>
      );
  }
}

class UserDetailCard extends Component {
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
                  <div class="col-sm-7 col-md-7">
                      <h2>{this.props.name}{this.props.isTutor}</h2>
                  </div>
                  <div class="col-sm-5 col-md-5">
                      <h2 align="right">ID: {this.props.id}</h2>
                  </div>
                </div>

                <div class="row">
                  <div class="col-sm-12 col-md-12">
                      <h4><u>ถูกรายงาน 0 ครั้ง</u></h4>
                  </div>
                </div>

                <div hidden={!this.state.showFullDetail}>
                  <div class="row">
                    <div class="col-sm-6 col-md-6">
                        <h4><b>เพศ:</b> {this.props.gender}</h4>
                    </div>
                    <div class="col-sm-6 col-md-6">
                        <h4 align="right"><b>ระดับการศึกษา:</b> {this.props.level}</h4>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-sm-6 col-md-6">
                      <h4><b>Facebook:</b> {this.props.fb}</h4>
                    </div>
                    <div class="col-sm-6 col-md-6">
                      <h4 align="right"><b>Line ID:</b> {this.props.line}</h4>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-sm-6 col-md-6">
                      <h4><b>อีเมล์:</b> {this.props.email}</h4>
                    </div>
                    <div class="col-sm-6 col-md-6">
                      <h4 align="right"><b>โทรศัพท์:</b> {this.props.tel}</h4>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-sm-12 col-md-12">
                      <h4><b>หลักฐานยืนยันตัวตน:</b> -</h4>
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UsersManage;