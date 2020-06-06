import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '..';
import { StdPayload, ErrorToMessage, ActionCallBack } from '../Base';
import { UserDataService } from '../User/UserDataService';
import { User_01Model } from './UserModel';
import { UserDataModel } from './UserModel_01';
import { systemLoadingStart, systemLoadingCompleted } from '../System/SystemActions';
import _ from 'lodash';

export interface UserState {
    UserData: User_01Model[];
    IUserList: User_01Model[];
    IUserDetails: User_01Model[];
    IupdateUserDetailsRequest: User_01Model[];
}

export enum UserActionTypes {
    CREATE_USER = 'UserActionTypes.CREATE_USER',
    GET_USER_LIST = 'UserActionTypes.GET_USER_LIST',
    GET_USER_DETAILS = 'UserActionTypes.GET_USER_DETAILS',
    UPDATE_USER = 'UserActionTypes.UPDATE_USER',
    DELETE_USER = 'UserActionTypes.DELETE_USER'
}

interface CreateUserPayload extends StdPayload {
    Userdata: User_01Model[];
}

interface GetUserList extends StdPayload {
    IUserList: User_01Model[];
}

interface getUserDetailsRequest extends StdPayload {
    IUserDetails: User_01Model[];
}

interface updateUserDetailsRequest extends StdPayload {
    IupdateUserDetailsRequest: User_01Model[];
}

interface CreateUserAction {
    type: typeof UserActionTypes.CREATE_USER;
    payload: CreateUserPayload;
}

interface getUserListsAction {
    type: typeof UserActionTypes.GET_USER_LIST;
    payload: GetUserList;
}

interface getUserDetailsRequestAction {
    type: typeof UserActionTypes.GET_USER_DETAILS;
    payload: getUserDetailsRequest;
}

interface updateUserDetailsRequestAction {
    type: typeof UserActionTypes.UPDATE_USER;
    payload: updateUserDetailsRequest;
}

interface deleteUserRequestDetailsAction {
    type: typeof UserActionTypes.DELETE_USER;
}

export type UserActions = CreateUserAction | getUserListsAction | getUserDetailsRequestAction | updateUserDetailsRequestAction | deleteUserRequestDetailsAction;

export function createUserRequest(data: UserDataModel, callback: ActionCallBack): ThunkAction<void, AppState, null, Action<string>> {
    return async (dispatch, getState) => {
        const ds = new UserDataService();

        await dispatch(systemLoadingStart());
        try {
            const UserData = await ds.CreateUser(data);
            await dispatch({ type: UserActionTypes.CREATE_USER, payload: UserData });
            await callback(getState);
            await dispatch(systemLoadingCompleted());
        } catch (ex) {
            const error = ErrorToMessage('Cant Create error', ex);
            await dispatch(systemLoadingCompleted(error));
        }
    };
}

export function getUsertListRequest(index: number, numPages: number,callback: ActionCallBack): ThunkAction<void, AppState, null, Action<string>> {
    return async (dispatch, getState) => {
        const ds = new UserDataService();
        const payload: GetUserList = {
            IUserList: []
        };
        await dispatch(systemLoadingStart());
        try {
            const UserList = await ds.GetUserList(index+1,numPages);
            if(UserList.results) {
                payload.IUserList = UserList.results.data;
                console.log(`total`,UserList.results.total);
                await dispatch({ type: UserActionTypes.GET_USER_LIST, payload });
                await callback(getState, '', { data: UserList.results.total });
            }
            await dispatch(systemLoadingCompleted());
        } catch (ex) {
            const error = ErrorToMessage('getUsertListRequest error', ex);
            await dispatch(systemLoadingCompleted(error));
        }
    };
}

export function getUserDetailsRequest(userid: string, callback: ActionCallBack): ThunkAction<void, AppState, null, Action<string>> {
    return async (dispatch, getState) => {
        const ds = new UserDataService();
        const payload: getUserDetailsRequest = {
            IUserDetails: []
        };
        await dispatch(systemLoadingStart());
        try {
            const UserDetails = await ds.getUserDetailsRequest(userid);
            payload.IUserDetails = UserDetails.results;
            await dispatch({ type: UserActionTypes.GET_USER_DETAILS, payload });
            await callback(getState);
            await dispatch(systemLoadingCompleted());
        } catch (ex) {
            const error = ErrorToMessage('getUserDetailsRequest error', ex);
            await dispatch(systemLoadingCompleted(error));
        }
    };
}

export function updateUserDetailsRequest(data: UserDataModel, userid: any): ThunkAction<void, AppState, null, Action<string>> {
    return async (dispatch, getState) => {
        const ds = new UserDataService();
        await dispatch(systemLoadingStart());
        try {
            const res = await ds.updateUserDetailsRequest(data, userid);
            await dispatch({ type: UserActionTypes.UPDATE_USER, payload: res });
            await dispatch(systemLoadingCompleted());
        } catch (ex) {
            const error = ErrorToMessage('updateUserDetailsRequest error', ex);
            await dispatch(systemLoadingCompleted(error));
        }
    };
}

export function userDeleteRequest(userid: string, index: number,numPages: number, callback: ActionCallBack): ThunkAction<void, AppState, null, Action<string>> {
    return async (dispatch, getState) => {
        const ds = new UserDataService();
        await dispatch(systemLoadingStart());
        try {
            const res = await ds.deleteUserRequest(userid);
            await dispatch({ type: UserActionTypes.DELETE_USER, payload: res });
            await dispatch(getUsertListRequest(index,numPages,callback));
            await dispatch(systemLoadingCompleted());
        } catch (ex) {
            const error = ErrorToMessage('deleteUserRequest error', ex);
            await dispatch(systemLoadingCompleted(error));
        }
    };
}

export const getUserState = (state: AppState) => state.user;
