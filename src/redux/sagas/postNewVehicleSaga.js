import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on 'POST_NEW_VEHICLE' actions
function* postVehicle(action) {
    try {
        const response = yield axios.post('/api/vehicle/add', action.payload);
        yield put({ type: 'SET_USER_VEHICLE', payload: response.data });
    } catch (error) {
        console.log('error in postNewVehicleSaga, postVehicle request failed with error:', error);
    }
}



function* postNewVehicleSaga() {
    yield takeLatest('POST_NEW_VEHICLE', postVehicle);
}

export default postNewVehicleSaga;