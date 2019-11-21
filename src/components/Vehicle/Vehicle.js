import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class Vehicle extends Component {

    componentDidMount() {
        this.fetchVehicle();
    }

    fetchVehicle = () => {
        this.props.dispatch({ type: 'FETCH_VEHICLE' });
    }

    render() {
        return (
            <div className="vehicle">
                <h2>Username: {this.props.reduxState.user.username}</h2>
                <p>Email: {this.props.reduxState.user.email}</p>
            </div>
        );
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(Vehicle);