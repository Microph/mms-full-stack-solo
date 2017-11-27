import React, { Component } from 'react';
import {
  FlatButton,  
} from "material-ui";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailText: ''
        };
    }

    render() {
        return (
            <div>
                <h1>Dashboard</h1>
                <div class="row">
                    {genDashboardNumberDetail('student')}
                    {genDashboardNumberDetail('tutor')}
                    {genDashboardNumberDetail('tutorRequest')}
                </div>
                <div class="row">
                    {genDashboardNumberDetail('report')}
                    {genDashboardNumberDetail('suspenedAccounts')}
                </div>
            </div>
        );
    }
}

class DashboardNumberDetail extends Component {
    render() {
        return (
            <div class="col-sm-4 col-md-4">
                <FlatButton 
                    onClick={this.props.onClick}
                  style = {{
                    backgroundColor: 'white',
                    height: 120,
                    width: 220,
                    margin: 30,
                    textAlign: 'center',
                    display: 'inline-block'
                  }}
                >
                  <h1 style={{
                      paddingBottom: 10,
                  }}>{this.props.number}</h1>
                  <h4>{this.props.text}</h4>
                </FlatButton>
            </div>
        );
    }
}

function handleMenuClicked (url) {(window.location.href = url);}

function genDashboardNumberDetail(DashboardNumberDetailType) {
    let num = 0, text = '', url = '';
    switch(DashboardNumberDetailType)
    {
      case 'student': num = 1; text = 'Students'; url = '/admin/usersmanage'; break;
      case 'tutor': num = 2; text = 'Tutors'; url = '/admin/usersmanage'; break;
      case 'tutorRequest': num = 3; text = 'Tutor Requests'; url = '/admin/requestsmanage'; break;
      case 'report': num = 4; text = 'Reports'; url = '/admin/reportsmanage'; break;
      case 'suspenedAccounts': num = 5; text = 'Suspeneded Accounts'; url = '/admin/suspendedusers'; break;
      default: ;
    }

    return (
      <DashboardNumberDetail 
        onClick = {() => handleMenuClicked(url)}
        number={num} 
        text={text}
    />);
}

export default Dashboard;