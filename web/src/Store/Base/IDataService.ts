import axios, { AxiosRequestConfig } from 'axios';
import * as qs from 'qs';
import { PrjAuth } from './PrjAuth';
// import { prjSettings } from '../../config/config';

export const auth = new PrjAuth();

const prjSettings = {
    urlBase: 'http://127.0.0.1:8000'
};

export class IDataService {
    protected _urlBase: string = prjSettings.urlBase;
    private _timeout = 20000;

    protected async _get(url: string, params?: any): Promise<any> {
        const GetToken = await auth.getToken();
        const ret = await axios.get(this._urlBase + url, {
            headers: {
                Authorization: `Bearer ${GetToken}`,
                version: '1.0'
            },
            timeout: this._timeout,
            params
        });
        console.log(ret);
        return ret;
    }
    
    protected async _put(url: string, data?: any, params?: any): Promise<any> {
        const GetToken = await auth.getToken();
        const ret = await axios.put(this._urlBase + url, data, {
            headers: {
                Authorization: `Bearer ${GetToken}`,
                version: '1.0'
            },
            timeout: this._timeout,
            params
        });
        return ret;
    }

    protected async _delete(url: string, data?: any, params?: any): Promise<any> {
        const GetToken = await auth.getToken();
        const ret = await axios.delete(this._urlBase + url, {
            headers: {
                Authorization: `Bearer ${GetToken}`,
                version: '1.0'
            },
            timeout: this._timeout,
            params
        });
        return ret;
    }

    protected async _post(url: string, data?: any, params?: any): Promise<any> {
        const GetToken = await auth.getToken();
        const reqConfig: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${GetToken}`,
                version: '1.0'
            },
            timeout: this._timeout,
            params
        };
        const data1 = qs.stringify(data);
        const response = await axios.post(this._urlBase + url, data1, reqConfig);
        if (response.data.Code) {
            throw response.data;
        }
        return response;
    }
    protected async _postfile(url: string, data?: any, params?: any): Promise<any> {
        const GetToken = await auth.getToken();
        const reqConfig: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${GetToken}`,
                version: '1.0'
            },
            timeout: this._timeout,
            params
        };
        const response = await axios.post(this._urlBase + url, data, reqConfig);
        if (response.data.Code) {
            throw response.data;
        }
        return response;
    }
}
