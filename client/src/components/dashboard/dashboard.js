import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

class Dashboard extends Component {
    // Event called when the logout button is pressed
    onLogoutClick = e => {
        e.preventDefault();
        // We logout the user by using the logoutUser() method from '../../actions/authActions'
        this.props.logoutUser();
    };

    // Event called when the calendat button is pressed
    onCalendarClick = e => {
        e.preventDefault();
        // We redirect the user to the calendar page
        this.props.history.push("/calendar");
    }

    render() {
        const { user } = this.props.auth;

        return (
            <div style={{ height: "75vh" }} className="container valign-wrapper">
                <div className="row">
                    <div className="col s12">
                        <h4>
                            <b>{ user.name.split(" ")[0] },</b>
                            <p className="flow-text grey-text text-darken-1">
                                Welcome on your <span style={{ fontFamily: 'monospace' }}>/dashboard</span> ! 
                                <br/>
                                You may review your appointments, change them if they haven't been accepted yet, or even cancel them.
                            </p>
                        </h4>
                        <button
                            style={{
                                letterSpacing: "1.5px",
                                margin: "1rem 0"
                            }}
                            onClick={ this.onCalendarClick }
                            className="btn btn-large waves-effect waves-light hoverable teal darken"
                        >
                            Access Calendar
                        </button>
                        <button
                            style={{
                                letterSpacing: "1.5px",
                                margin: "1rem 0"
                            }}
                            className="btn btn-large waves-effect hoverable grey lighten-2 grey-text text-darken-2"
                        >
                            Review Schedule
                        </button>
                        <button
                            style={{
                                letterSpacing: "1.5px",
                                margin: "1rem 0"
                            }}
                            className="btn btn-large waves-effect waves-light hoverable red darken-3"
                        >
                            Cancel Appointment
                        </button>
                        <div className="divider"></div>
                        <button 
                            style={{
                                width: "150px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                marginTop: "1rem"
                            }}
                            onClick={ this.onLogoutClick }
                            className="btn-flat btn-large waves-effect waves-grey white"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);
