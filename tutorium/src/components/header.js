import React, { Component } from "react";
import { FlatButton, List, ListItem } from "material-ui";
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
            {/* <div className="input-group stylish-input-group hidden-xs">
              <input
                type="text"
                className="form-control"
                placeholder="ค้นหาคอร์สเรียน"
              />
              <span class="input-group-addon">
                <button type="submit">
                  <span className="glyphicon glyphicon-search" />
                </button>
              </span>
            </div> */}
            {/* Menu Large screen */}
            <div className="pull-right hidden-xs">
              <FlatButton
                onClick={this.handleSigninButtonClicked}
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
        <div
          className={this.state.mobileMenu ? "visible-xs" : "hidden"}
          style={{
            width: "100%",
            backgroundColor: "#0f1531",
            marginTop: -20
          }}
        >
          <List>
            {/* Search */}
            {/* Menu */}
            {this.renderContentIsAuthMobile()}
            <ListItem
              onClick={this.handleSigninButtonClicked}
              style={{ color: "#fff" }}
              primaryText="ฉันเป็นติวเตอร์"
            />
          </List>
        </div>
        <div className="search-xs visible-xs">
          <div className="input-group stylish-input-group">
            <input
              type="text"
              className="form-control"
              placeholder="ค้นหาคอร์สเรียน"
            />
            <span className="input-group-addon">
              <button type="submit">
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
