import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

// This component will be rendered if the user is not logged in
// Allows a user to Log In to the app or Register an account for the app
class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };

  // Function that takes the username and password inputed by user and makes dispatch call to loginSaga.js for authentication
  // Called on Log In button click
  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  } // end login function

  // Function that is called onChange of input fields
  // Captures user inputed username and password and stores data temporarily in local state
  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <div>
        {/* Conditionally renders errors reducer loginMessage, if no errors occur during log in this.props.errors.loginMessage will be falsy */}
        {this.props.errors.loginMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.loginMessage}
          </h2>
        )}
        <form onSubmit={this.login}>
          <h1>Login</h1>
          <div>
            <label htmlFor="username">
              Username:
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              Password:
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              />
            </label>
          </div>
          <div>
            <Button
              className="log-in"
              type="submit"
              variant="contained"
              color="primary"
            >
              Log In
            </Button>
          </div>
        </form>
        <center>
          {/* button to toggle which component renders, LoginPage or RegisterPage by changing reduxState.loginMode reducer */}
          <button
            type="button"
            className="link-button"
            onClick={() => { this.props.dispatch({ type: 'SET_TO_REGISTER_MODE' }) }}
          >
            Register
          </button>
        </center>
      </div>
    );
  }
}

// Provides access of errors reducer in reduxState to component
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(LoginPage);
