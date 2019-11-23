import React, { Component } from 'react';
import { connect } from 'react-redux';

class MyEvents extends Component {

    componentDidMount() {
        this.fetchMyCreatedEvents();
    }

    fetchMyCreatedEvents = () => {
        this.props.dispatch({ type: 'FETCH_MY_CREATED_EVENTS' });
    }

    render() {
        return (
            <div className="EventDetails">
                <h2>
                    My Events:
                </h2>

            </div>
        );
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(MyEvents);