import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
// imports Material UI components needed for styled nav bar
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// imports Material UI components needed for font and spacing
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
// import './Nav.css'; Due to using Material UI for styling Nav.css is not currently included in application

// This component is rendered in parent App component to be available on every page
// Provides tabs that a user can interact with to navigate through the application
class Nav extends Component {

  // this.state.value is needed by Material UI nav bar to show selector beneath currently selected tab/page
  state = {
    value: 0,
  };

  // Function that sets local state to currently selected tab, called onClick of a tab
  handleChange = (event, newValue) => {
    this.setState({
      value: newValue,
    });
  } // End handleChange function

  // Material UI component for styled nav bar
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
  } // End TabPanel function

  // Another component imported from Material UI for styled nav bar
  a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  } // End a11yProps function

  // Sets basic style with makeStyles Material UI method needed for styled nav bar
  useStyles = () => {
    makeStyles(theme => ({
      root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
      },
    }));
  } // End useStyles function

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
} // End Nav component

// Provides component with access to reduxState.user through props
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Nav);
