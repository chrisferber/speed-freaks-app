import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

function* fetchRegistered(action) {
    try {
        console.log('in fetchRegistered Saga, action.payload is:', action.payload);
        const response = yield axios.get(`/api/organizer/attending/${action.payload}`);
        yield put({ type: 'SET_EVENT_ATTENDEES', payload: response.data });
    } catch (error) {
        console.log('error in organizerDataSaga, GET request for fetchRegistered failed with,', error);
    }
}




function* fetchRegisteredSaga() {
    yield takeLatest('FETCH_REGISTERED', fetchRegistered);
}

export default fetchRegisteredSaga;