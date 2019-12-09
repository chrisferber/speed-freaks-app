import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button'; // imports Material UI custom buttons

// imports Material UI components needed to create custom tables
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

// This component displays all event attendees for an admin's event with feature to toggle registration status for each event attendee
// Conditionally renders in MyEventsListItem component on Event Attendees button click
class MyEventsAttendingTable extends Component {

    // Material UI setup from documentation that will be used by other Material UI components to correctly format tables
    useStyles = () => {
        makeStyles({
            root: {
                width: '100%',
                overflowX: 'auto',
            },
            table: {
                minWidth: 650,
            },
        });
    } // End useStyles function

    // Function that makes dispatch call to registerForEventSaga.js to toggle registration status of a user in database
    toggleRegistrationStatus = (user) => {
        this.props.dispatch({ type: 'TOGGLE_REGISTRATION_STATUS', payload: user });
    } // End toggleRegistrationStatus function

    render() {
        return (
            <Paper className={this.useStyles.root}>
                <Table className={this.useStyles.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Username</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Make</TableCell>
                            <TableCell align="right">Model</TableCell>
                            <TableCell align="right">Year</TableCell>
                            <TableCell align="right">Registration Status</TableCell>
                            <TableCell align="right">Register</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* maps through attendingEvent reducer to populate table body with event attendees */}
                        {this.props.reduxState.attendingEvent.map((user) => (
                            <TableRow key={user.user_id}>
                                <TableCell component="th" scope="user">
                                    {user.username}
                                </TableCell>
                                <TableCell align="right">{user.email}</TableCell>
                                <TableCell align="right">{user.make}</TableCell>
                                <TableCell align="right">{user.model}</TableCell>
                                <TableCell align="right">{user.year}</TableCell>
                                {/* Conditionally renders Complete or Pending in Registration Status dependent on value in database */}
                                {user.registration_complete ?
                                    <TableCell align="right">
                                        Complete
                                </TableCell> :
                                    <TableCell align="right">
                                        Pending
                                </TableCell>
                                }
                                {/* Again checks value of registration_complete to conditionally render appropriate button */}
                                {user.registration_complete ?
                                    <TableCell align="right">
                                        <Button color="primary" onClick={() => this.toggleRegistrationStatus(user)}>
                                            Mark Registration Incomplete
                                        </Button>
                                    </TableCell> :
                                    <TableCell align="right">
                                        <Button color="primary" onClick={() => this.toggleRegistrationStatus(user)}>
                                            Mark as Registered
                                        </Button>
                                    </TableCell>
                                }
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
} // End MyEventsAttendingTable component

// Provides component access to reduxState through props
const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(MyEventsAttendingTable);