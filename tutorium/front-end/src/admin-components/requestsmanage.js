import React, { Component } from 'react';
import {
  FlatButton,  
} from "material-ui";

class RequestsManage extends Component {
  genCard(){
      return(<RequestCard />);
  }

  render() {
      return(
        <div>
          {this.genCard()}
          {this.genCard()}
          {this.genCard()}
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
                
                <div class="row">
                  <div class="col-sm-7 col-md-7">
                      <h4>เด็กดี ตั้งใจเรียน</h4>
                  </div>
                  <div class="col-sm-5 col-md-5">
                      <h4 align="right">ID: 000023</h4>
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
                      color: "#fff",
                      margin: "auto",
                      marginTop: 20,
                      backgroundColor: "gray"
                    }}
                    labelStyle={{ fontSize: 15, fontWeight: 700 }}
                    label="ดูเพิ่มเติม"
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