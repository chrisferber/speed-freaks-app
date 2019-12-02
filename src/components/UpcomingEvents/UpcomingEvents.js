import React, { Component } from 'react';
import { connect } from 'react-redux';
import UpcomingEventsList from '../UpcomingEventsList/UpcomingEventsList';
import Box from '@material-ui/core/Box';


class UpcomingEvents extends Component {

  componentDidMount() {
    this.fetchEvents();
  }

  fetchEvents = () => {
    this.props.dispatch({ type: 'FETCH_EVENTS' });
  }

  render() {
    return (
      <Box m={5}>
        <div className="upcoming-events">
          <div className="upcoming-events-header">
            <h1>Upcoming Events:</h1>
          </div>
          <div className="upcoming-events-map-list">
            {this.props.reduxState.events.map((event) => {
              return (
                <UpcomingEventsList key={event.id} event={event} />
              );
            })}
          </div>
        </div>
      </Box>
    );
  }
}

const mapStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapStateToProps)(UpcomingEvents);
