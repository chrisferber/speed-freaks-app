import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

function* fetchRegistered(action) {
    try {
        console.log('in fetchRegistered Saga, action.payload is:', action.payload);
        const response = yield axios.get(`/api/organizer/attending/${action.payload}`);
        yield put({ type: 'SET_EVENT_ATTENDEES', payload: response.data });
    } catch (error) {
        console.log('error in organizerDataSaga, GET request for fetchRegistered failed with:', error);
    }
}

function* fetchRegisteredVehicles(action) {
    try {
        const response = yield axios.get(`/api/organizer/vehicles/${action.payload}`);
        yield put({ type: 'SET_ATTENDEES_VEHICLES', payload: response.data });
    } catch (error) {
        console.log('error in organizerDataSaga, GET request for fetchRegisteredVehicles with:', error)
    }
}


function* fetchRegisteredSaga() {
    yield takeLatest('FETCH_REGISTERED', fetchRegistered);
    yield takeLatest('FETCH_REGISTERED_VEHICLES', fetchRegisteredVehicles);
}

export default fetchRegisteredSaga;