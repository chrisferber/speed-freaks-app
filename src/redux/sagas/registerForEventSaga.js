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



function* registerForEventSaga() {
    yield takeLatest('EVENT_REGISTER', registerEvent);
}

export default registerForEventSaga;