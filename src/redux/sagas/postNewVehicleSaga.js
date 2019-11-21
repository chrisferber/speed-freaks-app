import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* postVehicle(action) {
    try {
        const response = yield axios.post('/api/vehicle/add', action.payload);
        console.log('response from POST route in postNewVehicleSaga:', response);
        yield put({ type: 'SET_USER_VEHICLE', payload: response.data });
    } catch (error) {
        console.log('error in postNewVehicleSaga, postVehicle request failed with error:', error);
    }
}



function* postNewVehicleSaga() {
    yield takeLatest('POST_NEW_VEHICLE', postVehicle);
}

export default postNewVehicleSaga;