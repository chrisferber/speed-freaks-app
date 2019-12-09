import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on 'UPDATE_NEW_VEHICLE' actions
function* registerEvent(action) {
    try {
        yield axios.post('/api/events/register', action.payload);
        yield put({ type: 'FETCH_USER_EVENTS' });
    } catch (error) {
        console.log('error in registerForEventSaga, registerEvent request failed with error:', error);
    }
} // End worker Saga

// worker Saga: will be fired on 'UPDATE_NEW_VEHICLE' actions
function* toggleRegistrationStatus(action) {
    try {
        const response = yield axios.put('/api/organizer/complete-registration', action.payload);
        yield put({ type: 'FETCH_REGISTERED', payload: response.data[0] });
    } catch (error) {
        console.log('request failed completeRegistration function in registerForEventSaga.js with:', error);
    }
} // End worker Saga

function* registerForEventSaga() {
    yield takeLatest('EVENT_REGISTER', registerEvent);
    yield takeLatest('TOGGLE_REGISTRATION_STATUS', toggleRegistrationStatus);
}

export default registerForEventSaga;