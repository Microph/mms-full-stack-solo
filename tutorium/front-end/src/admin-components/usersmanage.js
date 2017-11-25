import React, { Component } from 'react';
import {
  FlatButton,  
} from "material-ui";

class UsersManage extends Component {
  genCard(){
      return(<UserDetailCard />);
  }

  handleFieldChange() {
    /*To be implemented*/
  }

  render() {
      return(
        <div>
          <h1>Users Management</h1>
          {/* User Count and Search Field */}
          <div className="row" style={{marginBottom: 20}}>
            <div className="col-sm-7 col-md-7">
              <h4 style={{}}>ผู้ใช้ทั้งหมด</h4>
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
          {this.genCard()}
          {this.genCard()}
          {this.genCard()}
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
                      <h2>เด็กดี ตั้งใจเรียน</h2>
                  </div>
                  <div class="col-sm-5 col-md-5">
                      <h2 align="right">ID: 000023</h2>
                  </div>
                </div>

                <div class="row">
                  <div class="col-sm-7 col-md-7">
                      <h4>เด็กดี ตั้งใจเรียน</h4>
                  </div>
                  <div class="col-sm-5 col-md-5">
                      <h4 align="right">ID: 000023</h4>
                  </div>
                </div>

                <div hidden={!this.state.showFullDetail}>
                  <div class="row">
                    <div class="col-sm-12 col-md-12">
                        <h4>เด็กดี ตั้งใจเรียน</h4>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-sm-12 col-md-12">
                        <h4>เด็กดี ตั้งใจเรียน</h4>
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