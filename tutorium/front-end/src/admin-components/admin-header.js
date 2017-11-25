import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {
    Drawer,
    MenuItem,
    RaisedButton,
    List, 
    ListItem
} from "material-ui";

const logo = require("../resources/Tutorium_icon.png");

class AdminHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }

    getPageName (){
        let out = '';
        switch(this.props.location.pathname){
            case '/admin/dashboard': out = 'Dashboard '; break;
            case '/admin/usersmanage': out = 'Users Management '; break;
            case '/admin/requestsmanage': out = 'Tutor Requests '; break;
            case '/admin/reportsmanage': out = 'User Reports '; break;
            case '/admin/deleterequests': out = 'User Deletion Requests '; break;
            case '/admin/suspendedusers': out = 'Suspended Users '; break;
            default: ;
        }
        return out;
    }
    handleToggle = () => this.setState({open: !this.state.open})
    handleClose = () => this.setState({open: false});
    handleMenuNavClicked = (url) => (window.location.href = url);

    render() {
        if (this.props.location.pathname.indexOf("/admin") !== 0) return <div />;
        if (this.props.location.pathname.indexOf("/admin/login") === 0) return <div />;
        return (
            <div>
                <Drawer
                    openSecondary
                    docked={false}
                    width={300}
                    containerStyle={{ backgroundColor: "#0f1531", textAlign: "center" }}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}
                    >
                    
                    <MenuItem style={{ margin: 30 }}>
                        <Link to={"/"} style={{ textDecoration: "none" }}>
                            <span style={{ fontSize: 14, color: "#fff" }}>
                                <img className="logo logo-header" src={logo} alt="Tutorium" />
                                <b>{this.getPageName()}</b>
                            </span>
                        </Link>
                    </MenuItem>
                    
                    <List>
                        {/* Menu */}
                        <ListItem
                            style={{ color: "#fff" }}
                            onClick={() => this.handleMenuNavClicked('/admin/dashboard')}
                            primaryText="Dashboard"
                        />
                        <ListItem
                            style={{ color: "#fff" }}
                            onClick={() => this.handleMenuNavClicked('/admin/usersmanage')}
                            primaryText="Users Management"
                        />
                        <ListItem
                            style={{ color: "#fff" }}
                            onClick={() => this.handleMenuNavClicked('/admin/requestsmanage')}
                            primaryText="Tutor Requests"
                        />
                        <ListItem
                            style={{ color: "#fff" }}
                            onClick={() => this.handleMenuNavClicked('/admin/reportsmanage')}
                            primaryText="User Reports"
                        />
                        <ListItem
                            style={{ color: "#fff" }}
                            onClick={() => this.handleMenuNavClicked('/admin/deleterequests')}
                            primaryText="User Deletion Requests"
                        />
                        <ListItem
                            style={{ color: "#fff" }}
                            onClick={() => this.handleMenuNavClicked('/admin/suspendedusers')}
                            primaryText="Suspended Users"
                        />
                        <MenuItem
                        onClick={this.handleClose}
                        style={{ fontSize: 16, color: "#fff", margin: 20 }}
                        >
                        <b>logout</b>
                        </MenuItem>
                    </List>
                </Drawer>

                <nav className="navbar header">
                    <div className="container">
                        <div className="pull-left">
                            <Link to={"/"} style={{ textDecoration: "none" }}>
                                <span style={{ fontSize: 30, color: "#fff" }}>
                                <img className="logo logo-header" src={logo} alt="Tutorium" />
                                    Tutorium
                                </span>
                                <span style={{ paddingLeft:15, fontSize: 24, color: "#ff0" }}>
                                    <i>admin</i>
                                </span>
                            </Link>
                        </div>
                        {/* Hambuger with page name*/}
                        <div className="pull-right hidden-xs">
                            <span style={{ fontSize: 30, color: "#fff" }}>
                                {this.getPageName()}
                                <div 
                                    style={{
                                    fontSize: 30,
                                    cursor: "pointer",
                                    color: "#fff",
                                    marginTop: 5
                                    }}
                                    onClick={this.handleToggle}
                                    className="glyphicon glyphicon-menu-hamburger"
                                />
                            </span>
                        </div>
                        {/* Hambuger only*/}
                        <div className="pull-right visible-xs">
                            <span style={{ fontSize: 30, color: "#fff" }}>
                                <div 
                                    style={{
                                    fontSize: 30,
                                    cursor: "pointer",
                                    color: "#fff",
                                    marginTop: 5
                                    }}
                                    onClick={this.handleToggle}
                                    className="glyphicon glyphicon-menu-hamburger"
                                />
                            </span>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default AdminHeader;