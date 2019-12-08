import React, { Component } from 'react';
import { connect } from 'react-redux';
import MyEventsListItem from '../MyEventsListItem/MyEventsListItem';
import Box from '@material-ui/core/Box';


class MyEvents extends Component {

    componentDidMount() {
        this.fetchMyCreatedEvents();
    }

    fetchMyCreatedEvents = () => {
        this.props.dispatch({ type: 'FETCH_MY_CREATED_EVENTS' });
    }

    render() {

        return (
            <Box m={5}>
            <div className="EventDetails">
                <h1>
                    My Events:
                </h1>
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
}

const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(MyEvents);