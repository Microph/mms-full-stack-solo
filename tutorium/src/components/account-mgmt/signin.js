import React, { Component } from "react";
import { FlatButton } from "material-ui";

const fb_logo = require("../../resources/fb-white.png");

class SignIn extends Component {
  render() {
    return (
      <div>
        <FlatButton
          backgroundColor="#4267B2"
          hoverColor="#3257A2"
          icon={<img src={fb_logo} style={{ width: 24, height: 24 }} alt="fb-logo" />}
          label="ลงชื่อเข้าใช้ด้วย Facebook"
          style={{color: '#fff'}}
        />
      </div>
    );
  }
}

export default SignIn;
