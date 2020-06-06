import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '..';
import { ErrorToMessage, ActionCallBack, StdPayload } from '../Base';
import { RoomDataService } from '../Room/RoomDataService';
import { Room_01Model } from '../User/UserModel';
import { RoomModel } from '../Room/RoomModel';
import { systemLoadingStart, systemLoadingCompleted } from '../System/SystemActions';
import { BookModel } from './BookModel';
import _ from 'lodash';

export interface RoomState {
    Roomdata: Room_01Model[];
    IRoomList: Room_01Model[];
    IRoomDetails: Room_01Model[];
    IupdateRoomDetailsRequest: RoomModel[];
}

export enum RoomActionTypes {
    CREATE_ROOM = 'RoomActionTypes.CREATE_ROOM',
    GET_ROOM_LIST = 'RoomActionTypes.GET_ROOM_LIST',
    GET_ROOM_DETAILS = 'RoomActionTypes.GET_ROOM_DETAILS',
    UPDATE_ROOMS = 'RoomActionTypes.UPDATE_ROOMS'
}

interface CreateRoomPayload extends StdPayload {
    Roomdata: Room_01Model[];
}

interface RoomPayload extends StdPayload {
    IRoomList: Room_01Model[];
}

interface getRoomDetailsRequest extends StdPayload {
    IRoomDetails: Room_01Model[];
}

interface updateRoomDetailsRequest extends StdPayload {
    IupdateRoomDetailsRequest: RoomModel[];
}

interface RoomResponseAction {
    type: typeof RoomActionTypes.CREATE_ROOM;
    payload: CreateRoomPayload;
}

interface getRoomListRequestsAction {
    type: typeof RoomActionTypes.GET_ROOM_LIST;
    payload: RoomPayload;
}

interface getRoomDetailsRequestAction {
    type: typeof RoomActionTypes.GET_ROOM_DETAILS;
    payload: getRoomDetailsRequest;
}

interface updateRoomDetailsRequestAction {
    type: typeof RoomActionTypes.UPDATE_ROOMS;
    payload: updateRoomDetailsRequest;
}

export type RoomActions =
    | RoomResponseAction
    | getRoomListRequestsAction
    | getRoomDetailsRequestAction
    | updateRoomDetailsRequestAction;

export function getRoomListRequest(index: number, numPages: number, callback: ActionCallBack): ThunkAction<void, AppState, null, Action<string>> {
    return async (dispatch, getState) => {
        const ds = new RoomDataService();
        const payload: RoomPayload = {
            IRoomList: []
        };
        await dispatch(systemLoadingStart());
        try {
            const RoomList = await ds.getRoomListRequest(index + 1, numPages);
            console.log(RoomList.success.data ,`roomlist`);
            if(RoomList.success) {
                payload.IRoomList = RoomList.success.data;
                await dispatch({ type: RoomActionTypes.GET_ROOM_LIST, payload });
                await callback(getState);
            }
            await dispatch(systemLoadingCompleted());
        } catch (ex) {
            const error = ErrorToMessage('getRoomListRequest error', ex);
            await dispatch(systemLoadingCompleted(error));
        }
    };
}

export function getRoomDetailsRequest(userid: string, callback: ActionCallBack): ThunkAction<void, AppState, null, Action<string>> {
    return async (dispatch, getState) => {
        const ds = new RoomDataService();
        const payload: getRoomDetailsRequest = {
            IRoomDetails: []
        };
        await dispatch(systemLoadingStart());
        try {
            const MerchanDetails = await ds.getRoomDetailsRequest(userid);
            const res = MerchanDetails.results;
            await dispatch({ type: RoomActionTypes.GET_ROOM_DETAILS, payload });
            await callback(getState);
            await dispatch(systemLoadingCompleted());
        } catch (ex) {
            const error = ErrorToMessage('getRoomDetailsRequest error', ex);
            await dispatch(systemLoadingCompleted(error));
        }
    };
}
export function createBookRequest(Merchantinfo: BookModel, Bookid : string): ThunkAction<void, AppState, null, Action<string>> {
    return async (dispatch, getState) => {
        const ds = new RoomDataService();

        await dispatch(systemLoadingStart());
        try {
            const Roomdata = await ds.updateBookRequest(Merchantinfo,Bookid);
            alert(Roomdata);
            await dispatch({ type: RoomActionTypes.CREATE_ROOM, payload: Roomdata });
            await dispatch(systemLoadingCompleted());
        } catch (ex) {
            const error = ErrorToMessage('Cant Create error', ex);
            await dispatch(systemLoadingCompleted(error));
        }
    };
}

export const getRoomState = (state: AppState) => state.Room;
