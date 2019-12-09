import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on 'UPDATE_NEW_VEHICLE' actions
function* updateVehicle(action) {
    try {
        const response = yield axios.put('/api/vehicle/edit', action.payload);
        yield put({ type: 'SET_USER_VEHICLE', payload: response.data[0] });
    } catch (error) {
        console.log('error in postNewVehicleSaga, postVehicle request failed with error:', error);
    }
}

function* updateNewVehicleSaga() {
    yield takeLatest('UPDATE_NEW_VEHICLE', updateVehicle);
}

export default updateNewVehicleSaga;