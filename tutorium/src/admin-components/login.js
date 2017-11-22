import React, { Component } from 'react';
import {
  FlatButton,
} from "material-ui";

class AdminLogin extends Component {
    constructor(props) {
        super(props);
            this.state = {
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      const name = event.target.name;
      this.setState({[name]: event.target.value});
    }

    handleSubmit(event) {
        alert('Login form submitted:\n' + 'username: ' + this.state.username + '\npassword: ' + this.state.password);
        event.preventDefault();
    }

    render() {
        return (
          <div class="container">
            <div class="row">
              <div class="col-xs-12 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
                <h2 align="center">ลงชื่อเข้าใช้</h2>

                <input name="username" type="text" class="form-control" placeholder="ชื่อผู้ใช้"
                  style={{
                    width: "100%",
                    backgroundColor: "white",
                    marginTop: 20,
                  }}
                  onChange={this.handleChange} />

                <input name="password" type="password" class="form-control" placeholder="รหัสผ่าน"
                secureTextEntry={true}
                style={{
                  width: "100%",
                  backgroundColor: "white",
                  marginTop: 20,
                }}
                onChange={this.handleChange} />

                <FlatButton
                  onClick={this.handleSubmit}
                  style={{
                    width: "100%",
                    color: "#fff",
                    margin: "auto",
                    marginTop: 20,
                    backgroundColor: "limegreen"
                  }}
                  labelStyle={{ fontSize: 15, fontWeight: 700 }}
                  label="ลงชื่อเข้าใช้"
                />
              </div>
            </div>
          </div>
        );
    }
}

export default AdminLogin;