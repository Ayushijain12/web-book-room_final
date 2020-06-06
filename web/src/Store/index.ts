import { combineReducers } from 'redux';

import { systemReducer } from './System/SystemReducers';
import { RoomReducer } from './Room/RoomReducers';
import { userReducer } from './User/UserReducers';
import { IActionCallBackExtra } from './Base';

const rootReducer = combineReducers({
    system: systemReducer,
    Room: RoomReducer,
    user :userReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
export type ActionCallBack = (getState: any, error?: any, extra?: IActionCallBackExtra) => Promise<void>;

export default rootReducer;
