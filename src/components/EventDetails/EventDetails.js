import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import moment from 'moment'; // imports moment.js into component to properly format dates

// imports Material UI components to be used for styling in this component
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Box from '@material-ui/core/Box';

import EditCreatedEvent from '../EditCreatedEvent/EditCreatedEvent'; // child component to be rendered within this component

// This component will display information on the current event from reduxState.currentEvent
// Base component for /event-details route
class EventDetails extends Component {

  // local state used in conditional rendering of EditCreatedEvent component as well as in Redirecting back to /upcoming-events
  state = {
    toggleEditEvent: false,
    toUpcomingEvents: false,
  }
  
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_VEHICLE' }); // Makes GET request in vehicleSaga.js to fetch user vehicle on component did mount
  }

  // Function that dispatches to registerForEventSaga.js to register a user for specific event on Register button click
  // Alerts user and does not allow registration to an event if they do not have an active vehicle on their profile
  registerForEvent = () => {
    if (this.props.reduxState.vehicleReducer.id) {
      this.props.dispatch({ type: 'EVENT_REGISTER', payload: this.props.reduxState.currentEvent });
    } else {
      alert('To register for an event your profile must have an active vehicle set. You can add a vehicle to your profile in the Profile page.');
    }
  } // End registerForEvent function

  // Function that toggles rendering of EditCreatedEvent component through conditional rendering
  // Called on Edit Event or Collapse Edit View button clicks
  handleEditEventButtonClick = () => {
    this.setState({
      toggleEditEvent: !this.state.toggleEditEvent
    });
  } // End handleEditEventButtonClick function

  // Function that is called on Delete Event button click, only accessible if user is the creator of the event
  // Makes dispatch call to eventsSaga.js to delete an event from the database
  handleDeleteEventButtonClick = () => {
    this.props.dispatch({ type: 'DELETE_EVENT', payload: this.props.reduxState.currentEvent });
    this.setState({
      toUpcomingEvents: true,
    });
  } // End handleDeleteEventButtonClick function

  render() {
    // Conditional to Redirect user to /upcoming-events if current event is deleted or if currentEvent reducer is null
    if (this.state.toUpcomingEvents === true) {
      return <Redirect to='/upcoming-events' />
    } else if (!this.props.reduxState.currentEvent.event_name) {
      return <Redirect to='/upcoming-events' />
    }
    return (
      <Box m={5}> {/* Provides margin from component content to edges of screen */}
        <div className="EventDetails">
          <h2>
            {this.props.reduxState.currentEvent.event_name}
          </h2>
          {/* renders event image if current event has non null image_url property */}
          {this.props.reduxState.currentEvent.image_url &&
            <img src={this.props.reduxState.currentEvent.image_url} alt="Event" height="300px" />
          }
          <p>{moment(this.props.reduxState.currentEvent.event_date_start).format('MM/DD/YYYY')}   -   {moment(this.props.reduxState.currentEvent.event_date_end).format('MM/DD/YYYY')}</p>
          <p>{this.props.reduxState.currentEvent.details_description}</p>
          <p>{this.props.reduxState.currentEvent.admin_contact}</p>
        </div>
        {/* Condittionally render Delete Event and Edit Event buttons/features if user is the creator of the event */}
        {this.props.reduxState.user.id === this.props.reduxState.currentEvent.created_id ?
          <Grid item>
            <ButtonGroup color="primary" size="small" aria-label="small outlined button group">
              <Button onClick={this.registerForEvent}>Register</Button>
              <Button onClick={this.handleEditEventButtonClick}>{this.state.toggleEditEvent ? 'Collapse Edit View' : 'Edit Event'}</Button>
              <Button onClick={() => { if (window.confirm('Are you sure you wish to delete this event? This cannot be undone.')) this.handleDeleteEventButtonClick() }}>
                Delete Event
              </Button>
            </ButtonGroup>
          </Grid> :
          <Button onClick={this.registerForEvent} variant="contained" color="primary">Register</Button>
        }
        {this.state.toggleEditEvent &&
          <div className="renderEditCreatedEvent">
            <EditCreatedEvent />
          </div>
        }
        <div className="registrationStatusMessage">
          {/* maps through userEvents reducer and conditionally renders a users registration status for event accordingly */}
          {this.props.reduxState.userEvents.map((registration) => {
            if (registration.event_id === this.props.reduxState.currentEvent.id) {
              return (
                <div key={registration.event_id}>
                  <h3>You are signed up for this event!</h3>
                  {registration.registration_complete ?
                    <div>
                      <h4>Registration Status: Complete</h4>
                      <p>You are all set to race! Make sure you are checking your email for further event information from the organizer.</p>
                    </div> :
                    <div>
                      <h4>Registration Status: Pending</h4>
                      <p>The event organizer has not yet checked you off as fully registered. Please check your email frequently as the organizer will be contacting you with info to complete your registration for this event.</p>
                    </div>
                  }
                </div>
              );
            } else {
              return (
                <p key={registration.event_id}></p>
              );
            }
          })
          }
        </div>
      </Box>
    );
  }
}

// Provides component access to reduxState through props
const mapStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapStateToProps)(EventDetails);