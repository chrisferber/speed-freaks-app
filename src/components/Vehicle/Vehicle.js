import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class Vehicle extends Component {

    render() {
        return (
            <div className="vehicle">
                Vehicle Component
            </div>

        );
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(Vehicle);