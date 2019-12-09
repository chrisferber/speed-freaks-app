import React, { Component } from 'react';
import { connect } from 'react-redux';

// Component that is rendered in EventDetails component to edit an event, only accessible to creator of event
class EditCreatedEvent extends Component {

    // Local state will start with current values for event and show them in input fields of form
    state = {
        eventId: this.props.reduxState.currentEvent.id,
        eventTitle: this.props.reduxState.currentEvent.event_name,
        eventStartDate: this.props.reduxState.currentEvent.event_date_start,
        eventEndDate: this.props.reduxState.currentEvent.event_date_end,
        upcomingDescription: this.props.reduxState.currentEvent.upcoming_description,
        detailsDescription: this.props.reduxState.currentEvent.details_description,
        organizerContact: this.props.reduxState.currentEvent.admin_contact,
    }

    // Function called on Submit button click that will send updated event values to eventsSaga.js
    // Clears input fields of form
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.dispatch({ type: 'EDIT_EVENT', payload: this.state });
        this.setState({
            eventTitle: '',
            eventStartDate: '',
            eventEndDate: '',
            upcomingDescription: '',
            detailsDescription: '',
            organizerContact: '',
        });
    } // End handleSubmit function

    // Function called onChange of an input field in form to capture user inputs and store them in local state
    handleInputChangeFor = propertyName => (event) => {
        this.setState({
            [propertyName]: event.target.value,
        });
    } // End handleInputChangeFor function

    render() {
        return (
            <>
                <h2>Edit Event</h2>
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
                                value="Save Changes"
                            />
                        </div>
                    </form>
                </div>
            </>
        );
    }
} // End EditCreatedEvent component

// Provides component access to reduxState through props
const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(EditCreatedEvent);