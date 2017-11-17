import React, { Component } from "react";
import { FlatButton } from "material-ui";

const fb_logo = require("../../resources/fb-white.png");
const line_logo = require("../../resources/line-white.png");

class SignIn extends Component {
  handleFBLogin = () => {
    window.location.href = "/api/auth/facebook";
  };

  handleLineLogin = () => {
    window.location.href = "/api/auth/line";
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <span
          style={{ margin: 30, marginTop: 60, color: "#505050", fontSize: 30 }}
        >
          ลงชื่อเข้าใช้
        </span>
        <FlatButton
          backgroundColor="#4267B2"
          hoverColor="#3257A2"
          icon={
            <img
              src={fb_logo}
              style={{ width: 24, height: 24 }}
              alt="fb-logo"
            />
          }
          label="ลงชื่อเข้าใช้ด้วย Facebook"
          labelStyle={{ fontSize: 18 }}
          style={{ color: "#fff", width: 300, height: 40, margin: 10 }}
          onClick={this.handleFBLogin}
        />
        <FlatButton
          backgroundColor="#00B900"
          hoverColor="#00A900"
          icon={
            <img
              src={line_logo}
              style={{ width: 24, height: 24 }}
              alt="line-logo"
            />
          }
          label="ลงชื่อเข้าใช้ด้วย Line"
          labelStyle={{ fontSize: 18 }}
          style={{ color: "#fff", width: 300, height: 40, margin: 10 }}
          onClick={this.handleLineLogin}
        />
      </div>
    );
  }
}

export default SignIn;
