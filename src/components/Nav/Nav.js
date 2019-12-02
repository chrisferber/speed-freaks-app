import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';


const Nav = (props) => (
  <div className="nav">
    <Link to="/tracks">
      <h2 className="nav-title">Speed Freaks</h2>
    </Link>
    <div className="nav-right">
      <Link className="nav-link" to="/tracks">
        {/* Show this link if they are logged in or not,
        but call this link 'Home' if they are logged in,
        and call this link 'Login / Register' if they are not */}
        {props.user.id ? 'Home' : 'Login / Register'}
      </Link>
      {/* Show the link to the info page and the logout button if the user is logged in */}
      {props.user.id && (
        <>
          {/* <Link className="nav-link" to="/event-details">
            Event Details
          </Link> */}
          <Link className="nav-link" to="/profile">
            Profile
          </Link>
          <Link className="nav-link" to="/upcoming-events">
            Upcoming Events
          </Link>
        </>
      )}
      {props.user.is_admin &&
        <>
          <Link className="nav-link" to="/create-event">
            Create Event
          </Link>
          <Link className="nav-link" to="/my-events">
            My Events
          </Link>
        </>
      }
      <LogOutButton className="nav-link" />
      {/* Always show this link since the about page is not protected */}
    </div>
  </div>
);

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Nav);
