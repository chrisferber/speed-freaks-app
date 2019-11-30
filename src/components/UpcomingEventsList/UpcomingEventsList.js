import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import moment from 'moment';

class UpcomingEventsList extends Component {

    state = {
        toDetails: false,
    }

    handleDetailsButtonClick = () => {
        this.props.dispatch({ type: 'SET_CURRENT_EVENT', payload: this.props.event });
        this.props.dispatch({ type: 'FETCH_USER_EVENTS', });

        this.setState({
            toDetails: true,
        });
    }

    render() {

        if (this.state.toDetails === true) {
            return <Redirect to='/event-details' />
        }

        return (
            <>
                <h2>{this.props.event.event_name}</h2>
                {this.props.event.image_url &&
                <img src={this.props.event.image_url} height="300px" />
    }
                <p>{moment(this.props.event.event_date_start).format('MM/DD/YYYY')}   -   {moment(this.props.event.event_date_end).format('MM/DD/YYYY')}</p>
                <p>{this.props.event.upcoming_description}</p>
                <button onClick={this.handleDetailsButtonClick}>More Info</button>
            </>
        );
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(UpcomingEventsList);