import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* updateVehicle(action) {
    try {
        const response = yield axios.put('/api/vehicle/edit', action.payload);
        console.log('response from PUT route in updateVehicle:', response);
        yield put({ type: 'SET_USER_VEHICLE', payload: response.data[0] });
    } catch (error) {
        console.log('error in postNewVehicleSaga, postVehicle request failed with error:', error);
    }
}



function* updateNewVehicleSaga() {
    yield takeLatest('UPDATE_NEW_VEHICLE', updateVehicle);
}

export default updateNewVehicleSaga;