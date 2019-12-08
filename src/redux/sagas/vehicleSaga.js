import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchVehicle() {
    try {
        const response = yield axios.get('/api/vehicle');
        console.log('response from GET route in vehicleSaga:', response);
        if(!response.data === []){
        yield put({ type: 'SET_USER_VEHICLE', payload: response.data[0] });
        } else {
            console.log('response from GET route in vehicleSaga was undefined');
        };
    } catch (error) {
        console.log('error in vehicleSaga, fetchVehicle request failed with error:', error);
    };
} 



function* vehicleSaga() {
    yield takeLatest('FETCH_VEHICLE', fetchVehicle);
}

export default vehicleSaga;