import { IRouteInfo } from '../../Web/Base';

import PHLogin from './PH01_Login';
import PHForgetPassword from './PH02_ForgetPassword';
import PHChangePassword from './PH03_ChangePassword';
import PHRoomDetails from './Room/PH_RoomDetails';
import PHBookRoom from './Room/BookRoom';
import PHRoom from './Room/PH_RoomList';
import PHLogout from './PH04_Logout';

interface AppRouteInfo extends IRouteInfo {
    isPublic?: boolean;
}

export const unathenticatedRoutes: AppRouteInfo[] = [
    {
        path: '/login',
        component: PHLogin,
    },
    {
        path: '/forgetpassword',
        component: PHForgetPassword,
    },
    {
        path: '/change/password',
        component: PHChangePassword,
    }
];
export const authenticatedRoutes: AppRouteInfo[] = [
    {
        path: '/room/list',
        component: PHRoom
    },
    {
        path : '/room/details/list',
        component : PHRoomDetails
    },
    {
        path : '/bookroomDetails/:roomid',
        component : PHBookRoom
    },
    {
        path: '/Logout',
        component: PHLogout
    }
];