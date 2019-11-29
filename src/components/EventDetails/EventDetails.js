import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditCreatedEvent from '../EditCreatedEvent/EditCreatedEvent';
import { Redirect } from 'react-router-dom';

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
          <p>{this.props.reduxState.currentEvent.event_date_start}</p>
          <p>{this.props.reduxState.currentEvent.event_date_end}</p>
          <p>{this.props.reduxState.currentEvent.details_description}</p>
          <p>{this.props.reduxState.currentEvent.admin_contact}</p>
          <button onClick={this.registerForEvent}>Register</button>
        </div>
        {this.props.reduxState.user.id === this.props.reduxState.currentEvent.created_id &&
          <div>
            <div>
              <button onClick={this.handleEditEventButtonClick}>{this.state.toggleEditEvent ? 'Collapse Edit View' : 'Edit Event'}</button>
            </div>
            <div className='delete-button' onClick={() => { if (window.confirm('Are you sure you wish to delete this event? This cannot be undone.')) this.handleDeleteEventButtonClick() }} >
              <button>Delete Event</button>
            </div>
          </div>
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
                  <h3>You are already registered for this event!</h3>
                  <div>
                    {registration.registration_complete ?
                      <p>Your current registration status is Complete. You are all set to race! Make sure you are checking your email for information from the organizer.</p> :
                      <p>Your current registration status is Pending. The event organizer has not yet checked you off as fully registered. Remember to be checking your email for details on any prerequisites needed for registration.</p>
                    }
                  </div>
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