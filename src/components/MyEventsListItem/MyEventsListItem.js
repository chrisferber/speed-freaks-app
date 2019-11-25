import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class MyEventsListItem extends Component {

    state = {
        toDetails: false,
        toggleAttendees: false,
    }

    handleDetailsButtonClick = () => {
        this.props.dispatch({ type: 'SET_CURRENT_EVENT', payload: [this.props.event] });

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
                                    </tr>
                                </thead>
                                {this.props.reduxState.attendingEvent.map((user) => {
                                    return (
                                        <tbody key={user.user_id}>
                                            <tr>
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
                                            </tr>
                                        </tbody>
                                    );
                                })}

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