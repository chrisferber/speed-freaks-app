import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* registerEvent(action) {
    try {
        const response = yield axios.post('/api/events/register', action.payload);
        console.log('response from POST route in registerForEventSaga:', response);
        // yield put({ type: 'SET_EVENTS', payload: response.data });
    } catch (error) {
        console.log('error in registerForEventSaga, registerEvent request failed with error:', error);
    }
}

function* completeRegistration(action) {
    try {
        const response = yield axios.put('/api/organizer/complete-registration', action.payload);
        yield put({ type: 'FETCH_REGISTERED', payload: response.data[0] });
    } catch (error) {
        console.log('request failed completeRegistration function in registerForEventSaga.js with:', error);
    }
}

function* markRegistrationIncomplete(action) {
    try {
        const response = yield axios.put('/api/organizer/registration-incomplete', action.payload);
        yield put({ type: 'FETCH_REGISTERED', payload: response.data[0] });
    } catch (error) {
        console.log('request failed markRegistrationIncomplete function in registerForEventSaga.js with:', error);
    }
}


function* registerForEventSaga() {
    yield takeLatest('EVENT_REGISTER', registerEvent);
    yield takeLatest('COMPLETE_REGISTRATION', completeRegistration);
    yield takeLatest('MARK_REGISTRATION_INCOMPLETE', markRegistrationIncomplete);
}

export default registerForEventSaga;