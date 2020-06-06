import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '..';
import { StdPayload, ErrorToMessage, ActionCallBack } from '../Base';
import { PrjAuth } from '../Base/PrjAuth';
import { UserDataService } from '../User/UserDataService';
import { LoginModel } from '../Login/LoginModel';
import { UserLoginModel, ForgetPasswordinfo, ChangePasswordinfo } from '../User/UserModel';
// import { UserLoginModel,ForgetPasswordinfo,ChangePasswordinfo } from '../Login/LoginModel';

export interface SystemState {
    isAuthenticated: boolean;
    isAuthenticatedValidated: boolean;
    signInInit: boolean;
    user?: UserLoginModel;
    singinuser?: UserLoginModel;
    signInInitUsername?: string;
    isAuthLoginFailed?: LoginModel;
    actionError?: string;
    actionLoading: number;
}

export enum SystemActionTypes {
    AUTH_VALIDATE_COMPLETED = 'SystemActionTypes.AUTH_VALIDATE_COMPLETED',
    AUTH_SIGNIN_INIT_COMPLETED = 'SystemActionTypes.AUTH_SIGNIN_INIT_COMPLETED',
    AUTH_LOGIN_FAILED_1005 = 'SystemActionTypes.AUTH_LOGIN_FAILED_1005',
    AUTH_SIGNIN_COMPLETED = 'SystemActionTypes.AUTH_SIGNIN_COMPLETED',
    AUTH_SIGNOUT_COMPLETED = 'SystemActionTypes.AUTH_SIGNOUT_COMPLETED',
    AUTH_LOAD_USER_COMPLETED = 'SystemActionTypes.AUTH_LOAD_USER_COMPLETED',
    FORGET_PASSWORD_COMPLETED = 'SystemActionTypes.FORGET_PASSWORD_COMPLETED',
    RESET_PASSWORD_COMPLETED = 'SystemActionTypes.RESET_PASSWORD_COMPLETED',
    LOADING_START = 'SystemActionTypes.LOADING_START',
    LOADING_COMPLETED = 'SystemActionTypes.LOADING_COMPLETED',
    CLEAR_ERROR = 'SystemActionTypes.CLEAR_ERROR'
}

interface SystemAuthValidatePayload extends StdPayload {
    status: boolean;
    user?: UserLoginModel;
}
interface SystemAuthForgetPasswordInitPayload extends StdPayload {
    Username: string;
}
interface SystemAuthSignInInitPayload extends StdPayload {
    user?: UserLoginModel;
}

interface SystemAuthValidateCompletedAction {
    type: typeof SystemActionTypes.AUTH_VALIDATE_COMPLETED;
    payload: SystemAuthValidatePayload;
}

interface SystemAuthSignInInitCompletedAction {
    type: typeof SystemActionTypes.AUTH_SIGNIN_INIT_COMPLETED;
    payload: SystemAuthSignInInitPayload;
}

interface SystemAuthSignInCompletedAction {
    type: typeof SystemActionTypes.AUTH_SIGNIN_COMPLETED;
    payload: SystemAuthValidatePayload;
}

interface SystemUserLoadCompletedAction {
    type: typeof SystemActionTypes.AUTH_LOAD_USER_COMPLETED;
    payload: SystemAuthValidatePayload;
}

interface SystemAuthSignOutAction {
    type: typeof SystemActionTypes.AUTH_SIGNOUT_COMPLETED;
    payload: SystemAuthValidatePayload;
}

interface SystemLoadingStartAction {
    type: typeof SystemActionTypes.LOADING_START;
    payload: StdPayload;
}

interface SystemLoadingCompletedAction {
    type: typeof SystemActionTypes.LOADING_COMPLETED;
    payload: StdPayload;
}

interface SystemClearErrorAction {
    type: typeof SystemActionTypes.CLEAR_ERROR;
}
interface SystemLoginFailedAction {
    type: typeof SystemActionTypes.AUTH_LOGIN_FAILED_1005;
    payload: LoginModel;
}
export const auth = new PrjAuth();

export type SystemActions =
    | SystemAuthValidateCompletedAction
    | SystemAuthSignInInitCompletedAction
    | SystemAuthSignInCompletedAction
    | SystemAuthSignOutAction
    | SystemUserLoadCompletedAction
    | SystemLoadingStartAction
    | SystemLoadingCompletedAction
    | SystemLoginFailedAction
    | SystemClearErrorAction;

export function systemLoadingStart(): ThunkAction<void, AppState, null, Action<string>> {
    return async (dispatch, getState) => {
        const payload: StdPayload = {};
        await dispatch({ type: SystemActionTypes.LOADING_START, payload });
    };
}

export function systemLoadingCompleted(error?: any): ThunkAction<void, AppState, null, Action<string>> {
    return async (dispatch, getState) => {
        const payload: StdPayload = {
            error
        };
        await dispatch({ type: SystemActionTypes.LOADING_COMPLETED, payload });
    };
}

export function systemCLearError(): ThunkAction<void, AppState, null, Action<string>> {
    return async (dispatch, getState) => {
        await dispatch({ type: SystemActionTypes.CLEAR_ERROR });
    };
}

