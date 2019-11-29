import React, { Component } from 'react';
import { connect } from 'react-redux';
import ImageUpload from '../ImageUpload/ImageUpload';

class CreateEvent extends Component {

  state = {
    uploadImage: false,
    newEvent: {
      eventTitle: '',
      eventStartDate: '',
      eventEndDate: '',
      upcomingDescription: '',
      detailsDescription: '',
      organizerContact: '',
      imageUrl: '',
    }
  }

  handleAddImage = (event) => {
    this.setState({
      ...this.state.newEvent,
      uploadImage: !this.state.uploadImage,
    })
    console.log(this.state);
  }

  handleAddImageUrl = (url) => {
    this.setState({
      ...this.state,
      newEvent: {
        ...this.state.newEvent,
        imageUrl: url,
      }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    this.props.dispatch({ type: 'CREATE_EVENT', payload: this.state.newEvent });
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
      newEvent: {
        ...this.state.newEvent,
        [propertyName]: event.target.value,
      }
    });
  }

  render() {
    if (this.state.uploadImage) {
      return (
        <div>
      <ImageUpload handleAddImageUrl={this.handleAddImageUrl}/>
      <button onClick={this.handleAddImage}>Finish Creating Event</button>
      </div>
      )}
    return (
      <>
        <h1>Create an Event</h1>
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
            <div className='imageUploadButton' onClick={() => { if (window.confirm('Would you like to add a photo to be displayed with the event?')) this.handleAddImage() }} >
              <input
                className="create-event"
                type="button"
                name="imageUpload"
                value="Add Event Image"
              />
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