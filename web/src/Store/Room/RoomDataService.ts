import { Book_01Model } from '../User/UserModel';
import { IDataService } from '../Base/IDataService';

export class RoomDataService extends IDataService {
    public async getRoomListRequest(index: number, numPages: number) {
        try {
            const ret = await this._get(`/api/rooms`);
            console.log(ret.data);
            return ret.data;
        } catch (e) {
            //
        }
    }

    public async getRoomDetailsRequest(userid?: string) {
        try {
            const ret = await this._get(`/api/room/${userid}`);
            return ret.data;
        } catch (e) {
            alert(e);
        }
    }

    public async updateBookRequest(Roominfo: Book_01Model, Bookid: string) {
        try {
            const data = '06/05/2020 23:30:30';
            const ret = await this._post(`/api/room/booking/${Bookid}`, data);
            console.log(ret);
            alert(ret);
            return ret.data;
        } catch (e) {
            // alert('status_code: 401 error: "You Are Not Authorised To Update Room."');
        }
    }
    }
