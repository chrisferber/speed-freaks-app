import React from 'react';
import {Route} from 'react-router-dom'
import {connect} from 'react-redux';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';

// This component is a custom wrapper for client routing that watches reduxState and redirects user to login page if they are not logged in
const ProtectedRoute = (props) => {
  // Using destructuring, this takes ComponentToProtect from component
  // prop and grabs all other props to pass them along to Route
  const {
    // Alias prop 'component' as 'ComponentToProtect'
    component: ComponentToProtect,
    user,
    loginMode,
    ...otherProps
  } = props;

  let ComponentToShow;

  if(user.id) {
    // if the user is logged in (only logged in users have ids)
    // show the component that is protected
    ComponentToShow = ComponentToProtect;
  } else if (loginMode === 'login') {
    // if they are not logged in, check the loginMode on Redux State
    // if the mode is 'login', show the LoginPage
    ComponentToShow = LoginPage;
  } else {
    // the the user is not logged in and the mode is not 'login'
    // show the RegisterPage
    ComponentToShow = RegisterPage;
  }

  // We return a Route component that gets added to our list of routes
  return (
      <Route
        // all props like 'exact' and 'path' that were passed in
        // are now passed along to the 'Route' Component
        {...otherProps}
        component={ComponentToShow}
      />
  )
} // End ProtectedRoute component

// Provides access to user, and loginMode reducers to component through props
const mapStateToProps = (state) => {
  return {
    user: state.user,
    loginMode: state.loginMode,
  }
}

export default connect(mapStateToProps)(ProtectedRoute)
