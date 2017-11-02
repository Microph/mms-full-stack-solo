import React, { Component } from 'react';
import '../App.css';

const logo = require("../resources/Tutorium_icon.png");

class Header extends Component {
  render() {
    return (
      <div className="header">
          <img className="logo" src={logo} alt="Tutorium" />
      </div>
    );
  }
}

export default Header;
