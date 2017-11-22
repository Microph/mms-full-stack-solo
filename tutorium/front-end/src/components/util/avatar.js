import React, { Component } from "react";
import { Avatar, Popover, Menu, Divider } from "material-ui";
import { MenuItem } from "material-ui/Menu";

class ProfileAvatar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avataropen: false
    };
  }

  handleReportClicked = () => (window.location.href = "/report");
  handleProfileClicked = () => (window.location.href = "/myprofile");
  handleLogoutClicked = () => (window.location.href = "/api/logout");

  clickAvatar = event => {
    event.preventDefault();
    this.setState({ avataropen: true, anchorEl: event.currentTarget });
  };
  close = () => {
    this.setState({ avataropen: false });
  };
  render() {
    return [
      <Avatar
        onClick={this.clickAvatar}
        style={{ cursor: "pointer", marginLeft: 25 }}
        size={40}
        src={this.props.imgsrc}
      />,
      <Popover
        open={this.state.avataropen}
        anchorEl={this.state.anchorEl}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        targetOrigin={{ horizontal: "middle", vertical: "top" }}
        onRequestClose={this.close}
        style={{ marginTop: 5, marginLeft: -30 }}
      >
        <Menu>
          <MenuItem
            primaryText={this.props.name}
            onClick={this.handleProfileClicked}
          />
          <MenuItem
            primaryText="รายงานปัญหา"
            onClick={this.handleReportClicked}
          />
          <Divider />
          <MenuItem
            primaryText="ออกจากระบบ"
            onClick={this.handleLogoutClicked}
          />
        </Menu>
      </Popover>
    ];
  }
}

export default ProfileAvatar;
