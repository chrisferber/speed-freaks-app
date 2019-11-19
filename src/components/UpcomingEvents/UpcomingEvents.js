import React, { Component } from 'react';
import { connect } from 'react-redux';


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
              <h2>
                  Upcoming Events
              </h2>
          </div>
      );
  }
}

const mapStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapStateToProps)(UpcomingEvents);
