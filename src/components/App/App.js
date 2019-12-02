import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import AdminProtectedRoute from '../AdminProtectedRoute/AdminProtectedRoute';

import UpcomingEvents from '../UpcomingEvents/UpcomingEvents';
import Tracks from '../Tracks/Tracks';

import 'typeface-roboto';

import './App.css';
import CreateEvent from '../CreateEvent/CreateEvent';
import EventDetails from '../EventDetails/EventDetails';
import Profile from '../Profile/Profile';
import MyEvents from '../MyEvents/MyEvents';

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import deepOrange from '@material-ui/core/colors/deepOrange';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';

const theme = createMuiTheme({
  palette: {
    primary: deepOrange,
    secondary: blue,
    error: red,
    contrastThreshold: 3,
    tonalOffset: 0.2,
  }
});

class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' })
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <div>
            <Nav />
            <Switch>
              {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
              <Redirect exact from="/" to="/tracks" />
              {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
              <Route
                exact
                path="/upcoming-events"
                component={UpcomingEvents}
              />
              {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
              <ProtectedRoute
                exact
                path="/tracks"
                component={Tracks}
              />
              {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
              <AdminProtectedRoute
                exact
                path="/create-event"
                component={CreateEvent}
              />

              <ProtectedRoute
                exact
                path="/event-details"
                component={EventDetails}
              />

              <ProtectedRoute
                exact
                path="/profile"
                component={Profile}
              />

              <AdminProtectedRoute
                exact
                path="/my-events"
                component={MyEvents}
              />
              {/* If none of the other routes matched, we will show a 404. */}
              <Route render={() => <h1>404</h1>} />
            </Switch>
          </div>
        </Router>
      </MuiThemeProvider>
    )
  }
}

export default connect()(App);
