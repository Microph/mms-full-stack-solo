import React, { Component } from "react";
import { FlatButton, List, ListItem, Divider, Drawer } from "material-ui";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { MenuItem } from "material-ui/DropDownMenu";
import axios from "axios";

import { actionCreators } from "../reducers/authReducer";

window.axios = axios;
const logo = require("../resources/Tutorium_icon.png");

class Header extends Component {
  // check if now has user logged in
  async getCurrentUser() {
    const user = await axios("/api/current-login-session");
    this.props.dispatch(actionCreators.fetchUser(user.data));
    // console.log(this.props.auth[0].user.registStatus );
    if (
      !this.props.auth[0].user.registStatus &&
      this.props.location.pathname !== "/signup"
    ) {
      this.setState({ auth: false });
      this.handleSignupButtonClicked();
    } else if (!this.props.auth[0].user.registStatus){
      this.setState({ auth: false });
    } else {
      this.setState({ auth: true });
    }
  }

  componentDidMount() {
    this.getCurrentUser();
  }

  constructor(props) {
    super(props);
    this.state = {
      mobileMenu: false,
      searchLable: "",
      auth: false
    };
    this.getCurrentUser = this.getCurrentUser.bind(this);
  }

  handleTitleClicked = () => (window.location.href = "/");
  handleSigninButtonClicked = () => (window.location.href = "/signin");
  handleSignupButtonClicked = () => (window.location.href = "/signup");
  handleToBeTutorClicked = () => (window.location.href = "/iamtutor");
  handleReportClicked = () => (window.location.href = "/report");
  handleProfileClicked = () => (window.location.href = "/myprofile");
  handleCoursesClicked = () => (window.location.href = "/mycourses");
  handleOffersClicked = () => (window.location.href = "/myoffers");

  toggleMobileMenu = () => {
    var { mobileMenu } = this.state;
    this.setState({ mobileMenu: !mobileMenu });
  };

  searchLableChange(text) {
    this.setState({ searchLable: text });
  }

  renderContentIsAuth = () => {
    switch (this.state.auth) {
      case null:
        return;
      case false:
        return [
          <FlatButton
            onClick={this.handleSigninButtonClicked}
            style={{ color: "#fff" }}
            label="ลงชื่อเข้าใช้ / สมัครสมาชิก"
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
    switch (this.state.auth) {
      case null:
        return;
      case false:
        return [
          <ListItem
            onClick={this.handleSigninButtonClicked}
            style={{ color: "#fff" }}
            primaryText="ลงชื่อเข้าใช้ / สมัครสมาชิก"
          />
        ];
      default:
        return [
          <ListItem
            style={{ color: "#fff" }}
            onClick={this.handleProfileClicked}
            primaryText="โปรไฟล์ของฉัน"
          />,
          <ListItem
            style={{ color: "#fff" }}
            onClick={this.handleCoursesClicked}
            primaryText="คอร์สเรียนของฉัน"
          />,
          <ListItem
            style={{ color: "#fff" }}
            onClick={this.handleOffersClicked}
            primaryText="ข้อเสนอคอร์สเรียน"
          />
        ];
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar header">
          <div className="container">
            <div className="pull-left">
              <Link to={"/"} style={{ textDecoration: "none" }}>
                <span style={{ fontSize: 30, color: "#fff" }}>
                  <img className="logo logo-header" src={logo} alt="Tutorium" />
                  Tutorium
                </span>
              </Link>
            </div>
            {/* Search */}
            <div className="pull-left search-header visible-lg">
              <div className="input-group stylish-input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="ค้นหาคอร์สเรียน"
                />
                <span className="input-group-addon">
                  <button>
                    <span class="glyphicon glyphicon-search" />
                  </button>
                </span>
              </div>
            </div>
            {/* Menu Large screen */}
            <div className="pull-right hidden-xs">
              <FlatButton
                onClick={this.handleToBeTutorClicked}
                style={{ color: "#fff" }}
                label="ฉันเป็นติวเตอร์"
              />
              {this.renderContentIsAuth()}
            </div>
            {/* Hambuger */}
            <div className="pull-right visible-xs">
              <span
                style={{
                  fontSize: 30,
                  cursor: "pointer",
                  color: "#fff",
                  marginTop: 5
                }}
                onClick={this.toggleMobileMenu}
                className="glyphicon glyphicon-menu-hamburger"
              />
            </div>
          </div>
        </nav>
        {/* Drawer mobile */}
        <Drawer
          openSecondary
          docked={false}
          width={"60%"}
          open={this.state.mobileMenu}
          className="hidden-lg"
          containerStyle={{ backgroundColor: "#0f1531" }}
          onRequestChange={this.toggleMobileMenu}
        >
          <MenuItem onClick={this.toggleMobileMenu} style={{ color: "#fff" }}>
            ย้อนกลับ
          </MenuItem>
          <List>
            {/* Menu */}
            {this.renderContentIsAuthMobile()}
            <ListItem
              onClick={this.handleToBeTutorClicked}
              style={{ color: "#fff" }}
              primaryText="ฉันเป็นติวเตอร์"
            />
            <ListItem
              style={{ color: "#fff" }}
              onClick={this.handleReportClicked}
              primaryText="รายงานปํญหา"
            />
            <Divider style={{ backgroundColor: "#0f203e" }} />
            <ListItem style={{ color: "#fff" }} primaryText="ออกจากระบบ" />
            <Divider style={{ backgroundColor: "#0f203e" }} />
          </List>
        </Drawer>

        {/* Search mobile */}
        <div className="search-xs hidden-lg">
          <div className="container input-group stylish-input-group">
            <input
              type="text"
              className="form-control"
              placeholder="ค้นหาคอร์สเรียน"
            />
            <span className="input-group-addon">
              <button>
                <span class="glyphicon glyphicon-search" />
              </button>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
