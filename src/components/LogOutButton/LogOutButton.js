import React from 'react';
import { connect } from 'react-redux';

// This function component is a logout button that is rendered in the Nav component
const LogOutButton = props => (
  <button
    className={props.className}
    onClick={() => props.dispatch({ type: 'LOGOUT' })}
  >
    Log Out
  </button>
);

export default connect()(LogOutButton); // connect method gives component dispatch method to update reduxState through sagas
