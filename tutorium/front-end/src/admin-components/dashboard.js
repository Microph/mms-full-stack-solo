import React, { Component } from 'react';
import {
  Card,  
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
                    {genDashboardNumberDetail('deleteRequest')}
                </div>
            </div>
        );
    }
}

class DashboardNumberDetail extends Component {
    render() {
        return (
            <div class="col-sm-4 col-md-4">
                <Card 
                  style = {{
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
                </Card>
            </div>
        );
    }
}

function genDashboardNumberDetail(DashboardNumberDetailType) {
    let num = 0, text = '';
    switch(DashboardNumberDetailType)
    {
      case 'student': num = 1; text = 'student'; break;
      case 'tutor': num = 2; text = 'tutor';break;
      case 'tutorRequest': num = 3; text = 'tutorRequest';break;
      case 'report': num = 4; text = 'report';break;
      case 'suspenedAccounts': num = 5; text = 'suspenedAccounts';break;
      case 'deleteRequest': num = 6; text = 'deleteRequest';break;
      default: ;
    }

    return (
      <DashboardNumberDetail 
      number={num} 
      text={text}
    />);
}

export default Dashboard;