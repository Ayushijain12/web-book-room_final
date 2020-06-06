import { IDataService } from '../Base/IDataService';
import { User_01Model, ForgetPasswordinfo, ChangePasswordinfo } from './UserModel';
import { UserDataModel } from './UserModel_01';
import { LoginModel } from '../Login/LoginModel';
import * as _ from 'lodash';

export class UserDataService extends IDataService {
    public async postLoginInfo(loginInfo: LoginModel) {
        try {
            const data = {
                email: loginInfo.Username,
                password: loginInfo.Password
            };
            console.log(data);
            const res = await this._post('/api/login', data);
            console.log(res , 'res');
            return res.data;
        } catch (e) {
            //
        }
    }

    public async forgetpasswordRequest(userdatainfo: ForgetPasswordinfo) {
        try {
            const data = {
                email: userdatainfo.email
            };
            const res = await this._post('/api/forgot_password', data);
            console.log(data , res.data);
            return res.data;
        } catch (e) {
            alert('invalid mail address');
        }
    }

    public async resetPasswordRequest(userdatainfo: ChangePasswordinfo) {
        try {
            const data = {
                otp : userdatainfo.otp,
                password: userdatainfo.password,
                confirm_password: userdatainfo.confirm_password
            };
            const res = await this._post(`/api/reset_password/`, data);
            console.log(res.data , `res data`);
            return res.data;
        } catch (e) {
            alert(e);
        }
    }

    public async CreateUser(data1: UserDataModel) {
        try {
            const data = {
                name: data1.name,
                username: data1.username,
                email: data1.email,
                address: data1.address,
                city: data1.city,
                state: data1.state,
                country: data1.country,
                zipcode: data1.zipcode,
                phone_number: data1.phone_number,
                password: data1.password,
                group_name: data1.group_name,
                status: 'active'
            };
            const ret = await this._post('/api/user/add', data);
            return ret.data;
        } catch (e) {
            alert(e);
        }
    }

    public async GetUserList(index: number, numPages: number) {
        try {
            const ret = await this._get(`/api/user/list?page=${index}&per_page=${numPages}`);
            return ret.data;
        } catch (e) {
            alert('status_code: 401 error(You Are Not Authorized To View User.)');
        }
    }

    public async getUserDetailsRequest(userid: string) {
        try {
            const ret = await this._get(`/api/user/details/${userid}`);
            return ret.data;
        } catch (e) {
            alert(e);
        }
    }

    public async updateUserDetailsRequest(data1: UserDataModel, userid: string) {
        try {
            const data = data1;
            const ret = await this._post(`/api/user/update/${userid}`, data);
            return ret.data;
        } catch (e) {
            alert('status_code: 401 error: "You Are Not Authorised To Update User."');
        }
    }

    public async deleteUserRequest(userid: string) {
        try {
            const ret = await this._delete(`/api/user/delete/${userid}`);
            return ret.data;
        } catch (e) {
            alert('status_code: 401 error: "You Are Not Authorised To Delete User."');
        }
    }
}
