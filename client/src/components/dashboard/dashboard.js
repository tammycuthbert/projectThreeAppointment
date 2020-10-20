import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LogoutBtn from '../buttons/logoutBtn';

class Dashboard extends Component {
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
                            </p>
                            <p className="flow-text grey-text text-darken-1">
                                You may schedule new appointments, review, cancel or even change them if they haven't been accepted yet.
                            </p>
                        </h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <button
                            style={{
                                width: "100%",
                                height: "6rem",
                                letterSpacing: "1.5px"
                            }}
                            onClick={ this.onCalendarClick }
                            className="btn-flat btn-large waves-effect waves-light hoverable teal darken white-text"
                        >
                            Access Calendar
                        </button>
                    </div>
                    <div className="col s12">
                        <button
                            style={{
                                width: "100%",
                                height: "4rem",
                                letterSpacing: "1.5px",
                                margin: "1rem 0"
                            }}
                            className="btn-flat btn-large waves-effect hoverable grey lighten-2 grey-text text-darken-3"
                        >
                            Review Schedule
                        </button>
                    </div>
                    <div className="col s12">
                        <button
                            style={{
                                width: "100%",
                                height: "4rem",
                                letterSpacing: "1.5px"
                            }}
                            className="btn-flat btn-large waves-effect waves-light hoverable red darken-3 white-text"
                        >
                            Cancel Appointment
                        </button>
                    </div>
                </div>
                <div className="col s12">
                    <LogoutBtn />
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Dashboard);
