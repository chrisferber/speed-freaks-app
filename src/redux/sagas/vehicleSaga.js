import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on 'FETCH_VEHICLE' actions
function* fetchVehicle() {
    try {
        const response = yield axios.get('/api/vehicle'); // axios HTTP request to server
        // conditional that makes call to vehicleReducer to store users vehicle from database
        if(response.data[0]){
        yield put({ type: 'SET_USER_VEHICLE', payload: response.data[0] });
        } else {
            console.log('response from GET route in vehicleSaga was undefined');
        };
    } catch (error) {
        console.log('error in vehicleSaga, fetchVehicle request failed with error:', error);
    };
} // End fetchVehicle saga

function* vehicleSaga() {
    yield takeLatest('FETCH_VEHICLE', fetchVehicle); // runs fetchVehicle function on action with type 'FETCH_VEHICLE'
}

export default vehicleSaga;