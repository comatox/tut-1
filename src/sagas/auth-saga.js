import Axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import LoginAction from '../action/auth';

function loginApi(loginId) {
    return Axios.get(`https://jsonplaceholder.typicode.com/posts/${loginId}`);
}

function* login(action) {
    // console.log(action);
    const { loginId, loginPassword } = action.payload;
    const res = yield call(loginApi, loginId);
    // console.log(res);
    // 임시로 id값으로 password 체크
    if (res.data !== null && res.data.userId.toString() === loginPassword) {
        yield put(LoginAction.actions.authLoginSuccess(loginId));
    } else {
        yield put(LoginAction.actions.authLoginFail());
    }
}

export function* authSaga() {
    yield takeLatest(LoginAction.types.AUTH_LOGIN, login);
}
