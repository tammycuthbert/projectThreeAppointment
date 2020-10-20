import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

class LogoutBtn extends Component {
    // Event called when the logout button is pressed
    onLogoutClick = e => {
        e.preventDefault();
        // We logout the user by using the logoutUser() method from '../../actions/authActions'
        this.props.logoutUser();
    };

    render() {
        return (
            <div className="logout-btn">
                <button 
                    style={{
                        width: "100%",
                        height: "4rem",
                        letterSpacing: "1.5px"
                    }}
                    onClick={ this.onLogoutClick }
                    className="btn waves-effect waves-grey blue accent-3 white-text"
                >
                    Logout
                </button>
            </div>
        );
    }
}

LogoutBtn.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(LogoutBtn);