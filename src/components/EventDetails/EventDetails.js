import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditCreatedEvent from '../EditCreatedEvent/EditCreatedEvent';

class EventDetails extends Component {

  state = {
    toggleEditEvent: false,
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
  }

  render() {
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
            <button onClick={this.handleEditEventButtonClick}>{this.state.toggleEditEvent ? 'Collapse Edit View' : 'Edit Event'}</button>
            <button onClick={this.handleDeleteEventButtonClick}>Delete Event</button>
          </div>
        }
        {this.state.toggleEditEvent &&
          <div className="renderEditEvent">
            <EditCreatedEvent />
          </div>
        }
      </>
    );
  }
}

const mapStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapStateToProps)(EventDetails);