import LoginAction from '../action/auth';

const initialState = {
    isLoggedIn: false,
    loginId: null,
    error: null,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LoginAction.types.AUTH_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                loginId: action.payload.userId,
                error: null,
            };
        case LoginAction.types.AUTH_LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                loginId: null,
                error: action.payload.error,
            };
        case LoginAction.types.AUTH_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                loginId: null,
                error: null,
            };
        default:
            return state;
    }
};
