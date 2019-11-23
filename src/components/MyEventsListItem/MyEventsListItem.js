import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class MyEventsListItem extends Component {

    state = {

    }

    handleDetailsButtonClick = () => {
    
    }

    render() {

        if (this.state.toDetails === true) {
            return <Redirect to='/event-details' />
        }

        return (
            <>
                <h3>{this.props.event.event_name}</h3>
                <p>{this.props.event.event_date_start}</p>
                <p>{this.props.event.event_date_end}</p>
                <button onClick={this.handleDetailsButtonClick}>More Info</button>
            </>
        );
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(MyEventsListItem);