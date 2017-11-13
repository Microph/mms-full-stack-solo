import React, { Component } from "react";
import {
  AppBar,
  IconButton,
  FlatButton,
  List,
  ListItem,
  Divider
} from "material-ui";
import { Link } from "react-router-dom";

const logo = require("../resources/Tutorium_icon.png");

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileMenu: false
    };
  }

  handleTitleClicked = () => (window.location.href = "/");
  handleSigninButtonClicked = () => (window.location.href = "/signin");
  handleSignupButtonClicked = () => (window.location.href = "/signup");

  toggleMobileMenu = () => {
    var { mobileMenu } = this.state;
    this.setState({ mobileMenu: !mobileMenu });
  };

  render() {
    return (
      <div>
        <AppBar
          title={<span style={{ cursor: "pointer" }}>Tutorium</span>}
          onTitleTouchTap={this.handleTitleClicked}
          iconElementLeft={
            <IconButton onClick={this.handleTitleClicked}>
              <Link to={"/signin"}>
                <img className="logo logo-header" src={logo} alt="Tutorium" />
              </Link>
            </IconButton>
          }
          iconElementRight={
            <div>
              <div>
                <span
                  style={{ fontSize: 30, cursor: "pointer" }}
                  onClick={this.toggleMobileMenu}
                  className="glyphicon glyphicon-menu-hamburger hidden-lg"
                />
              </div>
              <div className="visible-lg" style={{ alignContents: "center" }}>
                <FlatButton onClick={this.handleSigninButtonClicked} style={{ color: "#fff" }} label="ฉันเป็นติวเตอร์" />
                <FlatButton onClick={this.handleSigninButtonClicked} style={{ color: "#fff" }} label="ลงชื่อเข้าใช้" />
                <FlatButton onClick={this.handleSignupButtonClicked} style={{ color: "#fff" }} label="สมัครสมาชิก" />
              </div>
            </div>
          }
          style={{
            backgroundColor: "#0f1531",
            color: "#fff",
            alignItems: "center"
          }}
        />
        <div
          className={this.state.mobileMenu ? "visible" : "hidden"}
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#0f1531"
          }}
        >
          <List>
            <ListItem onClick={this.handleSigninButtonClicked} style={{ color: "#fff" }} primaryText="ฉันเป็นติวเตอร์" />
            <ListItem onClick={this.handleSigninButtonClicked} style={{ color: "#fff" }} primaryText="ลงชื่อเข้าใช้" />
            <ListItem onClick={this.handleSignupButtonClicked} style={{ color: "#fff" }} primaryText="สมัครสมาชิก" />
          </List>
        </div>
      </div>
    );
  }
}

export default Header;
