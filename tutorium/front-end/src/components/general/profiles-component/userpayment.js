import React, { Component } from "react";
import { FlatButton } from "material-ui";

class UserPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  addPayment = () => {};

  render() {
    return (
      <div>
        <span style={{ fontSize: 25 }}>
          การชำระเงิน
          <FlatButton
            onClick={this.addPayment}
            style={{ borderColor: "#505050", borderWidth: "1px" }}
            label="+ เพิ่มวิธีการชำระเงิน"
          />
        </span>
      </div>
    );
  }
}

export default UserPayment;
