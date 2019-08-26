import { userConstants } from '../constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                loggedIn: false,
                user: action.user
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                loggingIn: false,
                user: action.user
            };
        case userConstants.LOGIN_FAILURE:
            return {
                loggedIn: false,
                loggingIn: false,
                error: action.user
            };
        case userConstants.LOGOUT:
            return {
                loggedIn: false,
                loggingIn: false
            };
        default:
            return state
    }
}