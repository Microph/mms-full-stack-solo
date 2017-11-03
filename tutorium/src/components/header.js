import React, { Component } from 'react';
import '../App.css';
import { Navbar, Nav, NavItem, FormGroup, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom'

const logo = require("../resources/Tutorium_icon.png");

class Header extends Component {
    render() {
        return (
            <Navbar collapseOnSelect bsStyle='inverse'>
                <Navbar.Header>
                    <Navbar.Brand >
                    <Link to="/" style={{color:'#fff', marginTop: -20, fontSize:25}}><span><img className="logo" src={logo} alt="Tutorium" />Tutorium</span></Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Form pullLeft>
                    <FormGroup>
                        <FormControl type="text" placeholder="ค้นหาคอร์สเรียน" style={{ width: '100%' }} />
                    </FormGroup>
                </Navbar.Form>
                <Navbar.Collapse>
                    <Nav pullRight>
                        <NavItem eventKey={1}><Link to="/signin" style={{color:'#fff'}}>ฉันเป็นติวเตอร์</Link></NavItem>
                        <NavItem eventKey={2}><Link to="/signin" style={{color:'#fff'}}>ลงชื่อเข้าใช้</Link></NavItem>
                        <NavItem eventKey={3}><Link to="/signup" style={{color:'#fff'}}>สมัครสมาชิก</Link></NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Header;

// const navbarInstance = (
    // <Navbar inverse collapseOnSelect>
    //   <Navbar.Header>
    //     <Navbar.Brand>
    //       <a href="#">React-Bootstrap</a>
    //     </Navbar.Brand>
    //     <Navbar.Toggle />
    //   </Navbar.Header>
    //   <Navbar.Collapse>
    //     <Nav>
    //       <NavItem eventKey={1} href="#">Link</NavItem>
    //       <NavItem eventKey={2} href="#">Link</NavItem>
    //       <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
    //         <MenuItem eventKey={3.1}>Action</MenuItem>
    //         <MenuItem eventKey={3.2}>Another action</MenuItem>
    //         <MenuItem eventKey={3.3}>Something else here</MenuItem>
    //         <MenuItem divider />
    //         <MenuItem eventKey={3.3}>Separated link</MenuItem>
    //       </NavDropdown>
    //     </Nav>
    //     <Nav pullRight>
    //       <NavItem eventKey={1} href="#">Link Right</NavItem>
    //       <NavItem eventKey={2} href="#">Link Right</NavItem>
    //     </Nav>
    //   </Navbar.Collapse>
    // </Navbar>
//   );