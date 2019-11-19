import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchEvents() {
    try {
        const response = yield axios.get('/api/events');
        yield put({ type: 'SET_EVENTS', payload: response.data });
    } catch (error) {
        console.log('error in eventsSaga, fetchEvents request failed with error:', error);
    }
}



function* eventsSaga() {
    yield takeLatest('FETCH_EVENTS', fetchEvents);
}

export default eventsSaga;