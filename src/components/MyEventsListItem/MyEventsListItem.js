import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import MyEventsAttendingTable from '../MyEventsAttendingTable/MyEventsAttendingTable';

class MyEventsListItem extends Component {

    state = {
        toDetails: false,
        toggleAttendees: false,
    }

    handleDetailsButtonClick = () => {
        this.props.dispatch({ type: 'SET_CURRENT_EVENT', payload: this.props.event });
        this.props.dispatch({ type: 'FETCH_USER_EVENTS' });

        this.setState({
            toDetails: !this.state.toDetails,
        });
    }

    handleEventAttendeesButtonClick = (id) => {
        this.props.dispatch({ type: 'SET_CURRENT_EVENT', payload: this.props.event });
        this.props.dispatch({ type: 'FETCH_REGISTERED', payload: id });

        console.log('in handleEventAttendeesButtonClick, this.props.event:', id);
        this.setState({
            toggleAttendees: !this.state.toggleAttendees,
        });
    }

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
                    {/* <button onClick={this.handleDetailsButtonClick}>See Event Details</button>
                    <button onClick={() => this.handleEventAttendeesButtonClick(this.props.event.id)}>See Event Attendees</button> */}
                </div>
                <div>
                    {this.state.toggleAttendees &&
                        <MyEventsAttendingTable />
                    }
                </div>
            </>
        );
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(MyEventsListItem);