import React, { Component } from 'react';
import { connect } from 'react-redux';
import ImageUpload from '../ImageUpload/ImageUpload';

class CreateEvent extends Component {

  state = {
    eventTitle: '',
    eventStartDate: '',
    eventEndDate: '',
    upcomingDescription: '',
    detailsDescription: '',
    organizerContact: '',
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    this.props.dispatch({ type: 'CREATE_EVENT', payload: this.state });
    this.setState({
      eventTitle: '',
      eventStartDate: '',
      eventEndDate: '',
      upcomingDescription: '',
      detailsDescription: '',
      organizerContact: '',
    });
  }

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <>
        <h1>Create an Event</h1>
        <div>
          <ImageUpload />
        </div>
        <div className="createEventForm">
          <form onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="eventTitle">
                Event Title:
              <input
                  type="text"
                  name="eventTitle"
                  value={this.state.eventTitle}
                  onChange={this.handleInputChangeFor('eventTitle')}
                />
              </label>
            </div>
            <div>
              <label htmlFor="upcomingDescription">
                Upcoming Events Description:
              <input
                  type="text"
                  name="upcomingDescription"
                  value={this.state.upcomingDescription}
                  onChange={this.handleInputChangeFor('upcomingDescription')}
                />
              </label>
            </div>
            <div>
              <label htmlFor="detailsDescription">
                Event Details Description:
              <input
                  type="text"
                  name="detailsDescription"
                  value={this.state.detailsDescription}
                  onChange={this.handleInputChangeFor('detailsDescription')}
                />
              </label>
            </div>
            <div>
              <label htmlFor="organizerContact">
                Organizer Contact Info:
              <input
                  type="text"
                  name="organizerContact"
                  value={this.state.organizerContact}
                  onChange={this.handleInputChangeFor('organizerContact')}
                />
              </label>
            </div>
            <div>
              <label htmlFor="eventStartDate">
                Event Start Date:
              <input
                  type="date"
                  name="eventStartDate"
                  value={this.state.eventStartDate}
                  onChange={this.handleInputChangeFor('eventStartDate')}
                />
              </label>
            </div>
            <div>
              <label htmlFor="eventEndDate">
                Event End Date:
              <input
                  type="date"
                  name="eventEndDate"
                  value={this.state.eventEndDate}
                  onChange={this.handleInputChangeFor('eventEndDate')}
                />
              </label>
            </div>
            <div>
              <input
                className="create-event"
                type="submit"
                name="submit"
                value="Create Event"
              />
            </div>
          </form>
        </div>
      </>
    );
  }
}

const mapStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapStateToProps)(CreateEvent);