import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper'; 

class MyEventsAttendingTable extends Component {

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
    }

    toggleRegistrationStatus = (user) => {
        this.props.dispatch({ type: 'TOGGLE_REGISTRATION_STATUS', payload: user });
    }

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
                        {this.props.reduxState.attendingEvent.map((user) => (
                            <TableRow key={user.user_id}>
                                <TableCell component="th" scope="user">
                                    {user.username}
                                </TableCell>
                                <TableCell align="right">{user.email}</TableCell>
                                <TableCell align="right">{user.make}</TableCell>
                                <TableCell align="right">{user.model}</TableCell>
                                <TableCell align="right">{user.year}</TableCell>
                                {user.registration_complete ?
                                <TableCell align="right">
                                    Complete
                                </TableCell>:
                                <TableCell align="right">
                                    Pending
                                </TableCell>
                            }
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
}

    const mapStateToProps = reduxState => ({
        reduxState,
    });

    export default connect(mapStateToProps)(MyEventsAttendingTable);