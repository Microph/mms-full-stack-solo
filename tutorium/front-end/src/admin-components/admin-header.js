import React, { Component } from 'react';

class AdminHeader extends Component {
    render() {
        if (this.props.location.pathname.indexOf("/admin") !== 0) return <div />;
        if (this.props.location.pathname.indexOf("/admin/login") === 0) return <div />;
        return (
            <h1>AdminHeader</h1>
        );
    }
}

export default AdminHeader;