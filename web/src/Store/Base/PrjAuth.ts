import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { UserLoginModel } from '../../Store/User/UserModel';

export class PrjAuth {
    private _user?: UserLoginModel;

    public async setUser(user: UserLoginModel) {
        this._user = user;
        await sessionStorage.setItem('user', JSON.stringify(this._user));
    }

    public async isAuthenticated() {
        try {
            const userJson = (await sessionStorage.getItem('user')) || undefined;
            if (userJson) {
                this._user = JSON.parse(userJson);
            }
            if (this._user) {
                return true;
            } else {
                return false;
            }
        } catch {
            return false;
        }
    }

    public async getUser() {
        return await this._user;
    }

    public async getToken() {
        const userJson = (await sessionStorage.getItem('user')) || undefined;
        if (userJson) {
            this._user = JSON.parse(userJson);
        }
        if (this._user) {
            return this._user.CookieID;
        }
        return undefined;
    }
    
    public async signOut() {
        if (this._user) {
            this._user = undefined;
            await sessionStorage.removeItem('user');
            await sessionStorage.removeItem('token');
            return true;
        } else {
            return false;
        }
        // sessionStorage.clear;
    }
}
