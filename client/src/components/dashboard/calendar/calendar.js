import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AppointmentDate from './appointmentDate';
import LogoutBtn from '../../buttons/logoutBtn';

class Calendar extends Component {
    constructor() {
        super();
        this.state = {
            department: '',
            today: new Date(),
            dates: [],
            daysOfTheWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            hoursAvailable: ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM']
        };
    }

    // Event called when the logout button is pressed
    onLogoutClick = e => {
        e.preventDefault();
        // We logout the user by using the logoutUser() method from '../../actions/authActions'
        this.props.logoutUser();
    };

    render() {
        return(
            <div 
                style={{ height: "75vh" }}
                className="container"
            >
                <div className="row">
                    <div className="col s12">
                        <h4 style={{ fontSize: "2rem" }}>
                            <b>DEPARTMENT</b>
                            <span style={{ marginLeft: "20px" }}>/dept</span>
                        </h4>
                        <div className="divider"></div>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <table className="striped centered responsive-table blue-grey lighten-4">
                            <thead>
                                <tr>
                                    { this.state.daysOfTheWeek.map(day => ( <th>{ day }</th> )) }
                                </tr>
                            </thead>

                            <tbody>
                                { 
                                    this.state.hoursAvailable.map(hour => (
                                        <tr>
                                            { 
                                                this.state.daysOfTheWeek.map(day => (
                                                    <td><AppointmentDate hour={ hour } /></td>
                                                ))
                                            }
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table> 
                        <div className="divider"></div>
                    </div>
                </div>
                <div className="col s12">
                    <LogoutBtn />
                </div>
            </div>
        );
    }
}

Calendar.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Calendar);