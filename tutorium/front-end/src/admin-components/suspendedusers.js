import React, { Component } from 'react';
import {
  FlatButton,  
} from "material-ui";

class SuspendedUsers extends Component {
    render() {
        return (
            <div>
            <h1>SuspendedUsers</h1>
            <SuspendedUserCard />
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
                      <h2 style={{display: "inline-block", marginRight: 10}}>เก่ง ไปหมด</h2>
                      <h2 style={{display: "inline-block"}}>(ID: 000033)</h2>
                   </div>
                </div>

                <div class="row">
                   <div class="col-sm-12 col-md-12">
                      <h4 style={{display: "inline-block"}}>ตั้งแต่ 18/11/2017 11.38</h4>
                      <FlatButton
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