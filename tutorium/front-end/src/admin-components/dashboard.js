import React, { Component } from 'react';
import axios from "axios";
import {
  FlatButton,  
} from "material-ui";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            studentsNum: 0,
            tutorsNum: 0,
            tutorRequestsNum: 0,
            reportsNum: 0,
            suspendedsNum: 0,
        };
    }

    async componentDidMount(){
        let a = 0, b = 0, c = 0, d = 0, e = 0;
        a = await this.getNumFromAPI('/api/search/student');
        b = await this.getNumFromAPI('/api/search/tutor');
        c = await this.getNumFromAPI('/api/admin/tutor-request-management');
        d = await this.getNumFromAPI('/api/admin/report-management');
        e = await this.getNumFromAPI('/api/admin/suspended-user-management');
        this.setState({
            studentsNum: a,
            tutorsNum: b,
            tutorRequestsNum: c,
            reportsNum: d,
            suspendedsNum: e,
        });
    }

    async getNumFromAPI(apiURL){
        const res = await axios({
            method: "GET",
            url: apiURL
        });
    
        let out = 0;
        if(res.data.success) {
            switch(apiURL){
                case '/api/search/student': out = res.data.students.length; break;
                case '/api/search/tutor': out = res.data.tutors.length; break;
                case '/api/admin/tutor-request-management': out = res.data.students.length; break;
                case '/api/admin/report-management': out = res.data.report.length; break;
                case '/api/admin/suspended-user-management': out = res.data.result.length; break;
                default: ;
            }
        }
        return out;
    }

    genDashboardNumberDetail(DashboardNumberDetailType) {
        let num = 0, text = '', url = '';
        switch(DashboardNumberDetailType)
        {
          case 'student': num = this.state.studentsNum; text = 'Students'; url = '/admin/usersmanage'; break;
          case 'tutor': num = this.state.tutorsNum; text = 'Tutors'; url = '/admin/usersmanage'; break;
          case 'tutorRequest': num = this.state.tutorRequestsNum; text = 'Tutor Requests'; url = '/admin/requestsmanage'; break;
          case 'report': num = this.state.reportsNum; text = 'Reports'; url = '/admin/reportsmanage'; break;
          case 'suspenedAccounts': num = this.state.suspendedsNum; text = 'Suspeneded Accounts'; url = '/admin/suspendedusers'; break;
          default: ;
        }

        return (
          <DashboardNumberDetail 
            onClick = {() => this.handleMenuClicked(url)}
            number= {num}
            text={text}
        />);
    }

    handleMenuClicked (url) {(window.location.href = url);}

    render() {
        return (
            <div>
                <h1>Dashboard</h1>
                <div class="row">
                    {this.genDashboardNumberDetail('student')}
                    {this.genDashboardNumberDetail('tutor')}
                    {this.genDashboardNumberDetail('tutorRequest')}
                </div>
                <div class="row">
                    {this.genDashboardNumberDetail('report')}
                    {this.genDashboardNumberDetail('suspenedAccounts')}
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

export default Dashboard;