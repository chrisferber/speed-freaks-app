import React, { Component } from 'react';
import { connect } from 'react-redux';
import MyEventsListItem from '../MyEventsListItem/MyEventsListItem';
import Box from '@material-ui/core/Box'; // Used for spacing, gives all elements nested inside a small margin

// This component is responsible for displaying list of events created by user, and all users attending those events
// Component that is rendered at /my-events
class MyEvents extends Component {

    // Function that dispatches to organizerDataSaga.js to fetch all events created by user
    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_MY_CREATED_EVENTS' });
    } // End componentDidMount function

    render() {
        return (
            <Box m={5}>
            <div className="EventDetails">
                <h1>
                    My Events:
                </h1>
                {/* maps through organizerDataReducer and sends each object in array to child MyEventsListItem component through props */}
                {this.props.reduxState.organizerDataReducer.map((event) => {
                    return(
                    <MyEventsListItem key={event.id} event={event} />
                    );
                })
                }
            </div>
            </Box>
        );
    }
} // End MyEvents component

// Provides MyEvents component with access to reduxState through props
const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(MyEvents);