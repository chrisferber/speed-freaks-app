import React, { Component } from 'react'; // Brings React and Component into component

// Needed for client side routing
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { connect } from 'react-redux'; // Provides dispatch method for accessing Sagas or Reducers

// Custom Router's that handle whether a user sees Log In page or a page in the app
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import AdminProtectedRoute from '../AdminProtectedRoute/AdminProtectedRoute';

// Bring in Material UI default font
import 'typeface-roboto';

// Components to be used
import './App.css';
import UpcomingEvents from '../UpcomingEvents/UpcomingEvents';
import Tracks from '../Tracks/Tracks';
import CreateEvent from '../CreateEvent/CreateEvent';
import EventDetails from '../EventDetails/EventDetails';
import Profile from '../Profile/Profile';
import MyEvents from '../MyEvents/MyEvents';
import Nav from '../Nav/Nav';

//Material UI components
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import deepOrange from '@material-ui/core/colors/deepOrange';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';

// Sets up Material UI theme for the whole app
const theme = createMuiTheme({
  palette: {
    primary: deepOrange,
    secondary: blue,
    error: red,
    contrastThreshold: 3,
    tonalOffset: 0.2,
  }
});

// Base or root component to be rendered from ../../index.js
class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' })
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}> {/* Material UI wrapper that makes Material UI theme available to all child components */}
        <Router>
          <div>
            <Nav />
            <Switch>
              {/* Visiting localhost:3000 will redirect to localhost:3000/tracks */}
              <Redirect exact from="/" to="/tracks" />

              {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/tracks will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/tracks */}
              <ProtectedRoute
                exact
                path="/tracks"
                component={Tracks}
              />

              <ProtectedRoute
                exact
                path="/upcoming-events"
                component={UpcomingEvents}
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

              {/* This works the same as the other protected route, except that if the user is not an admin,
               they will see OnlyAdminWarning component instead */}
              <AdminProtectedRoute
                exact
                path="/create-event"
                component={CreateEvent}
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
} // End App component

export default connect()(App);