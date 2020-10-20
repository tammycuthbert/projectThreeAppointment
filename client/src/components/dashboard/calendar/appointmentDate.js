import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class AppointmentDate extends Component {
    constructor() {
        super();
        this.state = {
            date: new Date()
        };
    }

    render() {
        return (
            <button 
                style={{ 
                    width: "85%", 
                    borderRadius: "3px", 
                    letterSpacing: "1.5px" 
                }} 
                className="btn btn-flat waves-effect waves-light "
            >
                { this.props.hour }
            </button>
        );
    }
}

AppointmentDate.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(AppointmentDate);