import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

class Calendar extends Component {
    constructor() {
        super();
        this.state = {
            department: ''
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
                            <span style={{ marginLeft: "20px"}}>/dept</span>
                        </h4>
                        <div className="divider"></div>
                    </div>
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

export default connect(mapStateToProps, { logoutUser })(Calendar);