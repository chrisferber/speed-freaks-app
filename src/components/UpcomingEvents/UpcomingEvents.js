import React, { Component } from 'react';
import { connect } from 'react-redux';
import UpcomingEventsList from '../UpcomingEventsList/UpcomingEventsList';


class UpcomingEvents extends Component {

  componentDidMount() {
    this.fetchEvents();
  }

  fetchEvents = () => {
    this.props.dispatch({ type: 'FETCH_EVENTS' });
  }

  render() {
    return (
      <div className="upcoming-events">
        <div className="upcoming-events-header">
          <h2>Upcoming Events</h2>
        </div>
        <div className="upcoming-events-map-list">
          {this.props.reduxState.events.map((event) => {
            return (
              <UpcomingEventsList key={event.id} event={event} />
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapStateToProps)(UpcomingEvents);
