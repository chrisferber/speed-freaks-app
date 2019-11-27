import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchMyEvents() {
    try {
        const response = yield axios.get(`/api/events/my-registered`);
        console.log('response from GET route in userProfileSaga:', response);
        yield put({ type: 'SET_USER_EVENTS', payload: response.data });
    } catch (error) {
        console.log('error in userProfileSaga, fetchMyEvents request failed with error:', error);
    }
}



function* userProfileSaga() {
    yield takeLatest('FETCH_USER_EVENTS', fetchMyEvents);
}

export default userProfileSaga;