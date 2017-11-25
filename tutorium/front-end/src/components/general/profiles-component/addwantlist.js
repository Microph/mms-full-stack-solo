import React, { Component } from "react";
import { FlatButton, Dialog } from "material-ui";

class AddWantListDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.open
    };
  }

  render() {
    const actions = [
      <FlatButton label="ยกเลิก" primary={true} onClick={null} />,
      <FlatButton
        label="ตกลง"
        primary={true}
        keyboardFocused={true}
        onClick={null}
      />
    ];
    return (
      <div>
        <Dialog
          title="เพิ่มวิชาที่ต้องการเรียน"
          actions={actions}
          open={this.state.open}
          onRequestClose={null}
        >
          The actions in this window were passed in as an array of React
          objects.
        </Dialog>
      </div>
    );
  }
}

export default AddWantListDialog;
