
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

const cors = require('cors');

// Route includes
const userRouter = require('./routes/user.router');
const eventsRouter = require('./routes/events.router');
const vehicleRouter = require('./routes/vehicle.router');
const organizerRouter = require('./routes/organizer.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/events', eventsRouter);
app.use('/api/vehicle', vehicleRouter);
app.use('/api/organizer', organizerRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});


app.use(cors());

const sign_s3 = require('./controllers/sign_s3');

app.use('/sign_s3', sign_s3.sign_s3);
