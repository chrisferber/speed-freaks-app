import React, { Component } from 'react';
import { connect } from 'react-redux';
import UpcomingEventsList from '../UpcomingEventsList/UpcomingEventsList'; // imports child component to be rendered in this component
import Box from '@material-ui/core/Box'; // Material UI component used for spacing

// This component will render if user navigates to /upcoming-events and are logged in
// Displays a list of all track events currently on application
class UpcomingEvents extends Component {

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_EVENTS' }); // makes dispatch call to eventsSaga.js to fetch all events from database
  }

  render() {
    return (
      <Box m={5}>
      <div className="upcoming-events">
        <div className="upcoming-events-header">
          <h1>Upcoming Events:</h1>
        </div>
        <div className="upcoming-events-map-list">
          {/* conditionally maps through events reducer and sends each object to UpcomingEventsList component as a prop if events table has at least one event */}
          {this.props.reduxState.events[0] ?
          this.props.reduxState.events.map((event) => {
            return (
              <UpcomingEventsList key={event.id} event={event} />
            );
          }) :
          <h2>There are currently no upcoming track events. Please come back to see new events soon!</h2>
        }
        </div>
      </div>
      </Box>
    );
  }
} // End UpcomingEvents component

// Provides component with access to reduxState through props
const mapStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapStateToProps)(UpcomingEvents);
