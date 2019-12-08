import React, { Component } from 'react';
import { connect } from 'react-redux';
import ImageUpload from '../ImageUpload/ImageUpload';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';

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
  };

  handleAddImage = (event) => {
    this.setState({
      ...this.state.newEvent,
      uploadImage: !this.state.uploadImage,
    })
    console.log(this.state);
  };

  handleAddImageUrl = (url) => {
    this.setState({
      ...this.state,
      newEvent: {
        ...this.state.newEvent,
        imageUrl: url,
      }
    })
  };

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
  };

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      newEvent: {
        ...this.state.newEvent,
        [propertyName]: event.target.value,
      }
    });
  };

  useStyles = makeStyles(theme => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 200,
      },
    },
  }));

  render() {
    if (this.state.uploadImage) {
      return (
        <Box m={5}>
          <div>
            <ImageUpload handleAddImageUrl={this.handleAddImageUrl} />
            <button onClick={this.handleAddImage}>Finish Creating Event</button>
          </div>
        </Box>
      )
    }
    return (
      <Box m={5}>
        <h1>Create an Event:</h1>
        <div className="createEventForm">
              <TextField
                id="eventTitle"
                label="Event Title"
                type="text"
                variant="outlined"
                value={this.state.eventTitle}
                onChange={this.handleInputChangeFor('eventTitle')}
              />
              <TextField
                id="upcomingDescription"
                label="Upcoming Events Page Description"
                type="text"
                variant="outlined"
                value={this.state.upcomingDescription}
                onChange={this.handleInputChangeFor('upcomingDescription')}
              />
              <TextField
                id="detailsDescription"
                label="Event Details Page Description"
                type="text"
                variant="outlined"
                value={this.state.detailsDescription}
                onChange={this.handleInputChangeFor('detailsDescription')}
              />
              <div>
              <TextField
                id="organizerContact"
                label="Organizer Contact Info"
                type="text"
                variant="outlined"
                value={this.state.organizerContact}
                onChange={this.handleInputChangeFor('organizerContact')}
              />
              <TextField
                id="eventStartDate"
                label="Event Start Date"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                value={this.state.eventStartDate}
                onChange={this.handleInputChangeFor('eventStartDate')}
              />
              <TextField
                id="eventEndDate"
                label="Event End Date"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                value={this.state.eventEndDate}
                onChange={this.handleInputChangeFor('eventEndDate')}
              />
              </div>
            <div className='imageUploadButton' onClick={() => { if (window.confirm('Would you like to add a photo to be displayed with the event?')) this.handleAddImage() }} >
              <Button variant="contained" color="primary" onClick={this.handleAddImage}>
                Add Event Image
              </Button>
              <Button onClick={this.handleSubmit} variant="contained" color="primary">
                Create Event
              </Button>
              </div>
        </div>
      </Box >
    );
  }
}

const mapStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapStateToProps)(CreateEvent);