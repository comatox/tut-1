import Axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import LoginAction from '../action/auth';

function loginApi(loginId) {
    return Axios.get(`https://jsonplaceholder.typicode.com/posts/${loginId}`);
}

function* login(action) {
    // console.log(action);
    const { loginId, loginPassword } = action.payload;
    try {
        const res = yield call(loginApi, loginId);
        // console.log(res);
        // 임시로 id값으로 password 체크
        if (res.data !== null && res.data.userId.toString() === loginPassword) {
            yield put(LoginAction.actions.authLoginSuccess(loginId));
        } else {
            yield put(
                LoginAction.actions.authLoginFail(
                    '아이디 또는 비밀번호가 맞지 않습니다.'
                )
            );
        }
    } catch (e) {
        yield put(
            LoginAction.actions.authLoginFail(
                '로그인 중 오류가 발생하였습니다.'
            )
        );
    }
}

export function* authSaga() {
    yield takeLatest(LoginAction.types.AUTH_LOGIN, login);
}
