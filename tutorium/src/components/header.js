import React, { Component } from "react";
import {
  AppBar,
  IconButton,
  FlatButton,
  List,
  ListItem,
  Divider,
  TextField
} from "material-ui";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const logo = require("../resources/Tutorium_icon.png");

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileMenu: false,
      searchLable: ""
    };
  }

  handleTitleClicked = () => (window.location.href = "/");
  handleSigninButtonClicked = () => (window.location.href = "/signin");
  handleSignupButtonClicked = () => (window.location.href = "/signup");

  toggleMobileMenu = () => {
    var { mobileMenu } = this.state;
    this.setState({ mobileMenu: !mobileMenu });
  };

  searchLableChange(text) {
    this.setState({ searchLable: text });
  }

  renderContentIsAuth = () => {
    switch (this.props.auth[0]) {
      case null:
        return;
      case false:
        return [
          <FlatButton
            onClick={this.handleSigninButtonClicked}
            style={{ color: "#fff" }}
            label="ลงชื่อเข้าใช้"
          />,
          <FlatButton
            onClick={this.handleSignupButtonClicked}
            style={{ color: "#fff" }}
            label="สมัครสมาชิก"
          />
        ];
      default:
        return [
          <FlatButton
            onClick={null}
            style={{ color: "#fff" }}
            label="คอร์สเรียน"
          />,
          <FlatButton
            onClick={null}
            style={{ color: "#fff" }}
            label="รูปโปรไฟล์"
          />
        ];
    }
  };

  renderContentIsAuthMobile() {
    switch (this.props.auth[0]) {
      case null:
        return;
      case false:
        return [
          <ListItem
            onClick={this.handleSigninButtonClicked}
            style={{ color: "#fff" }}
            primaryText="ลงชื่อเข้าใช้"
          />,
          <ListItem
            onClick={this.handleSignupButtonClicked}
            style={{ color: "#fff" }}
            primaryText="สมัครสมาชิก"
          />
        ];
      default:
        return [
          <ListItem style={{ color: "#fff" }} primaryText="คอร์สเรียน" />
        ];
    }
  }

  render() {
    console.log(this.props.auth);
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
                <TextField
                  style={{ backgroundColor: "#fff", borderRadius: 5 }}
                  inputStyle={{ paddingLeft: 15, paddingRight: 15 }}
                  hintStyle={{ paddingLeft: 15 }}
                  hintText="ค้นหาคอร์สเรียน"
                  onChange={text => this.searchLableChange(text)}
                />
                <FlatButton
                  onClick={this.handleSigninButtonClicked}
                  style={{ color: "#fff" }}
                  label="ฉันเป็นติวเตอร์"
                />
                {this.renderContentIsAuth()}
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
          className={this.state.mobileMenu ? "hidden-lg" : "hidden"}
          style={{
            width: "100%",
            backgroundColor: "#0f1531"
          }}
        >
          <Divider />
          <TextField
            fullWidth
            style={{ backgroundColor: "#fff" }}
            inputStyle={{ paddingLeft: 15, paddingRight: 15 }}
            hintStyle={{ paddingLeft: 15 }}
            hintText="ค้นหาคอร์สเรียน"
            onChange={text => this.searchLableChange(text)}
          />
          <Divider />
          <List>
            {this.renderContentIsAuthMobile()}
            <ListItem
              onClick={this.handleSigninButtonClicked}
              style={{ color: "#fff" }}
              primaryText="ฉันเป็นติวเตอร์"
            />
          </List>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
