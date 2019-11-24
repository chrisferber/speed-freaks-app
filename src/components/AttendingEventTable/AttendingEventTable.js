import React, { Component } from 'react';
import { connect } from 'react-redux';

class AttendingEventTable extends Component {

    componentDidMount() {
        this.fetchRegisteredVehicles();
    }

    fetchRegisteredVehicles = () => {
        this.props.dispatch({type: 'FETCH_REGISTERED_VEHICLES', payload: this.props.user.user_id });
    }

    render() {
        return (
            <>
                <tr>
                    <td>
                        {this.props.user.username}
                    </td>
                    <td>
                        {this.props.user.email}
                    </td>
                    <td>
                        {this.props.reduxState.attendeesVehicles.make}
                    </td>
                    <td>
                        {this.props.reduxState.attendeesVehicles.model}
                    </td>
                    <td>
                        {this.props.reduxState.attendeesVehicles.year}
                    </td>
                </tr>
            </>
        );
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(AttendingEventTable);