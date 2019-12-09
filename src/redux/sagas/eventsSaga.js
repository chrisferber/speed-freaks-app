import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on 'FETCH_EVENTS' actions
function* fetchEvents() {
    try {
        const response = yield axios.get('/api/events');
        yield put({ type: 'SET_EVENTS', payload: response.data });
    } catch (error) {
        console.log('error in eventsSaga, fetchEvents request failed with error:', error);
    }
}

// worker Saga: will be fired on 'CREATE_EVENT' actions
function* postEvent(action) {
    try {
        yield axios.post('/api/events/create', action.payload );
        yield put({ type: 'FETCH_EVENTS', })
    } catch (error) {
        console.log('error in eventsSaga, postEvent request failed with:', error);
    }
}

// worker Saga: will be fired on 'EDIT_EVENT' actions
function* editEvent(action) {
    try{
        const response = yield axios.put(`/api/events/edit/${action.payload.eventId}`, action.payload);
        yield put({ type: 'SET_CURRENT_EVENT', payload: response.data[0] });
    } catch (error) {
        console.log('error in editEvent put request in eventsSaga.js with:', error);
    }
}

// worker Saga: will be fired on 'DELETE_EVENT' actions
function* deleteEvent(action) {
    try{
        yield axios.delete(`/api/events/delete/${action.payload.id}`);
        yield put({ type: 'FETCH_EVENTS' });
    } catch (error) {
        console.log('error in deleteEvent deletEvent in eventsSaga.js with:', error);
    }
}

function* eventsSaga() {
    yield takeLatest('FETCH_EVENTS', fetchEvents);
    yield takeLatest('CREATE_EVENT', postEvent);
    yield takeLatest('EDIT_EVENT', editEvent);
    yield takeLatest('DELETE_EVENT', deleteEvent);
}

export default eventsSaga;