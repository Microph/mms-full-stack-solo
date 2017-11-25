import React, { Component } from "react";
import { Divider, FlatButton } from "material-ui";
import UserPayment from "./profiles-component/userpayment";
import UserInfo from "./profiles-component/user-info";
import StudyInfo from "./profiles-component/study-info";

class Profile extends Component {
  handleLogoutClicked = () => (window.location.href = "/api/logout");

  render() {
    return (
      <div>
        <UserInfo />
        <Divider
          style={{
            backgroundColor: "#505050",
            marginTop: 30,
            marginBottom: 20
          }}
        />
        <StudyInfo />
        <Divider
          style={{
            backgroundColor: "#505050",
            marginTop: 30,
            marginBottom: 20
          }}
        />
        {/* Payment */}
        <UserPayment />
        <Divider
          style={{
            backgroundColor: "#505050",
            marginTop: 30,
            marginBottom: 20
          }}
        />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <FlatButton
            onClick={this.handleLogoutClicked}
            backgroundColor="#005"
            hoverColor="#003"
            style={{ color: "#fff", width: "20%", margin: 20 }}
            label="ออกจากระบบ"
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <FlatButton
            onClick={this.handleLogoutClicked}
            backgroundColor="#a00"
            hoverColor="#900"
            style={{ color: "#fff", width: "20%", margin: 20, marginTop: 0 }}
            label="ลบบัญชีผู้ใช้"
          />
        </div>
      </div>
    );
  }
}

export default Profile;
