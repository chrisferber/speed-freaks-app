import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
 
class EventDetails extends Component {

    registerForEvent = () => {
      this.props.dispatch({ type:'EVENT_REGISTER', payload: this.props.reduxState.currentEvent })
    }

    render() {
    return (
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
    );
  }
}

const mapStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapStateToProps)(EventDetails);