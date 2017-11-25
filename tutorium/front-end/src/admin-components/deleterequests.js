import React, { Component } from 'react';
import {
  FlatButton,  
} from "material-ui";

class DeleteRequests extends Component {
    render() {
        return (
          <div>
            <h1>DeleteRequests</h1>
            {<DeleteRequestCard />}
            {<DeleteRequestCard />}
            {<DeleteRequestCard />}
          </div>
        );
    }
}

class DeleteRequestCard extends Component {
  render() {
      return (
        <div>
          <div class="row">
          <div class="thumbnail clearfix">
             <div class="container">
                <div class="row">
                   <div class="col-sm-7 col-md-7">
                      <h2>ทดสอบระบบ หมายเลข 8</h2>
                   </div>
                </div>

                <div class="row">
                   <div class="col-sm-7 col-md-7">
                      <h4>การจองเวลาเรียน: ไม่มี</h4>
                   </div>
                   <div class="col-sm-5 col-md-5" align="right">
                    <FlatButton
                      style={{
                        display: "inline-block",
                        margin: "auto",
                        marginRight: 10,
                        marginTop: 20,
                        backgroundColor: "#0f0"
                      }}
                      labelStyle={{ fontSize: 15, fontWeight: 700 }}
                      label="ปฎิเสธ"
                    />
                    <FlatButton
                      style={{
                        display: "inline-block",
                        margin: "auto",
                        marginTop: 20,
                        backgroundColor: "#f00"
                      }}
                      labelStyle={{ fontSize: 15, fontWeight: 700 }}
                      label="ลบบัญชี"
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

export default DeleteRequests;