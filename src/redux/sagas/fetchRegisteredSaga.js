import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on 'FETCH_REGISTERED' actions
function* fetchRegistered(action) {
    try {
        const response = yield axios.get(`/api/organizer/attending/${action.payload}`);
        yield put({ type: 'SET_EVENT_ATTENDEES', payload: response.data });
    } catch (error) {
        console.log('error in organizerDataSaga, GET request for fetchRegistered failed with:', error);
    }
}

function* fetchRegisteredSaga() {
    yield takeLatest('FETCH_REGISTERED', fetchRegistered);
}

export default fetchRegisteredSaga;