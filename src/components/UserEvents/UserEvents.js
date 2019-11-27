import React, { Component } from 'react';
import { connect } from 'react-redux';

class UserEvents extends Component {

    render() {
        return (
            <div className="userEventsTable">
                        <h3>My Events:</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        Event
                                    </th>
                                    <th>
                                        Event Date
                                    </th>
                                    <th>
                                        Registration Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.redexState.userEvents.map((event) => {
                                    return (
                                        <tr key={event.event_id}>
                                            <td>
                                                {event.event_name}
                                            </td>
                                            <td>
                                                <p>{event.event_date_start} - {event.event_date_end}</p>
                                            </td>
                                            {event.registration_complete ?
                                            <td>
                                                Complete
                                            </td>:
                                            <td>
                                                Pending
                                            </td>
                                }
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table> 
            </div>

        );
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(UserEvents);