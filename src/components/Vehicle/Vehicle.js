import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class Vehicle extends Component {

    render() {
        return (
            <div className="vehicle">
                <h3>Active Vehicle:</h3>
    <p>{this.props.vehicle.year} {this.props.vehicle.make} {this.props.vehicle.model}</p>
            </div>
        );
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(Vehicle);