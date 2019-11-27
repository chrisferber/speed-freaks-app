import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserEvents from '../UserEvents/UserEvents';

class Profile extends Component {

    state = {
        addVehicle: false,
        editVehicle: false,
        newVehicle: {
            make: '',
            model: '',
            year: '',
        },
    }

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_VEHICLE' });
        this.props.dispatch({ type: 'FETCH_USER_EVENTS' });
    }

    handleEditButtonClick = () => {
        this.setState({
            editVehicle: !this.state.editVehicle,
        });
    }

    handleAddButtonClick = () => {
        this.setState({
            addVehicle: !this.state.addVehicle,
        });
    }


    postVehicle = () => {
        this.props.dispatch({ type: 'POST_NEW_VEHICLE', payload: this.state.newVehicle, });
        this.handleAddButtonClick();
    }

    updateVehicle = () => {
        this.props.dispatch({ type: 'UPDATE_NEW_VEHICLE', payload: this.state.newVehicle, });
        this.handleEditButtonClick();
    }

    handleInputChangeFor = propertyName => (event) => {
        this.setState({
            ...this.state,
            newVehicle: {
                ...this.state.newVehicle,
                [propertyName]: event.target.value,
            }
        });
    }

    render() {
        return (
            <>
                <div className="profile">
                    <h2>Username: {this.props.reduxState.user.username}</h2>
                    <p>Email: {this.props.reduxState.user.email}</p>
                </div>
                <div className="vehicle">
                    {this.props.reduxState.vehicleReducer ?
                        <div>
                            <h3>Active Vehicle:</h3>
                            <p>{this.props.reduxState.vehicleReducer.year} {this.props.reduxState.vehicleReducer.make} {this.props.reduxState.vehicleReducer.model}</p>
                            <button onClick={this.handleEditButtonClick}>Edit Vehicle</button>
                        </div>
                        :
                        <div>
                            <h3>Active Vehicle:</h3>
                            <p>You currently have no active vehicle set. Please add a vehicle to finish setting up your profile. Note, this can be changed at any time.</p>
                            <button onClick={this.handleAddButtonClick}>Add Vehicle</button>
                        </div>
                    }
                </div>
                <div className="changeVehicle">
                    {this.state.addVehicle &&
                        <div>
                            <h3>Vehicle to be used at events:</h3>
                            <p>Make:</p><input onChange={this.handleInputChangeFor('make')} placeholder="eg. 'BMW', 'Audi', 'Porsche'" value={this.state.newVehicle.make}></input>
                            <p>Model:</p><input onChange={this.handleInputChangeFor('model')} placeholder="eg. 'M2', 'R8', 'Cayman GT4'" value={this.state.newVehicle.model}></input>
                            <p>Year:</p><input onChange={this.handleInputChangeFor('year')} placeholder="eg. '1999'" value={this.state.newVehicle.year}></input>
                            <button onClick={this.postVehicle}>Save Vehicle</button>
                        </div>
                    }
                    {this.state.editVehicle &&
                        <div>
                            <h3>Vehicle to be used at events:</h3>
                            <p>Make:</p><input onChange={this.handleInputChangeFor('make')} placeholder={this.props.reduxState.vehicleReducer.make} value={this.state.newVehicle.make}></input>
                            <p>Model:</p><input onChange={this.handleInputChangeFor('model')} placeholder={this.props.reduxState.vehicleReducer.model} value={this.state.newVehicle.model}></input>
                            <p>Year:</p><input onChange={this.handleInputChangeFor('year')} placeholder={this.props.reduxState.vehicleReducer.year} value={this.state.newVehicle.year}></input>
                            <button onClick={this.updateVehicle}>Save Vehicle</button>
                        </div>
                    }
                </div>
                {this.props.reduxState.userEvents ?
                <UserEvents />
                :
                <div>
                <h3>My Events</h3>
                <p>You are not currently registered for any upcoming events.</p>
                </div>
    }
                 
            </>
        );
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(Profile);