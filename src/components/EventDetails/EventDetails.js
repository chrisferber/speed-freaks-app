import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditCreatedEvent from '../EditCreatedEvent/EditCreatedEvent';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

class EventDetails extends Component {

  state = {
    toggleEditEvent: false,
    toUpcomingEvents: false,
  }

  registerForEvent = () => {
    this.props.dispatch({ type: 'EVENT_REGISTER', payload: this.props.reduxState.currentEvent })
  }

  handleEditEventButtonClick = () => {
    this.setState({
      toggleEditEvent: !this.state.toggleEditEvent
    })
  }

  handleDeleteEventButtonClick = () => {
    console.log('delete event button was clicked in EventDetails.js');
    this.props.dispatch({ type: 'DELETE_EVENT', payload: this.props.reduxState.currentEvent })
    this.setState({
      toUpcomingEvents: true,
    })
  }

  render() {
    if (this.state.toUpcomingEvents === true) {
      return <Redirect to='/upcoming-events' />
    } else if (!this.props.reduxState.currentEvent.event_name) {
      return <Redirect to='upcoming-events' />
    }
    return (
      <>
        <div className="EventDetails">
          <h2>
            {this.props.reduxState.currentEvent.event_name}
          </h2>
          {this.props.reduxState.currentEvent.image_url &&
            <img src={this.props.reduxState.currentEvent.image_url} height="300px" />
          }
          <p>{moment(this.props.reduxState.currentEvent.event_date_start).format('MM/DD/YYYY')}   -   {moment(this.props.reduxState.currentEvent.event_date_end).format('MM/DD/YYYY')}</p>
          <p>{this.props.reduxState.currentEvent.details_description}</p>
          <p>{this.props.reduxState.currentEvent.admin_contact}</p>
        </div>
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
            }
          })

          }
        </div>
      </>

    );
  }
}

const mapStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapStateToProps)(EventDetails);