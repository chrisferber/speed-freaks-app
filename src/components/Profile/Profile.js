import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Vehicle from '../Vehicle/Vehicle';

class Profile extends Component {

    componentDidMount() {
        this.fetchVehicle();
    }

    fetchVehicle = () => {
        this.props.dispatch({ type: 'FETCH_VEHICLE' });
        console.log('fetchVehicle function ran in Vehicle.js');
    }
    
    render() {
        return (
            <>
            <div className="profile">
                <h2>Username: {this.props.reduxState.user.username}</h2>
                <p>Email: {this.props.reduxState.user.email}</p>
            </div>
            <div>
              <Vehicle />
          {/* {this.props.reduxState.vehicleReducer.map((vehicle) => {
            return (
              <Vehicle key={vehicle.id} vehicle={vehicle} />
            );
          })} */}
            </div>
            </>
        );
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(Profile);