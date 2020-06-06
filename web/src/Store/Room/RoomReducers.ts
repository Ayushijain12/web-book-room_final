import { RoomState, RoomActions, RoomActionTypes } from './RoomActions';
import _ from 'lodash';

const initialState: RoomState = {
    Roomdata: [],
    IRoomList: [],
    IRoomDetails: [],
    IupdateRoomDetailsRequest: []
};

export function RoomReducer(state = initialState, action: RoomActions): RoomState {
    switch (action.type) {
        case RoomActionTypes.CREATE_ROOM: {
            return {
                ...state,
                Roomdata: action.payload.Roomdata
            };
        }
        case RoomActionTypes.GET_ROOM_LIST: {
            return {
                ...state,
                IRoomList: action.payload.IRoomList
            };
        }
        case RoomActionTypes.GET_ROOM_DETAILS: {
            return {
                ...state,
                IRoomDetails: action.payload.IRoomDetails
            };
        }
        case RoomActionTypes.UPDATE_ROOMS: {
            return {
                ...state,
                IupdateRoomDetailsRequest: action.payload.IupdateRoomDetailsRequest
            };
        }
        default:
            return state;
    }
}
