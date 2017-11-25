import React, { Component } from 'react';
import {
  FlatButton,
  CircularProgress,
} from "material-ui";
import axios from "axios";
import { connect } from "react-redux";

const querystring = require("querystring");

class AdminLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
          username: '',
          password: '',
          clickedSubmit: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    checkSubmitStateForLebel(){
      if(!this.state.clickedSubmit){
        return 'เข้าสู่ระบบ';
      }
      else{
        return '';
      }
    }

    checkSubmitStateForCircularProgress(){
      if(this.state.clickedSubmit){
        return (<CircularProgress />);
      }
    }

    handleChange(event) {
      const name = event.target.name;
      //if(name == 'username' || name == 'password')
        this.setState({[name]: event.target.value});
    }
    
    /*componentDidUpdate(prevProps, prevState) {
      if(this.state.clickedSubmitted)
      {
        window.location.href = "/api/current-login-session";     
      }
    }*/

    checkSession = async () => {
      const user = await axios.get("/api/current-login-session");
      console.log(user);
    }

    handleSubmit(event) {
      this.setState({clickedSubmit: true});
      const res = axios({
        method: "POST",
        url: "/api/auth/admin",
        headers: {
          "Content-type": "application/x-www-form-urlencoded"
        },
        data: querystring.stringify({
          username: this.state.username,
          password: this.state.password,
        })
      }).then(() => {console.log('sdfsdsd')});
    };

    render() {
        return (
          <div class="container">
            <div class="row">
              <div class="col-xs-12 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
                <h2 align="center">ลงชื่อเข้าใช้</h2>

                <input name="username" type="text" class="form-control" placeholder="ชื่อผู้ใช้"
                  style={{
                    width: "100%",
                    height: 40,
                    backgroundColor: "white",
                    marginTop: 20,
                  }}
                  onChange={this.handleChange} />

                <input name="password" type="password" class="form-control" placeholder="รหัสผ่าน"
                secureTextEntry={true}
                style={{
                  width: "100%",
                  height: 40,
                  backgroundColor: "white",
                  marginTop: 20,
                }}
                onChange={this.handleChange} />

                <FlatButton
                  disabled={this.state.clickedSubmit}
                  onClick={this.handleSubmit}
                  style={{
                    width: "100%",
                    height: 40,
                    color: "#fff",
                    margin: "auto",
                    marginTop: 20,
                    backgroundColor: "limegreen"
                  }}
                  labelStyle={{ fontSize: 15, fontWeight: 700 }}
                  label={this.checkSubmitStateForLebel()}
                >
                  {this.checkSubmitStateForCircularProgress()}
                </FlatButton>
              </div>
            </div>
          </div>
        );
    }
}

//export default AdminLogin;
function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(AdminLogin);