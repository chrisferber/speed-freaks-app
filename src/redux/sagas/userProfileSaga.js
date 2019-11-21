import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchUserProfile() {
    try {
        const response = yield axios.get('/api/profile');
        console.log('response from GET route in userProfileSaga:', response);
        yield put({ type: 'SET_USER_PROFILE', payload: response.data });
    } catch (error) {
        console.log('error in userProfileSaga, fetchUserProfile request failed with error:', error);
    }
}



function* userProfileSaga() {
    yield takeLatest('FETCH_PROFILE', fetchUserProfile);
}

export default userProfileSaga;