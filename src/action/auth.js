const AUTH_LOGIN = 'auth/LOGIN';
const AUTH_LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const AUTH_LOGIN_FAIL = 'auth/LOGIN_FAIL';
const AUTH_LOGOUT = 'auth/LOGOUT';

const authLogin = (loginId, loginPassword) => ({
    type: AUTH_LOGIN,
    payload: {
        loginId,
        loginPassword,
    },
});
const authLoginSuccess = (userId) => ({
    type: AUTH_LOGIN_SUCCESS,
    payload: { userId },
});
const authLoginFail = () => ({ type: AUTH_LOGIN_FAIL });
const authLogout = () => ({ type: AUTH_LOGOUT });

const LoginAction = {
    types: {
        AUTH_LOGIN,
        AUTH_LOGIN_SUCCESS,
        AUTH_LOGIN_FAIL,
        AUTH_LOGOUT,
    },
    actions: {
        authLogin,
        authLoginSuccess,
        authLoginFail,
        authLogout,
    },
};

export default LoginAction;
