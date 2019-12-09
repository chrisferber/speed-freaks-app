import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'; // imports Redirect component for client routing
import moment from 'moment'; // imports moment.js into component to correctly format dates 
// imports Material UI components needed for styled buttons
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import MyEventsAttendingTable from '../MyEventsAttendingTable/MyEventsAttendingTable'; // component to be rendered in this component

// This component renders for each object in organizerDataReducer array and displays info for each user created event
// This component is rendered in MyEvents component
class MyEventsListItem extends Component {

    state = {
        toDetails: false,
        toggleAttendees: false,
    }

    // Function that is called on Event Details button click
    // Redirects user to /event-details page and sets current event to display correct info
    handleDetailsButtonClick = () => {
        this.props.dispatch({ type: 'SET_CURRENT_EVENT', payload: this.props.event });
        this.props.dispatch({ type: 'FETCH_USER_EVENTS' });

        this.setState({
            toDetails: !this.state.toDetails,
        });
    } // End handleDetailsButtonClick function

    // Function called on Event Attendees button click
    // Sets the current event, dispatches to fetchRegisteredSaga.js with payload of event.id 
    // and sets state to conditionally render MyEventsAttendingTable component
    handleEventAttendeesButtonClick = (id) => {
        this.props.dispatch({ type: 'SET_CURRENT_EVENT', payload: this.props.event });
        this.props.dispatch({ type: 'FETCH_REGISTERED', payload: id });

        this.setState({
            toggleAttendees: !this.state.toggleAttendees,
        });
    } // End handleEventAttendeesButtonClick function

    render() {

        if (this.state.toDetails === true) {
            return <Redirect to='/event-details' />
        }

        return (
            <>
                <div>
                    <h3>{this.props.event.event_name}</h3>
                    <p>{moment(this.props.event.event_date_start).format('MM/DD/YYYY')}   -   {moment(this.props.event.event_date_end).format('MM/DD/YYYY')}</p>
                    <Grid item>
                        <ButtonGroup color="primary" size="small" aria-label="small outlined button group">
                            <Button onClick={this.handleDetailsButtonClick}>Event Details</Button>
                            <Button onClick={() => this.handleEventAttendeesButtonClick(this.props.event.id)}>Event Attendees</Button>
                        </ButtonGroup>
                    </Grid>
                </div>
                <div>
                    {/* conditionally renders MyEventsAttendingTable component */}
                    {this.state.toggleAttendees &&
                        <MyEventsAttendingTable />
                    }
                </div>
            </>
        );
    }
} // End MyEventsListItem component

// Provides component with access to reduxState through props
const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(MyEventsListItem);