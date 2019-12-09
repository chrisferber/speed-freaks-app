import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment'; // imports moment.js to format dates on the DOM correctly
// imports Material UI components needed for styled tables
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

// This component is rendered from the Profile component
class UserEvents extends Component {

    // Function that uses Material UI method makeStyles to setup table format
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

    render() {
        return (
            <div>
                <h3>My Events:</h3>
                <Paper className={this.useStyles.root}>
                    <Table className={this.useStyles.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Event</TableCell>
                                <TableCell align="right">Event Date</TableCell>
                                <TableCell align="right">Registration Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* map through userEvents reducer to render data for each event user is registered for */}
                            {this.props.reduxState.userEvents.map(event => (
                                <TableRow key={event.event_id}>
                                    <TableCell component="th" scope="event">
                                        {event.event_name}
                                    </TableCell>
                                    <TableCell align="right">
                                        <p>{moment(event.event_date_start).format('MM/DD/YYYY')}   -   {moment(event.event_date_end).format('MM/DD/YYYY')}</p>
                                    </TableCell>
                                    {event.registration_complete ?
                                        <TableCell align="right">Complete</TableCell> :
                                        <TableCell align="right">Pending</TableCell>
                                    }
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </div>

        );
    }
} // End UserEvents component

// Provides component acces to reduxState through props
const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(UserEvents);