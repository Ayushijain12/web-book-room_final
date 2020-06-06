import { UserState, UserActions, UserActionTypes } from './UserActions';
import _ from 'lodash';

const initialState: UserState = {
    UserData: [],
    IUserList: [],
    IUserDetails: [],
    IupdateUserDetailsRequest: []
};

export function userReducer(state = initialState, action: UserActions): UserState {
    switch (action.type) {
        case UserActionTypes.CREATE_USER: {
            return {
                ...state,
                UserData: action.payload.Userdata
            };
        }
        case UserActionTypes.GET_USER_LIST: {
            return {
                ...state,
                IUserList: action.payload.IUserList
            };
        }
        case UserActionTypes.GET_USER_DETAILS: {
            return {
                ...state,
                IUserDetails: action.payload.IUserDetails
            };
        }
        case UserActionTypes.UPDATE_USER: {
            return {
                ...state,
                IupdateUserDetailsRequest: action.payload.IupdateUserDetailsRequest
            };
        }
        case UserActionTypes.DELETE_USER: {
            return {
                ...state
            };
        }
        default:
            return state;
    }
}
