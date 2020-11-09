import LoginAction from '../action/auth';

const initialState = {
    isLoggedIn: false,
    loginId: null,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LoginAction.types.AUTH_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                loginId: action.payload.userId,
            };
        case LoginAction.types.AUTH_LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                loginId: null,
            };
        case LoginAction.types.AUTH_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                loginId: null,
            };
        default:
            return state;
    }
};
