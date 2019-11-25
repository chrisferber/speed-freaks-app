import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class UpcomingEventsList extends Component {

    state = {
        toDetails: false,

    }

    handleDetailsButtonClick = () => {
        this.props.dispatch({ type: 'SET_CURRENT_EVENT', payload: [this.props.event] })

        this.setState({
            toDetails: true,
        })
    }

    render() {

        if (this.state.toDetails === true) {
            return <Redirect to='/event-details' />
        }

        return (
            <>
                <h2>{this.props.event.event_name}</h2>
                <p>{this.props.event.event_date_start}</p>
                <p>{this.props.event.event_date_end}</p>
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