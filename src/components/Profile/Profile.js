import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserEvents from '../UserEvents/UserEvents'; // imports UserEvents component to be rendered in Profile page
import Button from '@material-ui/core/Button'; // Material UI styled buttons
import Box from '@material-ui/core/Box'; // Material UI wrapper component for margins and padding

// This component will be rendered when a user navigates to /profile
// Displays the users active vehicle, events that the user is registered for and feature for user to add or delete a vehicle
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

    // React life cycle function that dispatches to vehicleSaga.js and userProfileSaga.js to fetch user data on component did mount
    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_VEHICLE' });
        this.props.dispatch({ type: 'FETCH_USER_EVENTS' });
    } // End componentDidMount function

    // Function that sets this.state.editVehicle to opposite current value to conditionally render edit vehicle input fields
    handleEditButtonClick = () => {
        this.setState({
            editVehicle: !this.state.editVehicle,
        });
    } // End handleEditButtonClick function

    // Function that sets this.state.addVehicle to opposite current value to conditionally render add vehicle input fields
    handleAddButtonClick = () => {
        this.setState({
            addVehicle: !this.state.addVehicle,
        });
    } // End handleAddButtonClick function

    // Function called on Save Vehicle button click that dispatches to postNewVehicleSaga.js to make HTTP POST request to server
    // and calls handleAddButtonClick function to collapse input fields
    postVehicle = () => {
        this.props.dispatch({ type: 'POST_NEW_VEHICLE', payload: this.state.newVehicle, });
        this.handleAddButtonClick();
    } // End postVehicle function

    // Function called on Save Vehicle button click that dispatches to updateNewVehicleSaga.js to make HTTP PUT request to server
    // and calls handleEditButtonClick function to collapse input fields
    updateVehicle = () => {
        this.props.dispatch({ type: 'UPDATE_NEW_VEHICLE', payload: this.state.newVehicle, });
        this.handleEditButtonClick();
    } // End updateVehicle function

    // Function called onChange of an input field, captures user inputs and stores them in local state to be dispatched to server later
    handleInputChangeFor = propertyName => (event) => {
        this.setState({
            ...this.state,
            newVehicle: {
                ...this.state.newVehicle,
                [propertyName]: event.target.value,
            }
        });
    } // End handleInputChangeFor function

    render() {
        return (
            <Box m={5}>
                <h1>Profile:</h1>
                <div className="profile">
                    <p>Username: {this.props.reduxState.user.username}</p>
                    <p>Email: {this.props.reduxState.user.email}</p>
                </div>
                <div className="vehicle">
                    {/* conditionally renders users vehicle info if vehicleReducer.id is truthy or no current vehicle message if falsy */}
                    {this.props.reduxState.vehicleReducer.id ?
                        <div>
                            <h3>Active Vehicle:</h3>
                            <p>{this.props.reduxState.vehicleReducer.year} {this.props.reduxState.vehicleReducer.make} {this.props.reduxState.vehicleReducer.model}</p>
                            <Button variant="contained" color="primary" onClick={this.handleEditButtonClick}>Edit Vehicle</Button>
                        </div>
                        :
                        <div>
                            <h3>Active Vehicle:</h3>
                            <p>You currently have no active vehicle set. Please add a vehicle to finish setting up your profile. Note, this can be changed at any time.</p>
                            <Button variant="contained" color="primary" onClick={this.handleAddButtonClick}>Add Vehicle</Button>
                        </div>
                    }
                </div>
                <div className="changeVehicle">
                    {/* conditionally renders input fields to add a vehicle on Add Vehicle button click */}
                    {this.state.addVehicle &&
                        <div>
                            <h3>Vehicle to be used at events:</h3>
                            <p>Make:</p><input onChange={this.handleInputChangeFor('make')} placeholder="eg. 'BMW', 'Audi', 'Porsche'" value={this.state.newVehicle.make}></input>
                            <p>Model:</p><input onChange={this.handleInputChangeFor('model')} placeholder="eg. 'M2', 'R8', 'Cayman GT4'" value={this.state.newVehicle.model}></input>
                            <p>Year:</p><input onChange={this.handleInputChangeFor('year')} placeholder="eg. '1999'" value={this.state.newVehicle.year}></input>
                            <div>
                            <Button variant="contained" color="primary" onClick={this.postVehicle}>Save Vehicle</Button>
                            </div>
                        </div>
                    }
                    {/* conditionally renders input fields to edit vehicle on Edit Vehicle button click */}
                    {this.state.editVehicle &&
                        <div>
                            <h3>Vehicle to be used at events:</h3>
                            <p>Make:</p><input onChange={this.handleInputChangeFor('make')} placeholder={this.props.reduxState.vehicleReducer.make} value={this.state.newVehicle.make}></input>
                            <p>Model:</p><input onChange={this.handleInputChangeFor('model')} placeholder={this.props.reduxState.vehicleReducer.model} value={this.state.newVehicle.model}></input>
                            <p>Year:</p><input onChange={this.handleInputChangeFor('year')} placeholder={this.props.reduxState.vehicleReducer.year} value={this.state.newVehicle.year}></input>
                            <div>
                            <Button variant="contained" color="primary" onClick={this.updateVehicle}>Save Vehicle</Button>
                            </div>
                        </div>
                    }
                </div>
                {/* conditionally renders UserEvents component if user is registered for at least one event, else renders no events message */}
                {this.props.reduxState.userEvents[0] ?
                <UserEvents />
                :
                <div>
                <h3>My Events</h3>
                <p>You are not currently registered for any upcoming events.</p>
                </div>
    }
                 
                 </Box>
        );
    }
} // End Profile component

// Provides reduxState to component through props
const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(Profile);