import React, { Component } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

class Tracks extends Component {

  useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(3, 2),
    },
  }));

  render() {
    return (
<Box m={5}>
      <Paper className={this.useStyles.root} color="secondary">
        <Typography variant="h3" component="h1">
          Brainerd International Raceway
          </Typography>
          <img src="https://www.brainerdraceway.com/wp-content/uploads/2018/03/09RoadCourseMap.jpg" alt="BIR" height="500px" />
          <Typography variant="h4" component="h3">
          What is BIR?
          </Typography>
          <Typography component="p">
            Brainerd International Raceway is a road coarse, and dragstrip racing complex northwest of the city of Brainerd, Minnesota.
            The complex has a 0.25-mile dragstrip, and overlapping 2.5-mile and 3.1-mile road courses. The complex also includes a cart track.
            </Typography>
        
            <Typography variant="h4" component="h3">
          Events at BIR
          </Typography>
          <Typography component="p">
            Brainerd International Raceway is popular with proffessional drivers and amateur drivers alike. It's history started with drag racing in 1968 which is still what it's best known for today.
            Now, with the Donnybroke Road coarse and Competition Road coarse racing enthusiasts of any skill level are welcome to safely test the limits of their vehicles.
            There are many car clubs that host events at BIR spanning the entire season (Spring-Fall), where anyone can take their daily driver and feed their need for speed.
            BIR also hosts proffessional SCCA and NHRA drag racing events that anyone is welcome to attend with a capacity of 20,000 fans.
            </Typography>
        <Typography component="p">
          More info can be found on the Brainerd International Raceway official site here: <a href="https://www.brainerdraceway.com/">Visit BIR</a>
          </Typography>
        <Typography variant="h4" component="h3">
          How do I get Involved?
          </Typography>
          <Typography component="p">
            Finish setting up your profile with a vehicle you plan on driving if you haven't already. Then click on the Upcoming events tab where
            car clubs from around the Minneapolis metro area post social events, high performance driving schools, and more! Register for the event and
            make sure to check the email linked to your account frequently for instructions from the organizer on how to complete your registration.
            Any further questions about specific events can be directed to the organizer, organizer contact information can be found in the Event Details page
            for each specific event.
            </Typography>
        <Typography variant="h4" component="h3">
          President or Member of a Car Club?
          </Typography>
          <Typography component="p">
            Email the site administrator at chris@ferbers.us with details on your position within the car club to get administrative rights and start creating
            events for others to see and join!
            </Typography>
        
      </Paper>
      </Box>
    )
  }
}

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Tracks);
