import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import eventsSaga from './eventsSaga';
import registerForEventSaga from './registerForEventSaga';
import vehicleSaga from './vehicleSaga';
import postNewVehicleSaga from './postNewVehicleSaga';
import updateNewVehicleSaga from './updateNewVehicleSaga';
import organizerDataSaga from './organizerDataSaga';
import fetchRegisteredSaga from './fetchRegisteredSaga';
import userProfileSaga from './userProfileSaga';

// combines all sagas into a single rootSaga, rootSaga imports into /src root index.js
export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    eventsSaga(),
    registerForEventSaga(),
    vehicleSaga(),
    postNewVehicleSaga(),
    updateNewVehicleSaga(),
    organizerDataSaga(),
    fetchRegisteredSaga(),
    userProfileSaga(),
  ]);
}
