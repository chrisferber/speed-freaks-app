import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchMyCreatedEvents() {
    try {
        const response = yield axios.get('/api/organizer');
        yield put({ type: 'SET_ORGANIZER_EVENTS', payload: response.data });
    } catch (error) {
        console.log('error in organizerDataSaga, fetchMyCreatedEvents request failed with error:', error);
    }
}



function* organizerDataSaga() {
    yield takeLatest('FETCH_MY_CREATED_EVENTS', fetchMyCreatedEvents);
}

export default organizerDataSaga;