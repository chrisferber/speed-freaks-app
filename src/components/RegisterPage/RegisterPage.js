import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button'; // Material UI styled buttons

// This component is rendered if the user is not logged in and loginMode reducer = "register"
// Allows a user to create an account to access the application
class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
    email: '',
  };

  // Function that dispatches to registrationSaga.js to create new row in user table in database if no input fields are null
  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password && this.state.email) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          username: this.state.username,
          password: this.state.password,
          email: this.state.email,
        },
      });
    } else {
      this.props.dispatch({ type: 'REGISTRATION_INPUT_ERROR' });
    }
  } // end registerUser function

  // Function that is called onChange of input field to capture user inputs and store them in local state
  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  } // End handleInputChangeFor function

  render() {
    return (
      <div>
        {/* conditionally renders error message if errors.registrationMessage reducer is not null */}
        {this.props.errors.registrationMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.registrationMessage}
          </h2>
        )}
        <form onSubmit={this.registerUser}>
          <h1>Register User</h1>
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
            <label htmlFor="email">
              Email:
              <input
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChangeFor('email')}
              />
            </label>
          </div>
          <div>
            <Button
              className="register"
              type="submit"
              variant="contained"
              color="primary"
            >
              Register
            </Button>
          </div>
        </form>
        <center>
          {/* renders LoginPage on Login button click */}
          <button
            type="button"
            className="link-button"
            onClick={() => { this.props.dispatch({ type: 'SET_TO_LOGIN_MODE' }) }}
          >
            Login
          </button>
        </center>
      </div>
    );
  }
} // End RegisterPage component

// Provides access of errors reducer to component through props
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(RegisterPage);
