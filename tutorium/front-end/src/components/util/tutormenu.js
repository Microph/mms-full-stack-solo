import React, { Component } from "react";
import { FlatButton, Popover, Menu } from "material-ui";
import { MenuItem } from "material-ui/Menu";

class TutorMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleCoursesClicked = () => (window.location.href = "/tutor/mycouses");
  handleTeachingClicked = () => (window.location.href = "/tutor/teachinginfo");
  handleSearchClicked = () => (window.location.href = "/tutor/findstudent");

  on = event => {
    event.preventDefault();
    this.setState({ open: true, anchorEl: event.currentTarget });
  };
  close = () => {
    this.setState({ open: false });
  };
  render() {
    return [
      <FlatButton
        onClick={this.on}
        style={{ color: "#fff" }}
        label="สำหรับติวเตอร์"
      />,
      <Popover
        open={this.state.open}
        anchorEl={this.state.anchorEl}
        anchorOrigin={{ horizontal: "middle", vertical: "bottom" }}
        targetOrigin={{ horizontal: "middle", vertical: "top" }}
        onRequestClose={this.close}
        style={{ marginTop: 5 }}
      >
        <Menu>
          <MenuItem
            primaryText="ข้อมูลการสอนของฉัน"
            onClick={this.handleTeachingClicked}
          />
          <MenuItem
            primaryText="คอร์สปัจจุบัน"
            onClick={this.handleCoursesClicked}
          />
          <MenuItem
            primaryText="ค้นหานักเรียน"
            onClick={this.handleSearchClicked}
          />
        </Menu>
      </Popover>
    ];
  }
}

export default TutorMenu;
