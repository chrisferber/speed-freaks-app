import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on 'FETCH_USER_EVENTS' actions
function* fetchMyEvents() {
    try {
        const response = yield axios.get(`/api/events/my-registered`);
        yield put({ type: 'SET_USER_EVENTS', payload: response.data });
    } catch (error) {
        console.log('error in userProfileSaga, fetchMyEvents request failed with error:', error);
    }
}



function* userProfileSaga() {
    yield takeLatest('FETCH_USER_EVENTS', fetchMyEvents);
}

export default userProfileSaga;