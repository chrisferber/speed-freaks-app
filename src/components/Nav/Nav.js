import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
// import './Nav.css';


class Nav extends Component {

  state = {
    value: 0,

  };

  handleChange = (event, newValue) => {
    this.setState({
      value: newValue,
    });
  };

  TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={this.value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        <Box p={6}>{children}</Box>
      </Typography>
    );
  };

  // TabPanel.propTypes = {
  //   children: PropTypes.node,
  //   index: PropTypes.any.isRequired,
  //   value: PropTypes.any.isRequired,
  // };

  a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  };

  useStyles = () => {
    makeStyles(theme => ({
      root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
      },
    }));
  };

  render() {
    return (

      <div className={this.useStyles.root}>
        <AppBar position="static">
          <Tabs value={this.state.value} onChange={this.handleChange} aria-label="simple tabs example">

            <Tab key={this.a11yProps(0).id} label="Speed Freaks" component={Link} to="/tracks" />
            {this.props.user.id ?
              <Tab key={this.a11yProps(1).id} label="Home" component={Link} to="/tracks" /> :
              <Tab key={this.a11yProps(1).id} label="Login / Register" component={Link} to="/tracks" />
            }
            {this.props.user.id && (
              [
                <Tab key={this.a11yProps(2).id} label="Profile" component={Link} to="/profile" />,
                <Tab key={this.a11yProps(3).id} label="Upcoming Events" component={Link} to="/upcoming-events" />
              ]
            )}
            {this.props.user.is_admin && (
              [
                <Tab key={this.a11yProps(4).id} label="Create Event" component={Link} to="/create-event" />,
                <Tab key={this.a11yProps(5).id} label="My Events" component={Link} to="/my-events" />
              ]
            )}
            {this.props.user.id &&
              <Tab key={this.a11yProps(6).id} label="Log Out" component={LogOutButton} />
            }
          </Tabs>
        </AppBar>
      </div >
    )
  }
}

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Nav);
