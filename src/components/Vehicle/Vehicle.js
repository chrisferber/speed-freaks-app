import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class Vehicle extends Component {

    // state = {
    //     hasVehicle: false,
    // }

    // componentDidMount() {
    //     this.editAddButton();
    // }

    // editAddButton = () => {
    //     this.props.vehicle.make ? (
    //         this.setState({
    //             hasVehicle: true,
    //         }) : (this.setState({
    //             hasVehi
    //         }))
    //     )

    // }

    render() {
        return (
            <div className="vehicle">
                {this.props.reduxState.vehicleReducer[0] ?
                    <div>
                        <h3>Active Vehicle:</h3>
                        <p>{this.props.reduxState.vehicleReducer[0].year} {this.props.reduxState.vehicleReducer[0].make} {this.props.reduxState.vehicleReducer[0].model}</p>
                        <button>Edit Vehicle</button>
                    </div>
                    :
                    <div>
                        <h3>Active Vehicle:</h3>
                        <p>You currently have no active vehicle set. Please add a vehicle to finish setting up your profile. Note, this can be changed at any time.</p>
                        <button>Add Vehicle</button>
                    </div>
                }
            </div>

        );
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(Vehicle);