export function systemAuthValidate(callback: ActionCallBack): ThunkAction<void, AppState, null, Action<string>> {
    return async (dispatch, getState) => {
        if (getState().system.isAuthenticatedValidated) {
            await callback(getState);
            return;
        }
        await dispatch(systemLoadingStart());
        try {
            const status = await auth.isAuthenticated();
            const payload: SystemAuthValidatePayload = {
                status
            };
            if (status) {
                payload.user = await auth.getUser();
            }
            await dispatch({ type: SystemActionTypes.AUTH_VALIDATE_COMPLETED, payload });
        } catch (ex) {
            const payload: SystemAuthValidatePayload = {
                status: false
            };
            await dispatch({ type: SystemActionTypes.AUTH_VALIDATE_COMPLETED, payload });
        }
        await callback(getState);
        await dispatch(systemLoadingCompleted());
    };
}

export function systemAuthSignInInit(user: LoginModel, callback: ActionCallBack, Token?: string): ThunkAction<void, AppState, null, Action<string>> {
    return async (dispatch, getState) => {
        const payload: SystemAuthSignInInitPayload = {
            user
        };
        const ds = new UserDataService();
        await dispatch(systemLoadingStart());
        try {
            const loginRes = await ds.postLoginInfo(user);
            console.log(loginRes.success.user.id, ` loginres`);
            if (loginRes) {
                const login: UserLoginModel = {
                    Username: loginRes.success.user.email,
                    CookieID: loginRes.success.token,
                    userid: loginRes.success.user.id,
                };

                console.log(login);
                await auth.setUser(login);
                await dispatch({ type: SystemActionTypes.AUTH_SIGNIN_INIT_COMPLETED, payload });
                await callback(getState);
                await dispatch(systemLoadingCompleted());
            } else {
                const Alerterror = await alert(`User Not found`);
                const error = ErrorToMessage('loginInfoAction', Alerterror);
                await dispatch(systemLoadingCompleted(error));
            }
        } catch (ex) {
            const error = ErrorToMessage('loginInfoAction', ex);
            await callback(getState, ex);
            await dispatch(systemLoadingCompleted(error));
            await dispatch({ type: SystemActionTypes.AUTH_LOGIN_FAILED_1005, payload });
        }
    };
}

export function systemAuthSignOut(user: UserLoginModel): ThunkAction<void, AppState, null, Action<string>> {
    return async (dispatch, getState) => {
        const payload: SystemAuthSignInInitPayload = {
            user
        };
        await dispatch(systemLoadingStart());
        try {
            await auth.signOut();
            await dispatch(systemLoadingCompleted());
        } catch (ex) {
            const error = ErrorToMessage('systemAuthSignInInit', ex);
            await dispatch(systemLoadingCompleted(error));
        }
        await dispatch({ type: SystemActionTypes.AUTH_SIGNOUT_COMPLETED, payload: user });
    };
}

export function systemAuthLogOut(user?: LoginModel): ThunkAction<void, AppState, null, Action<string>> {
    return async (dispatch, getState) => {
        const payload: StdPayload = {};
        await dispatch(systemLoadingStart());
        try {
            await auth.signOut();
            await dispatch(systemLoadingCompleted());
            await dispatch({ type: SystemActionTypes.AUTH_SIGNOUT_COMPLETED, payload: user });
        } catch (ex) {
            const error = ErrorToMessage('systemAuthSignInInit', ex);
            await dispatch(systemLoadingCompleted(error));
            await dispatch({ type: SystemActionTypes.AUTH_SIGNOUT_COMPLETED, payload });
        }
    };
}

export function systemLoadUser(): ThunkAction<void, AppState, null, Action<string>> {
    return async (dispatch, getState) => {
        const payload: SystemAuthValidatePayload = {
            status: false
        };
        await dispatch(systemLoadingStart());
        try {
            payload.user = await auth.getUser();
            await dispatch(systemLoadingCompleted());
        } catch (ex) {
            const error = ErrorToMessage('systemAuthSignInInit', ex);
            await dispatch(systemLoadingCompleted(error));
        }
        await dispatch({ type: SystemActionTypes.AUTH_LOAD_USER_COMPLETED, payload });
    };
}

export function systemAuthForgetPasswordInit(userdatainfo: ForgetPasswordinfo, callback: ActionCallBack): ThunkAction<void, AppState, null, Action<string>> {
    return async (dispatch, getState) => {
        const ds = new UserDataService();
        await dispatch(systemLoadingStart());
        try {
            const res = await ds.forgetpasswordRequest(userdatainfo);
            console.log(res, `response of api`);
            if (res) {
                alert(res.success.message);
                await dispatch({ type: SystemActionTypes.AUTH_VALIDATE_COMPLETED, payload: res });
                await callback(getState);
                await dispatch(systemLoadingCompleted());
            }
        } catch (ex) {
            const error = ErrorToMessage('systemAuthSignInInit', ex);
            // await dispatch({ type: SystemActionTypes.AUTH_SIGNOUT_COMPLETED, payload: userdatainfo });
            await dispatch(systemLoadingCompleted(error));
        }
    };
}
export function systemAuthResetPasswordInit(userdatainfo: ChangePasswordinfo, callback: ActionCallBack): ThunkAction<void, AppState, null, Action<string>> {
    return async (dispatch, getState) => {
        const ds = new UserDataService();
        await dispatch(systemLoadingStart());
        try {
            const res = await ds.resetPasswordRequest(userdatainfo);
            await dispatch({ type: SystemActionTypes.RESET_PASSWORD_COMPLETED, payload: res });
            await callback(getState);
            await dispatch(systemLoadingCompleted());
        } catch (ex) {
            const error = ErrorToMessage('systemAuthSignInInit', ex);
            await dispatch({ type: SystemActionTypes.AUTH_SIGNOUT_COMPLETED, payload: userdatainfo });
            await dispatch(systemLoadingCompleted(error));
        }
    };
}
export const getSystemState = (state: AppState) => state.system;
