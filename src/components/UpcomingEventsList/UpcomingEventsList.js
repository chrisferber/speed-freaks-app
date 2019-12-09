import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'; // used for client side routing
import moment from 'moment'; // imports moment.js to format dates correctly
import Button from '@material-ui/core/Button'; // Material UI styled buttons

// This component renders for each object in events reducer, its parent component is UpcomingEvents
// Displays data for each event along with a picture if the organizer chose to add one when creating event
class UpcomingEventsList extends Component {

    state = {
        toDetails: false,  // used for client side routing
    }

    // Function that is called on More Info button click
    // Dispatches to currentEventReducer with payload of the specific event object, dispatches to userProfileSaga.js to fetch users registered events
    // and sets this.state.toDetails to true which redirects the user to /event-details
    handleDetailsButtonClick = () => {
        this.props.dispatch({ type: 'SET_CURRENT_EVENT', payload: this.props.event });
        this.props.dispatch({ type: 'FETCH_USER_EVENTS', });

        this.setState({
            toDetails: true,
        });
    } // End handleDetailsButtonClick function

    render() {

        if (this.state.toDetails === true) {
            return <Redirect to='/event-details' />
        }

        return (
            <>
                <h2>{this.props.event.event_name}</h2>
                {/* renders the image for the event if there is one */}
                {this.props.event.image_url &&
                <img src={this.props.event.image_url} alt="Event" height="300px" />
    }
                <p>{moment(this.props.event.event_date_start).format('MM/DD/YYYY')}   -   {moment(this.props.event.event_date_end).format('MM/DD/YYYY')}</p>
                <p>{this.props.event.upcoming_description}</p>
                <Button onClick={this.handleDetailsButtonClick} variant="contained" color="primary">
                    More Info
                </Button>
            </>
        );
    }
} // End UpcomingEventsList component

// Provides component access to reduxState through props
const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(UpcomingEventsList);