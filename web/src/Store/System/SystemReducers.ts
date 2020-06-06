import { SystemState, SystemActions, SystemActionTypes } from './SystemActions';

const initialState: SystemState = {
    isAuthenticated: false,
    isAuthenticatedValidated: false,
    user: undefined,
    signInInit: false,
    actionLoading: 0
};

export function systemReducer(state = initialState, action: SystemActions): SystemState {
    switch (action.type) {
        case SystemActionTypes.AUTH_VALIDATE_COMPLETED: {
            return {
                ...state,
                isAuthenticated: action.payload.status,
                user: action.payload.user,
                isAuthenticatedValidated: true
            };
        }
        case SystemActionTypes.AUTH_SIGNIN_INIT_COMPLETED: {
            return {
                ...state,
                signInInit: !action.payload.error,
                isAuthenticated: true,
                singinuser: action.payload.user,
                isAuthenticatedValidated: true
            };
        }
        case SystemActionTypes.AUTH_SIGNIN_COMPLETED: {
            let signInInit = false;
            if (action.payload.error) {
                signInInit = true;
            }
            return {
                ...state,
                signInInit,
                isAuthenticated: action.payload.status,
                actionError: action.payload.error,
                isAuthenticatedValidated: true,
                singinuser: action.payload.user
            };
        }
        case SystemActionTypes.AUTH_LOAD_USER_COMPLETED: {
            return {
                ...state,
                user: action.payload.user
            };
        }
        case SystemActionTypes.AUTH_SIGNOUT_COMPLETED: {
            return {
                ...state,
                signInInit: false,
                isAuthenticated: false,
                actionError: action.payload.error,
                isAuthenticatedValidated: true,
                user: action.payload.user
            };
        }
        case SystemActionTypes.LOADING_START: {
            return {
                ...state,
                actionLoading: state.actionLoading + 1
            };
        }
        case SystemActionTypes.LOADING_COMPLETED: {
            return {
                ...state,
                actionLoading: state.actionLoading <= 0 ? 0 : state.actionLoading - 1,
                actionError: action.payload.error
            };
        }
        case SystemActionTypes.AUTH_LOGIN_FAILED_1005: {
            return {
                ...state,
                isAuthenticated: false,
                isAuthenticatedValidated: false,
                isAuthLoginFailed: action.payload
            };
        }
        case SystemActionTypes.CLEAR_ERROR: {
            return {
                ...state,
                actionLoading: 0,
                actionError: undefined
            };
        }
        default:
            return state;
    }
}
