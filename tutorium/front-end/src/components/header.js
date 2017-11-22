import React, { Component } from "react";
import { FlatButton, List, ListItem, Divider, Drawer } from "material-ui";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { MenuItem } from "material-ui/DropDownMenu";
import axios from "axios";
import ProfileAvatar from "./util/avatar";
import CourseMenu from "./util/courses";
import TutorMenu from "./util/tutormenu";

window.axios = axios;
const logo = require("../resources/Tutorium_icon.png");

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileMenu: false,
      searchLable: "",
      avataropen: false
    };
  }

  handleTitleClicked = () => (window.location.href = "/");
  handleSigninButtonClicked = () => (window.location.href = "/signin");
  handleSignupButtonClicked = () => (window.location.href = "/signup");
  handleToBeTutorClicked = () => (window.location.href = "/iamtutor");
  handleCoursesClicked = () => (window.location.href = "/mycourses");
  handleOffersClicked = () => (window.location.href = "/myoffers");
  handleReportClicked = () => (window.location.href = "/report");
  handleProfileClicked = () => (window.location.href = "/myprofile");
  handleLogoutClicked = () => (window.location.href = "/api/logout");
  handleTutorCoursesClicked = () => (window.location.href = "/tutor/mycouses");
  handleTeachingClicked = () => (window.location.href = "/tutor/teachinginfo");
  handleStudentSearchClicked = () =>
    (window.location.href = "/tutor/findstudent");

  toggleMobileMenu = () => {
    var { mobileMenu } = this.state;
    this.setState({ mobileMenu: !mobileMenu });
  };

  searchLableChange(text) {
    this.setState({ searchLable: text });
  }

  toggleAvatar() {
    var { avataropen } = this.state;
    this.setState({ avataropen: !avataropen });
  }

  renderContentIsAuth = () => {
    if (this.props.auth == null)
      return [
        <FlatButton
          onClick={this.handleSigninButtonClicked}
          style={{ color: "#fff" }}
          label="ลงชื่อเข้าใช้ / สมัครสมาชิก"
        />
      ];
    if (
      this.props.auth.success &&
      !this.props.auth.user.registStatus &&
      this.props.location.pathname !== "/signup"
    )
      return this.handleSignupButtonClicked();
    if (
      !this.props.auth.success ||
      (this.props.auth.success && !this.props.auth.user.registStatus)
    )
      return [
        <FlatButton
          onClick={this.handleSigninButtonClicked}
          style={{ color: "#fff" }}
          label="ลงชื่อเข้าใช้ / สมัครสมาชิก"
        />
      ];
    if (this.props.auth.success && this.props.auth.user.registStatus)
      return [
        <CourseMenu />,
        <ProfileAvatar
          imgsrc={this.props.auth.user.profilePic}
          name={this.props.auth.user.displayName}
        />
      ];
  };

  renderContentIsAuthMobile() {
    if (this.props.auth == null)
      return [
        <ListItem
          onClick={this.handleSigninButtonClicked}
          style={{ color: "#fff" }}
          primaryText="ลงชื่อเข้าใช้ / สมัครสมาชิก"
        />
      ];
    if (
      this.props.auth.success &&
      !this.props.auth.user.registStatus &&
      this.props.location.pathname !== "/signup"
    )
      return this.handleSignupButtonClicked();
    if (
      !this.props.auth.success ||
      (this.props.auth.success && !this.props.auth.user.registStatus)
    )
      return [
        <ListItem
          onClick={this.handleSigninButtonClicked}
          style={{ color: "#fff" }}
          primaryText="ลงชื่อเข้าใช้ / สมัครสมาชิก"
        />
      ];
    if (this.props.auth.success && this.props.auth.user.registStatus)
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

  renderContentIsAuthMobile_bottom() {
    if (this.props.auth == null) return;
    if (this.props.auth.success && this.props.auth.user.registStatus)
      return [
        <ListItem
          style={{ color: "#fff" }}
          onClick={this.handleReportClicked}
          primaryText="รายงานปํญหา"
        />,
        <Divider style={{ backgroundColor: "#0f203e" }} />,
        <ListItem
          style={{ color: "#fff" }}
          onClick={this.handleLogoutClicked}
          primaryText="ออกจากระบบ"
        />,
        <Divider style={{ backgroundColor: "#0f203e" }} />
      ];
  }

  renderContentIsTutor() {
    if (
      this.props.auth == null ||
      !this.props.auth.success ||
      (this.props.auth.success && this.props.auth.user.tutorID == null)
    ) {
      return (
        <FlatButton
          onClick={this.handleToBeTutorClicked}
          style={{ color: "#fff" }}
          label="ฉันเป็นติวเตอร์"
        />
      );
    }
    if (this.props.auth.success && this.props.auth.user.tutorID != null) {
      return <TutorMenu />;
    }
  }

  renderContentIsTutorMobile() {
    if (
      this.props.auth == null ||
      !this.props.auth.success ||
      (this.props.auth.success && this.props.auth.user.tutorID == null)
    ) {
      return (
        <ListItem
          onClick={this.handleToBeTutorClicked}
          style={{ color: "#fff" }}
          primaryText="ฉันเป็นติวเตอร์"
        />
      );
    }
    if (this.props.auth.success && this.props.auth.user.tutorID != null) {
      return [
        <Divider style={{ backgroundColor: "#0f203e" }} />,
        <ListItem
          onClick={this.handleTeachingClicked}
          style={{ color: "#fff" }}
          primaryText="ข้อมูลการสอนของฉัน"
        />,
        <ListItem
          onClick={this.handleTutorCoursesClicked}
          style={{ color: "#fff" }}
          primaryText="คอร์สปัจจุบัน"
        />,
        <ListItem
          onClick={this.handleStudentSearchClicked}
          style={{ color: "#fff" }}
          primaryText="ค้นหานักเรียน"
        />,
        <Divider style={{ backgroundColor: "#0f203e" }} />
      ];
    }
  }

  render() {
    if (this.props.location.pathname.indexOf("/admin") !== -1) return <div />;
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
              {this.renderContentIsTutor()}
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
          width={"100%"}
          open={this.state.mobileMenu}
          className="hidden-lg"
          containerStyle={{ backgroundColor: "#0f1531", textAlign: "center" }}
          onRequestChange={this.toggleMobileMenu}
        >
          <MenuItem style={{ margin: 50 }}>
            <Link to={"/"} style={{ textDecoration: "none" }}>
              <span style={{ fontSize: 30, color: "#fff" }}>
                <img className="logo logo-header" src={logo} alt="Tutorium" />
                Tutorium
              </span>
            </Link>
          </MenuItem>
          <List>
            {/* Menu */}
            {this.renderContentIsAuthMobile()}
            {this.renderContentIsTutorMobile()}
            {this.renderContentIsAuthMobile_bottom()}
            <MenuItem
              onClick={this.toggleMobileMenu}
              style={{ color: "#fff", margin: 20 }}
            >
              ย้อนกลับ
            </MenuItem>
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
