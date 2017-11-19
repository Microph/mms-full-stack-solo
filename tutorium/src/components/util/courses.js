import React, { Component } from "react";
import { FlatButton, Popover, Menu } from "material-ui";
import { MenuItem } from "material-ui/Menu";

class CourseMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleCoursesClicked = () => (window.location.href = "/mycourses");
  handleOffersClicked = () => (window.location.href = "/myoffers");

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
        label="คอร์สเรียน"
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
            primaryText="คอร์สเรียนของฉัน"
            onClick={this.handleCoursesClicked}
          />
          <MenuItem
            primaryText="ข้อเสนอคอร์สเรียน"
            onClick={this.handleOffersClicked}
          />
        </Menu>
      </Popover>
    ];
  }
}

export default CourseMenu;
