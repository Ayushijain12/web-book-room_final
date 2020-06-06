import _ from 'lodash';

export interface StdPayload {
    error?: string;
}

export const ErrorToMessage = (fn: string, ex: any): string => {
    if (typeof ex === 'object') {
        let responseErrorMessage = '';
        if (ex.response) {
            if (ex.response.data && ex.response.data.errorMessage) {
                responseErrorMessage = '\n\n' + ex.response.data.errorMessage;
            }
        }

        if (_.has(ex, 'message')) {
            if (ex.message === 'Incorrect username or password.') {
                return 'The code you have entered is incorrect. Please check and try again';
            }
            if (ex.message === 'Invalid session for the user.') {
                return 'Verification code has expired. Please regenerate by using the Send Again button and try again';
            }
            return ex.message + responseErrorMessage;
        }
    }
    return ex;
};

export interface IActionCallBackExtra {
    data?: any;
    ext?: any;
}
export type ActionCallBack = (getState: any, error?: any, extra?: IActionCallBackExtra) => Promise<void>;
