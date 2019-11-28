import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class MyEventsListItem extends Component {

    state = {
        toDetails: false,
        toggleAttendees: false,
    }

    handleDetailsButtonClick = () => {
        this.props.dispatch({ type: 'SET_CURRENT_EVENT', payload: this.props.event });

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

    markCompletelyRegistered = (user) => {
        console.log('mark as registered button clicked with user Id:', user);
        this.props.dispatch({ type: 'COMPLETE_REGISTRATION', payload: user });
    }

    markRegistrationIncomplete = (user) => {
        console.log('mark registration incomplete button clicked with user Id:', user);
        this.props.dispatch({ type: 'MARK_REGISTRATION_INCOMPLETE', payload: user });
    }

    render() {

        if (this.state.toDetails === true) {
            return <Redirect to='/event-details' />
        }

        return (
            <>
                <div>
                    <h3>{this.props.event.event_name}</h3>
                    <p>{this.props.event.event_date_start}</p>
                    <p>{this.props.event.event_date_end}</p>
                    <button onClick={this.handleDetailsButtonClick}>See Event Details</button>
                    <button onClick={() => this.handleEventAttendeesButtonClick(this.props.event.id)}>See Event Attendees</button>
                </div>
                <div>
                    {this.state.toggleAttendees &&

                        <div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>
                                            Username
                                        </th>
                                        <th>
                                            Email
                                        </th>
                                        <th>
                                            Make
                                        </th>
                                        <th>
                                            Model
                                        </th>
                                        <th>
                                            Year
                                        </th>
                                        <th>
                                            Registration Status
                                        </th>
                                        <th>

                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.reduxState.attendingEvent.map((user) => {
                                        return (
                                            <tr key={user.user_id}>
                                                <td>
                                                    {user.username}
                                                </td>
                                                <td>
                                                    {user.email}
                                                </td>
                                                <td>
                                                    {user.make}
                                                </td>
                                                <td>
                                                    {user.model}
                                                </td>
                                                <td>
                                                    {user.year}
                                                </td>
                                                {user.registration_complete ?
                                                    <td>
                                                        Complete
                                                </td> :
                                                    <td>
                                                        Pending
                                                </td>
                                                }
                                                {user.registration_complete ?
                                                    <td>
                                                        <button onClick={() => this.markRegistrationIncomplete(user)}>
                                                            Mark Registration Incomplete
                                                    </button>
                                                    </td> :
                                                    <td>
                                                        <button onClick={() => this.markCompletelyRegistered(user)}>
                                                            Mark as Registered
                                                    </button>
                                                    </td>
                                                }
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
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